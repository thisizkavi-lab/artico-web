import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFile } from 'node:fs/promises'
import { readLanguage, translate, LANGUAGE_KEY } from '../src/web/locale.js'
import ja from '../src/web/locales/ja.js'
import { foundationReading } from '../src/course/foundations-en.js'
import { introductionPhrases, introductionSections, introductionScenarios } from '../src/course/introductions.js'
import { japaneseIntroduction } from '../src/course/locales/ja/introductions.js'
import { greetingsModel } from '../src/course/greetings.js'
import { localizeGreetings } from '../src/course/locales/ja/greetings.js'

const read = async (path) => JSON.parse(await readFile(new URL(path, import.meta.url), 'utf8'))
const catalog = await read('../src/course/catalog.json')
const japanese = /[\u3040-\u30ff\u3400-\u9fff]/

test('Japanese is the default; explicit English survives reload and invalid storage falls back safely', () => {
  assert.equal(readLanguage({ getItem: () => null }), 'ja')
  assert.equal(readLanguage({ getItem: (key) => key === LANGUAGE_KEY ? 'en' : null }), 'en')
  assert.equal(readLanguage({ getItem: () => 'ko' }), 'ja')
  assert.equal(readLanguage({ getItem: () => { throw new Error('storage blocked') } }), 'ja')
  assert.equal(translate(ja, 'Phrase {current} of {total}', { current: 2, total: 8 }), '8個中2個目')
})

test('all 96 Japanese chapters preserve every English practice identity, illustration, and dialogue', async () => {
  for (const { id } of catalog) {
    const en = await read(`../src/course/lessons/${id}.json`)
    const ja = await read(`../src/course/locales/ja/lessons/${id}.json`)
    assert(japanese.test(ja.goal), `${id}: Japanese goal`)
    assert(japanese.test(ja.ja), `${id}: Japanese title`)
    assert.deepEqual(ja.phraseBank.map(({ id, en }) => ({ id, en })), en.phraseBank.map(({ id, en }) => ({ id, en })), `${id}: practice keys and target English`)
    for (const mode of ['study', 'practice']) {
      const dialogue = (model) => model[mode].flatMap((section) => section.blocks.filter((block) => block.type === 'conversation').map((block) => ({ art: block.art, turns: block.turns.map(({ id, en, speaker }) => ({ id, en, speaker })) })))
      assert.deepEqual(dialogue(ja), dialogue(en), `${id}: ${mode} conversation`)
    }
    const anchors = ja.study.flatMap((section) => section.blocks.flatMap((block) => block.phraseIds ?? []))
    assert.equal(new Set(anchors).size, anchors.length, `${id}: duplicate phrase anchor`)
    for (const phrase of ja.phraseBank) {
      if (phrase.section !== 'words') assert(anchors.includes(phrase.id), `${id}: missing anchor ${phrase.id}`)
      assert(japanese.test(phrase.context), `${id}: missing Japanese support for ${phrase.id}`)
    }
    assert.equal(new Set(ja.study.map((section) => section.id)).size, ja.study.length, `${id}: duplicate section`)
    assert(ja.practice.length > 0, `${id}: missing practice`)
  }
})

test('orientation and foundations retain every section and all twelve pronunciation exercises', async () => {
  const ja = await read('../src/course/locales/ja/foundations.json')
  assert.equal(Object.keys(ja).length, 7)
  for (const [id, en] of Object.entries(foundationReading)) {
    assert.deepEqual(ja[id].sections.map((section) => section.id), en.sections.map((section) => section.id))
    assert(ja[id].sections.every((section) => section.blocks.length && japanese.test(section.title)))
    assert(ja[id].practice.length > 0)
  }
  assert.deepEqual(ja.lr.sections.map((section) => section.id), ['lr-notice', 'lr-parts', 'lr-everyday'])
  assert.equal(ja['tongue-intro'].sections.flatMap((section) => section.blocks).filter((block) => block.type === 'twister').length, 12)
})

