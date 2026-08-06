---
type: product-language-spec
project: Artico
layer: orientation
status: decision-record
launch_language: Japanese
future_languages: "Any learner language"
tags:
  - artico
  - orientation
  - localization
  - i18n
---

# Language modes for Artico

## Decision

Artico should not assume that every English learner is Japanese. The launch audience is Japanese learners, so the first complete guidance layer will be Japanese. The underlying content model must remain language-agnostic so another learner language can be added without rewriting the English lesson.

## Theory language

The theory section explains the idea in the learner’s chosen guidance language.

For the Japan launch:

- **Japanese guidance on** — Japanese explanation, cultural context, learner friction, and practice instructions.
- **English guidance on** — the same explanation presented in clear English for learners who want to learn through English.
- **Bilingual** — guidance language alongside key English terms and examples.

The toggle changes the explanation layer, not the underlying English content. The learner should never lose the chapter, dialogue, or practice task by changing the language.

## Practice language

Practice should be English-forward because the learner needs to hear, say, and retrieve English.

The learner may still choose:

- short guidance in Japanese or another support language;
- English-only instructions;
- bilingual hints when they are stuck.

The practice language setting should not translate the target dialogue by default. It should control the coach’s instructions and optional hints.

## Orientation language behavior

Orientation should ask or infer the learner’s guidance language before the first substantial explanation. The first screen can show:

> Choose the language that helps you understand the explanations. You can change this later.

The orientation itself should demonstrate that switching languages is safe and reversible. It should not make the learner decide their permanent identity or proficiency level.

## Content rule

Write one strong conceptual manuscript first. Then create language versions of the explanation layer. Do not write separate English and Japanese philosophies that drift apart.

The following can be localized independently:

- theory explanation;
- cultural note;
- learner-friction note;
- practice instructions;
- interface labels.

The following should remain shared unless the target language requires a real adaptation:

- English examples;
- dialogue audio;
- shadowing audio;
- Can-do outcome;
- practice task;
- chapter order.

## Launch position

Japan-centric means the examples, learner friction, and first guidance are honest about Japanese learners in Japan. It does not mean the product architecture is Japan-locked.
