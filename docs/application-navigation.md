# Application navigation

Application course choices live in the expandable Application branch in Learn (`#/courses?application`). The old `#/application` entry opens that branch; it does not have a separate directory.

Individual course home pages are directories. Put teaching, examples, workbooks, and reference material inside the destinations they open.

- Use `CourseIndex` for the page, `CourseDirectory` for independent choices, and `CourseTree` for grouped chapters. These share icon sizes, quiet pastel surfaces, typography, focus states, and phone layouts.
- Make the entire card or branch row interactive. Use a link for a route and a button for an existing state-based workspace. Keep descriptions to one short sentence. Large covers, competing start buttons, completion counters, and introductory essays do not belong on the directory.
- IELTS Study and Practice each have the same six destinations. The four skills preserve the incoming mode; Everything about IELTS opens the study reference; Mock Tests opens Practice. All 85 study units remain in the skill readers, including the separate General Training sections.
- The Other Half uses five expandable chapter groups. Its introduction is a separate destination. Chapter 10 keeps its explicit missing-source status. Readers use one column and an “In this chapter” menu; they do not repeat the whole chapter directory in a sidebar.
- Presentation goals, sources, discussions, and phrase references remain in Course guide & resources. Cases and the saved blueprint have their own cards. Reading’s saved vocabulary and Writing’s saved drafts have explicit destinations.
- The shell owns the breadcrumb. Parent segments are real links and the current page is plain text. Phone headers show the immediate parent and current location so names truncate cleanly.

## Study and Practice

Every Application course uses `ApplicationCourseShell` and its shared sticky Study / Practice bar. IELTS owns the same shell internally so its existing active-attempt guard can disable both controls. The English Tests selector is a directory, not a learning course. Remove competing per-course switches when integrating a course.

- `applicationNavigation.js` owns mode URLs. Switching preserves the chapter, lesson, reading text, or Writing prompt and search. Course contents and next/previous links retain the incoming mode. Legacy URLs remain supported; the presentation blueprint's legacy URL still opens its saved workbook.
- Course home pages stay simple directories in both modes. A Study directory opens teaching; a Practice directory opens an activity for the selected topic. Writing uses category-specific guidance and examples in Study and its original saved editor in Practice. Reading's saved-word Practice has recall controls.
- Other Half has three recognition questions and a transfer prompt per supplied chapter and introduction. Chapter 10 remains explicitly unavailable because its source is missing. TOEIC has original guided examples and short practice sets; its rehearsal is not a full-length test or a score prediction.
- `ApplicationPractice` stores answers, checked status, and reflection notes in `artico.application.practice.v1`. Keep question IDs stable; if answer choices change order or meaning, give that question a new ID. Feedback follows a submitted choice. Try again resets only that question. Existing course draft formats remain unchanged.
- `useCourseLocation` lets Writing's locally selected prompt update the shared mode links. `CourseContents` places Other Half's section menu in the bar. Keep course readers in one column rather than repeating directories in a sidebar.
- The main sidebar derives its course and mode from the current Application route, including direct links, instead of inheriting the last Foundation or Social Fluency lesson.

When changing a directory, verify that every existing chapter, practice activity, and saved-work destination remains reachable. Test card activation, branch expansion, parent navigation, keyboard focus, and the phone layout. Exercise engines and storage formats should not change for a navigation-only update.
