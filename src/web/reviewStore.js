import { createReviewRecord, refreshReviewContent, scheduleReview } from './reviewEngine'

const DB_NAME = 'artico.review.v1'
const DB_VERSION = 1
let opening = null

function requestResult(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error ?? new Error('Review database request failed'))
  })
}

function openDatabase() {
  if (opening) return opening
  opening = new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('This browser does not support saved reviews'))
      return
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains('items')) db.createObjectStore('items', { keyPath: 'id' })
      if (!db.objectStoreNames.contains('logs')) {
        const logs = db.createObjectStore('logs', { keyPath: 'id', autoIncrement: true })
        logs.createIndex('itemId', 'itemId')
        logs.createIndex('reviewedAt', 'reviewedAt')
      }
    }
    request.onsuccess = () => {
      const db = request.result
      db.onversionchange = () => { db.close(); opening = null }
      resolve(db)
    }
    request.onerror = () => reject(request.error ?? new Error('Cannot open review database'))
    request.onblocked = () => reject(new Error('Close other Artico tabs and try again'))
  }).catch((error) => {
    opening = null
    throw error
  })
  return opening
}

export async function listReviewItems() {
  const db = await openDatabase()
  return requestResult(db.transaction('items', 'readonly').objectStore('items').getAll())
}

export async function findReviewItem(id) {
  const db = await openDatabase()
  return requestResult(db.transaction('items', 'readonly').objectStore('items').get(id))
}

export async function saveReviewItem(content, now = new Date()) {
  const db = await openDatabase()
  return new Promise((resolve, reject) => {
    const tx = db.transaction('items', 'readwrite')
    const store = tx.objectStore('items')
    let result
    const lookup = store.get(content.id)
    lookup.onsuccess = () => {
      try {
        result = lookup.result
          ? refreshReviewContent(lookup.result, content, now)
          : createReviewRecord(content, now)
        store.put(result)
      } catch (error) {
        tx.abort()
        reject(error)
      }
    }
    tx.oncomplete = () => resolve(result)
    tx.onerror = () => reject(tx.error ?? new Error('Could not save review item'))
    tx.onabort = () => reject(tx.error ?? new Error('Review item save was cancelled'))
  })
}

export async function suspendReviewItem(id) {
  const db = await openDatabase()
  return new Promise((resolve, reject) => {
    const tx = db.transaction('items', 'readwrite')
    const store = tx.objectStore('items')
    const request = store.get(id)
    request.onsuccess = () => {
      if (request.result) store.put({ ...request.result, active: false })
    }
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error ?? new Error('Could not update review item'))
    tx.onabort = () => reject(tx.error ?? new Error('Review item update was cancelled'))
  })
}

export async function submitReview(id, grade, now = new Date(), expectedReps = null) {
  const db = await openDatabase()
  // A single transaction protects state + review log from partial writes.
  return new Promise((resolve, reject) => {
    const tx = db.transaction(['items', 'logs'], 'readwrite')
    const store = tx.objectStore('items')
    let result
    const request = store.get(id)
    request.onsuccess = () => {
      try {
        if (!request.result) throw new Error('Review item is missing')
        if (expectedReps !== null && request.result.card.reps !== expectedReps)
          throw new Error('This item was reviewed in another tab. Reload Review to continue.')
        result = scheduleReview(request.result, grade, now)
        store.put(result.record)
        tx.objectStore('logs').add(result.log)
      } catch (error) {
        tx.abort()
        reject(error)
      }
    }
    tx.oncomplete = () => resolve(result)
    tx.onerror = () => reject(tx.error ?? new Error('Could not record review'))
    tx.onabort = () => reject(tx.error ?? new Error('Review was not saved'))
  })
}
