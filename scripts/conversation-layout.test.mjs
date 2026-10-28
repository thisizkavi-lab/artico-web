import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { conversationSide, groupConversationScenes } from '../src/web/conversationLayout.js'

test('speaker identity is consistent across turns, including repeated speakers', () => {
  const speakers = ['Alex', 'Casey']
  assert.deepEqual(['Alex','Casey','Alex','Alex','Casey'].map((name, i) =>
    conversationSide(speakers, name, i)),
  ['incoming','outgoing','incoming','incoming','outgoing'])
  assert.equal(conversationSide(['Lee','Ari'], 'Lee', 3), 'incoming')
  assert.equal(conversationSide(['Lee','Ari'], 'Ari', 4), 'outgoing')
  assert.equal(conversationSide([], null, 1), 'outgoing')
})

test('adjacent illustrated conversations pair without swallowing text or changing order', () => {
  const a = { type: 'conversation', id: 'a', art: 'a.svg' }
  const b = { type: 'conversation', id: 'b', art: 'b.svg' }
  const c = { type: 'conversation', id: 'c', art: 'c.svg' }
  const unillustrated = { type: 'conversation', id: 'blank' }
  const text = { type: 'text', text: 'Explanation' }
  assert.deepEqual(groupConversationScenes([a, b, text, c, unillustrated]),
    [{ type: 'conversation-pair', conversations: [a,b] }, text, c, unillustrated])
  assert.deepEqual(groupConversationScenes([a,b,c]), [
    { type: 'conversation-pair', conversations: [a,b] }, c,
  ])
  assert.deepEqual(groupConversationScenes([text,a,text,b]), [text,a,text,b])
})

test('shared conversation UI has one dialogue-level audio control, not per-line controls', () => {
  const source = readFileSync(new URL('../src/web/LessonExperience.jsx', import.meta.url), 'utf8')
  assert.match(source, /<ConversationAudio block=\{block\} audioProps=\{audioProps\}/)
  assert.match(source, /!conversation && !individual\.length && <PhraseAudio/)
  assert.match(source, /conversation \? <p className="ip-phrase-text"/)
  assert.match(source, /<div className="ip-scene-pair"/)
})

test('chapter one actually contains repeated alternating speaker records and paired scenes', () => {
  const lesson = JSON.parse(readFileSync(new URL('../src/course/lessons/01.json', import.meta.url)))
  const blocks = lesson.study.flatMap((section) => section.blocks)
  const scenes = blocks.filter((block) => block.type === 'conversation')
  assert.ok(scenes.length >= 4)
  const byId = Object.fromEntries(lesson.phraseBank.map((item) => [item.id, item]))
  const checkin = scenes.find((scene) => scene.phraseIds.length >= 3)
  const speakers = [...new Set(checkin.phraseIds.map((id) => byId[id].speaker))]
  assert.ok(checkin.phraseIds.some((id, i) =>
    conversationSide(speakers, byId[id].speaker, i) === 'outgoing'))
  assert.ok(groupConversationScenes(blocks).some((block) => block.type === 'conversation-pair'))
})