test('the introduction pilot translates the existing layout without replacing recording or progress keys', () => {
  const model = { phrases: introductionPhrases, sections: introductionSections, scenarios: introductionScenarios }
  const ja = japaneseIntroduction(model)
  assert.deepEqual(ja.phrases.map(({ id, en, section }) => ({ id, en, section })), model.phrases.map(({ id, en, section }) => ({ id, en, section })))
  assert(ja.phrases.every((item) => japanese.test(item.context)))
  assert(ja.sections.every((section) => japanese.test(section.title)))
  assert(ja.scenarios.every((item) => japanese.test(item.prompt) && japanese.test(item.sample)))
  assert.deepEqual(ja.scenarios.map((item) => item.id), model.scenarios.map((item) => item.id))
  assert.equal(ja.phrases.find((item) => item.id === 'ch02-p1').ja, 'アレックスです。キャシーの友人です。')
  assert.equal(ja.phrases.find((item) => item.id === 'ch02-p2').ja, 'アンナです。はじめまして。')
  assert.equal(ja.phrases.find((item) => item.id === 'ch02-p11').ja, 'こんにちは、サトシです。プロジェクトマネージャーをしています。')
  assert.equal(ja.phrases.find((item) => item.id === 'ch02-p12').ja, 'ダニエル・リードです。普段はダンと呼ばれています。お会いできてうれしいです。')
  assert.equal(ja.phrases.find((item) => item.id === 'ch02-p13').ja, 'こちらこそ。サトシと呼んでください。')
  assert.equal(ja.phrases.find((item) => item.id === 'ch02-p14').ja, 'ありがとうございます、サトシ。研究チームに所属しています。')
  assert.equal(ja.phrases.find((item) => item.id === 'ch02-p39').ja, 'こんにちは、サトシ・タナカです。プロジェクトマネージャーをしています。')
  assert.equal(ja.phrases.find((item) => item.id === 'ch02-p40').ja, 'こんにちは、ダニエル・リードです。ダンと呼ばれています。研究チームに所属しています。はじめまして。')
  assert.equal(ja.phrases.find((item) => item.id === 'ch02-p41').ja, 'こちらこそ、ダン。サトシと呼んでください。')
  assert.equal(ja.phrases.find((item) => item.id === 'ch02-p42').ja, 'ありがとう、サトシ。一緒に仕事ができるのを楽しみにしています。')
  assert.equal(ja.phrases.find((item) => item.id === 'ch02-p43').ja, 'こちらこそ。では、始めましょう。')
  assert.equal(ja.phrases.find((item) => item.id === 'ch02-p44').ja, '一緒に仕事ができるのを楽しみにしています。')
  assert.equal(ja.phrases.find((item) => item.id === 'ch02-p45').ja, '一緒に仕事ができるのを楽しみにしております。')
  assert.equal(ja.phrases.find((item) => item.id === 'ch02-p46').ja, 'それを楽しみにしています。')
  assert.equal(ja.phrases.find((item) => item.id === 'ch02-p27').ja, 'やあ、アレックスです。')
  assert.equal(ja.phrases.find((item) => item.id === 'ch02-p4').ja, 'こんにちは、アレックスといいます。')
  assert.equal(ja.phrases.find((item) => item.id === 'ch02-p29').ja, '私はキャシーの友人です。')
  assert.equal(ja.phrases.find((item) => item.id === 'ch02-p35').ja, '皆さん、こちらはアレックスです。')
  assert.equal(ja.phrases.find((item) => item.id === 'ch02-p36').ja, 'アレックスを紹介します。')
  assert.equal(ja.phrases.find((item) => item.id === 'ch02-p38').ja, 'こんにちは、皆さん。アレックスです。')
  assert.equal(ja.phrases.find((item) => item.id === 'ch02-p37').ja, '何とお呼びすればよいですか。')
  assert.equal(ja.phrases.find((item) => item.id === 'ch02-p15').ja, '普段はダンと呼ばれています。')
  assert(ja.phrases.filter((item) => item.section !== 'words').every((item) => japanese.test(item.ja)))
  const translatedCopy = [
    ...ja.phrases.flatMap((item) => [item.context, item.register]),
    ...ja.sections.flatMap((section) => [
      section.title, section.short,
      ...section.blocks.flatMap((block) => [
        block.title, block.text, block.alt, block.contextText, block.note?.text,
        ...(block.examples?.flatMap((example) => [example.label, example.hint]) ?? []),
        block.replyAlternatives?.title,
        ...(block.replyAlternatives?.choices?.map((choice) => choice.label) ?? []),
      ]),
    ]),
    ...ja.scenarios.flatMap((item) => [item.title, item.prompt, item.sample]),
  ].filter(Boolean).join('\n')
  assert.doesNotMatch(translatedCopy, /\b(?:Alex|Anna|Cassie|Satoshi|Daniel|Sam|Dan|Avery|Taylor|Morgan)\b/)
  assert.match(translatedCopy, /サトシ/)
  assert.deepEqual(ja.sections.map((section) => section.id), ['introduce', 'work', 'connect'])
  const firstMeeting = ja.sections[0].blocks.find((block) => block.type === 'conversation' && block.title === '初対面の自然な会話')
  const reply = firstMeeting.replyAlternatives
  assert.equal(reply.title, '自然な返事の別の言い方')
  const workplace = ja.sections.find((section) => section.id === 'work')
  assert.deepEqual(workplace.blocks.filter((block) => block.type === 'phrases').map((block) => block.title), [
    '名前と呼び方', '仕事や役割について話す', '一緒に仕事を始めるとき', 'より改まったあいさつ',
  ])
  assert(japanese.test(workplace.blocks.find((block) => block.title === '一緒に仕事を始めるとき').note.text))
  assert.equal(workplace.blocks.find((block) => block.type === 'conversation').phrases.length, 5)
  const contextualExamples = ja.sections[0].blocks.find((block) => block.type === 'situations').examples
  assert.equal(contextualExamples.length, 4)
  assert(contextualExamples.every((example) => japanese.test(example.label) && japanese.test(example.hint)))
  assert.equal(reply.promptId, 'ch02-p30')
  assert.deepEqual(reply.choices.map((choice) => choice.id), ['ch02-p3', 'ch02-p5'])
  assert.deepEqual(reply.choices.map((choice) => choice.label), ['短い返事', '少し長い返事'])
  assert.equal(ja.phrases.find((item) => item.id === reply.promptId).ja, 'はじめまして。')
  assert.equal(ja.sections.flatMap((section) => section.blocks).filter((block) => block.type === 'conversation').length, 4)
})

test('the greetings chapter curates Study and Practice presentation with full Japanese support', () => {
  const ja = localizeGreetings(greetingsModel)
  assert.equal(ja.titleJa, 'あいさつ')
  assert(japanese.test(ja.subtitle))
  assert.deepEqual(ja.phrases.map(({ id, en, section }) => ({ id, en, section })), greetingsModel.phrases.map(({ id, en, section }) => ({ id, en, section })))
  assert(ja.phrases.every((item) => japanese.test(item.context) && (!item.register || japanese.test(item.register)) && japanese.test(item.ja)))
  assert(ja.sections.every((section) => japanese.test(section.title)))
  const conversationPhraseIds = ja.sections.flatMap((section) => section.blocks.filter((b) => b.type === 'conversation').flatMap((b) => b.phrases))
  assert(conversationPhraseIds.length > 0)
  assert(conversationPhraseIds.every((id) => japanese.test(ja.phrases.find((p) => p.id === id)?.ja ?? '')))
  assert(ja.scenarios.every((item) => japanese.test(item.title) && japanese.test(item.prompt)))
  assert.deepEqual(ja.scenarios.map((item) => item.id), greetingsModel.scenarios.map((item) => item.id))
})
