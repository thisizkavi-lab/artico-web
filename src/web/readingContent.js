/* Original graded reading passages for Artico. Fictional notices/articles are clearly teaching examples. */
export const readingTiers = ['Starter','Easy','Developing','Confident','Advanced']
export const readingCollections = [
  {
    "id": "short",
    "title": "Short & Illustrated",
    "ja": "短い物語・イラスト",
    "icon": "book",
    "intro": "Small stories, clear events, a manageable first page.",
    "goal": "Track who, where, what happened, and what changed."
  },
  {
    "id": "stories",
    "title": "Stories & Worlds",
    "ja": "物語・民話",
    "icon": "book",
    "intro": "Fables, folklore and contemporary fiction.",
    "goal": "Follow cause and effect, motives and implied meaning."
  },
  {
    "id": "everyday",
    "title": "Everyday Reading",
    "ja": "日常の読み物",
    "icon": "messages",
    "intro": "Messages, notices, job listings and practical documents.",
    "goal": "Find the information you need to act."
  },
  {
    "id": "media",
    "title": "Media & Information",
    "ja": "メディア・情報",
    "icon": "book",
    "intro": "Posts, reviews, news and explainers.",
    "goal": "Separate facts, claims and missing context."
  },
  {
    "id": "ideas",
    "title": "Ideas & Arguments",
    "ja": "考え方・議論",
    "icon": "lightbulb",
    "intro": "Explanations, essays and reasoned opinions.",
    "goal": "See the claim, its support and its limits."
  },
  {
    "id": "literature",
    "title": "Literature & Long Reads",
    "ja": "文学・じっくり読む",
    "icon": "book",
    "intro": "Poetry, scenes and layered short fiction.",
    "goal": "Notice voice, imagery, perspective and ambiguity."
  }
]
export const readingTexts = [
  {
    "id": "red-umbrella",
    "collection": "short",
    "tier": "Starter",
    "format": "story",
    "title": "The Red Umbrella",
    "subtitle": "A tiny story about a rainy morning",
    "paragraphs": [
      "Mia has a red umbrella. She takes it to school because it is raining.",
      "At the school gate, she sees Ben. Ben has no umbrella. His hair is wet.",
      "“Come with me,” Mia says. They walk to the classroom together. Now both of them are dry."
    ],
    "glossary": {
      "umbrella": [
        "Something you hold above your head to keep rain off.",
        "傘"
      ],
      "gate": [
        "An entrance in a fence or wall.",
        "門"
      ],
      "wet": [
        "Covered with water.",
        "ぬれた"
      ],
      "together": [
        "With each other; not separately.",
        "一緒に"
      ]
    },
    "study": "First find the problem. Then find the small action that solves it.",
    "questions": [
      {
        "q": "Why does Mia take the umbrella?",
        "options": [
          "It is raining.",
          "She is going shopping.",
          "Ben gave it to her."
        ],
        "answer": 0,
        "why": "The first paragraph says it is raining."
      },
      {
        "q": "What does Mia do when she sees Ben?",
        "options": [
          "She runs away.",
          "She shares her umbrella.",
          "She closes the gate."
        ],
        "answer": 1,
        "why": "They walk together under her umbrella."
      }
    ]
  },
  {
    "id": "dog-at-the-stop",
    "collection": "short",
    "tier": "Starter",
    "format": "story",
    "title": "The Dog at the Bus Stop",
    "subtitle": "Look for what changes",
    "paragraphs": [
      "Every morning, a brown dog sits near the bus stop. People get on the bus, but the dog stays.",
      "One day a girl sees a small blue tag on its collar. It has a phone number. She calls the number.",
      "A man arrives ten minutes later. The dog runs to him. “Thank you,” he says. “I've been looking for her since yesterday.”"
    ],
    "glossary": {
      "bus stop": [
        "The place where a bus picks up passengers.",
        "バス停"
      ],
      "collar": [
        "A band worn around an animal's neck.",
        "首輪"
      ],
      "tag": [
        "A small piece attached to something with information on it.",
        "札、タグ"
      ],
      "looking for": [
        "Trying to find someone or something.",
        "探している"
      ]
    },
    "study": "Not every detail is equally important. The tag explains how the girl can help.",
    "questions": [
      {
        "q": "How does the girl find the dog's owner?",
        "options": [
          "She asks the bus driver.",
          "She calls the number on the collar.",
          "She follows the dog home."
        ],
        "answer": 1,
        "why": "The number appears on the blue tag."
      },
      {
        "q": "What does the man's final sentence suggest?",
        "options": [
          "The dog got lost.",
          "The dog is new.",
          "The man dislikes dogs."
        ],
        "answer": 0,
        "why": "He has been searching for the dog since yesterday."
      }
    ]
  },
  {
    "id": "the-last-cookie",
    "collection": "short",
    "tier": "Easy",
    "format": "story",
    "title": "The Last Cookie",
    "subtitle": "What is said, and what is meant",
    "paragraphs": [
      "Nora baked six cookies for her friends. At lunchtime she put the plate on the table. By the time she returned with tea, only one cookie was left.",
      "Her brother Sam was standing nearby, holding an empty glass. “I only had one,” he said quickly.",
      "Nora smiled. “I didn't ask.” She broke the last cookie in half and handed him a piece."
    ],
    "glossary": {
      "baked": [
        "Cooked in an oven.",
        "オーブンで焼いた"
      ],
      "by the time": [
        "Before a particular moment or event.",
        "〜する頃には"
      ],
      "nearby": [
        "Not far away.",
        "近くに"
      ],
      "broke in half": [
        "Divided into two pieces.",
        "半分に割った"
      ]
    },
    "study": "Notice the brother's timing. Sometimes an answer arrives before a question.",
    "questions": [
      {
        "q": "Why is Sam's reply slightly funny?",
        "options": [
          "He explains himself before anyone accuses him.",
          "He has never eaten a cookie.",
          "He cannot find the plate."
        ],
        "answer": 0,
        "why": "Nora has not asked him how many cookies he ate."
      },
      {
        "q": "Which detail shows Nora's response is friendly?",
        "options": [
          "She leaves the room.",
          "She smiles and shares the cookie.",
          "She hides the tea."
        ],
        "answer": 1,
        "why": "Her actions suggest she is not trying to start a fight."
      }
    ]
  },
  {
    "id": "fox-and-the-bell",
    "collection": "stories",
    "tier": "Easy",
    "format": "story",
    "title": "The Fox and the Bell",
    "subtitle": "An original fable",
    "paragraphs": [
      "A fox found a small bell beside a path. When he shook it, it made a bright, beautiful sound. “Everyone will admire me,” he thought.",
      "He tied the bell around his neck and walked through the forest. The rabbits heard him coming and hid. The birds flew away. Soon the fox had no one to show his bell to.",
      "An old tortoise watched him sit alone. “A bell can tell others where you are,” she said. “It cannot make them want to stay.”",
      "The fox took off the bell. The next morning, he walked quietly and asked the tortoise to join him for breakfast."
    ],
    "glossary": {
      "admire": [
        "Respect or be impressed by someone.",
        "感心する"
      ],
      "tied": [
        "Fastened with a string or knot.",
        "結びつけた"
      ],
      "tortoise": [
        "A slow-moving animal with a hard shell.",
        "リクガメ"
      ],
      "join": [
        "Take part in something with someone.",
        "加わる"
      ]
    },
    "study": "In a fable, a small event often stands for a wider idea. First understand the literal story.",
    "questions": [
      {
        "q": "Why do the animals disappear?",
        "options": [
          "They hear the fox coming.",
          "They want the bell.",
          "The tortoise tells them to go."
        ],
        "answer": 0,
        "why": "The bell announces the fox's approach."
      },
      {
        "q": "What does the tortoise mean?",
        "options": [
          "Noise is always bad.",
          "Attention and friendship are different.",
          "Bells belong to birds."
        ],
        "answer": 1,
        "why": "Being noticed does not make others choose your company."
      }
    ]
  },
  {
    "id": "the-lantern",
    "collection": "stories",
    "tier": "Developing",
    "format": "story",
    "title": "The Lantern by the River",
    "subtitle": "A contemporary legend",
    "paragraphs": [
      "Every winter, a small town placed a lantern beside its river. Nobody remembered who had begun the custom. Some believed it guided travelers through fog; others said it was a promise made after a terrible flood.",
      "When the bridge closed for repairs, the council decided that the lantern was unnecessary. A week later, an elderly woman arrived at the meeting with a faded photograph. It showed people standing shoulder to shoulder beside the river after the flood. In the foreground was the same lantern.",
      "“It was never there to help people find the road,” she explained. “It was there to remind us to come back for one another.”",
      "The council kept the lantern. Beside it, they added a sign telling the story."
    ],
    "glossary": {
      "custom": [
        "A traditional way of doing something.",
        "慣習"
      ],
      "guided": [
        "Showed someone the way.",
        "案内した"
      ],
      "unnecessary": [
        "Not needed.",
        "不必要な"
      ],
      "foreground": [
        "The part of a picture closest to the viewer.",
        "前景"
      ],
      "shoulder to shoulder": [
        "Standing or working closely together.",
        "肩を並べて"
      ]
    },
    "study": "Different characters give different explanations. Look for the new evidence and what it changes.",
    "questions": [
      {
        "q": "What changes the council's decision?",
        "options": [
          "A new map of the river.",
          "A photograph and the woman's explanation.",
          "The bridge reopening early."
        ],
        "answer": 1,
        "why": "The photograph and explanation reveal the lantern's communal meaning."
      },
      {
        "q": "Why add a sign?",
        "options": [
          "To explain the lantern's significance.",
          "To advertise the council.",
          "To warn people about fog."
        ],
        "answer": 0,
        "why": "The sign preserves the story that had nearly been forgotten."
      }
    ]
  },
  {
    "id": "future-letter",
    "collection": "stories",
    "tier": "Confident",
    "format": "story",
    "title": "A Letter to Tomorrow",
    "subtitle": "Speculative short fiction",
    "paragraphs": [
      "The letter arrived on an ordinary Tuesday, addressed in Leila's handwriting but dated twenty years ahead. It contained no warnings, no lottery numbers, and no grand predictions. Only a list of small things: call your brother; learn the name of the tree outside your window; keep the recipe your grandmother wrote on the back of an envelope.",
      "Leila studied the paper for evidence of a trick. The handwriting was unmistakable. The envelope had no return address. Eventually, she stopped asking who had sent it and began asking why these details mattered.",
      "That evening she called her brother. They spoke for eleven minutes, mostly about nothing important. Afterward, Leila put the letter in a drawer. She did not know whether it came from her future self, but she knew she had enjoyed the call."
    ],
    "glossary": {
      "addressed": [
        "Written with a name and destination.",
        "宛名を書いた"
      ],
      "grand predictions": [
        "Important statements about the future.",
        "大きな未来予測"
      ],
      "unmistakable": [
        "So clear that it cannot be confused with something else.",
        "見間違えようのない"
      ],
      "eventually": [
        "After some time.",
        "やがて"
      ]
    },
    "study": "The mystery is never solved. Ask which part of the story actually changes the character.",
    "questions": [
      {
        "q": "What makes this story unusual?",
        "options": [
          "A letter seems to come from the future.",
          "Leila moves to another city.",
          "A recipe is lost."
        ],
        "answer": 0,
        "why": "The letter is dated twenty years ahead in Leila's own handwriting."
      },
      {
        "q": "What is the likely central idea?",
        "options": [
          "Every mystery needs a final solution.",
          "Ordinary relationships may matter more than extraordinary predictions.",
          "Writing letters is always dangerous."
        ],
        "answer": 1,
        "why": "Leila finds meaning through a simple call, not through solving the mystery."
      }
    ]
  },
  {
    "id": "library-notice",
    "collection": "everyday",
    "tier": "Starter",
    "format": "notice",
    "title": "Library Opening Hours",
    "subtitle": "A practical notice",
    "paragraphs": [
      "CITY LIBRARY",
      "Monday–Friday: 9:00 a.m.–6:00 p.m.",
      "Saturday: 10:00 a.m.–4:00 p.m.",
      "Sunday: Closed.",
      "Please return books at the desk or use the return box near the entrance. The return box is available after opening hours."
    ],
    "glossary": {
      "opening hours": [
        "The times when a place is open.",
        "営業時間"
      ],
      "return": [
        "Give something back.",
        "返却する"
      ],
      "entrance": [
        "The place where you go into a building.",
        "入口"
      ],
      "available": [
        "Able to be used.",
        "利用できる"
      ]
    },
    "study": "When reading a notice, start with the decision you need to make, not every word.",
    "questions": [
      {
        "q": "Can you enter the library at 3 p.m. on Saturday?",
        "options": [
          "Yes.",
          "No.",
          "Only with a library card."
        ],
        "answer": 0,
        "why": "Saturday hours are 10 a.m. to 4 p.m."
      },
      {
        "q": "Where can you return a book after closing?",
        "options": [
          "At the main desk.",
          "In the return box.",
          "At the café."
        ],
        "answer": 1,
        "why": "The notice says the return box is available after opening hours."
      }
    ]
  },
  {
    "id": "train-message",
    "collection": "everyday",
    "tier": "Easy",
    "format": "message",
    "title": "A Change of Plans",
    "subtitle": "Read a message thread",
    "paragraphs": [
      "8:12 — Alex: The 8:20 train is delayed by 25 minutes. I'm still at the station.",
      "8:13 — Maya: No problem. Should we meet at the café instead of the museum entrance?",
      "8:14 — Alex: Yes, that works. Please order me a tea. I'll pay you back.",
      "8:15 — Maya: Sure. Text me when you're five minutes away."
    ],
    "glossary": {
      "delayed": [
        "Happening later than planned.",
        "遅延した"
      ],
      "instead of": [
        "In place of something.",
        "〜の代わりに"
      ],
      "that works": [
        "That plan is acceptable.",
        "それで大丈夫"
      ],
      "pay you back": [
        "Return money someone spent for you.",
        "お金を返す"
      ]
    },
    "study": "Messages often change plans. Track the new meeting place and the action each person must take.",
    "questions": [
      {
        "q": "Where will Alex and Maya meet?",
        "options": [
          "At the museum entrance.",
          "At the café.",
          "On the train."
        ],
        "answer": 1,
        "why": "They agree to meet at the café instead."
      },
      {
        "q": "What should Alex do shortly before arriving?",
        "options": [
          "Order tea.",
          "Buy tickets.",
          "Send Maya a text."
        ],
        "answer": 2,
        "why": "Maya asks him to text when he is five minutes away."
      }
    ]
  },
  {
    "id": "maintenance-email",
    "collection": "everyday",
    "tier": "Developing",
    "format": "email",
    "title": "An Apartment Inspection",
    "subtitle": "Read the conditions before replying",
    "paragraphs": [
      "Subject: Annual water-pipe inspection",
      "Hello residents,",
      "Our maintenance team will inspect the building's water pipes on Thursday, 12 November, between 10 a.m. and 2 p.m. Water supply may be interrupted for up to thirty minutes during this period.",
      "You do not need to be at home. However, please clear any items stored in front of the utility cupboard by Wednesday evening. If you notice a leak before the inspection, contact the building office immediately rather than waiting for the team.",
      "Thank you for your cooperation,",
      "Building Management"
    ],
    "glossary": {
      "inspect": [
        "Examine carefully to check for problems.",
        "点検する"
      ],
      "interrupted": [
        "Stopped temporarily.",
        "一時的に止まる"
      ],
      "utility cupboard": [
        "A storage space for building equipment.",
        "設備用収納庫"
      ],
      "rather than": [
        "Instead of.",
        "〜ではなく"
      ],
      "cooperation": [
        "Working together to help something happen.",
        "協力"
      ]
    },
    "study": "Separate information, required action and exceptions. A good reader notices deadlines and conditions.",
    "questions": [
      {
        "q": "What must residents do by Wednesday evening?",
        "options": [
          "Stay home for four hours.",
          "Clear the area in front of the utility cupboard.",
          "Turn off all lights."
        ],
        "answer": 1,
        "why": "The email asks residents to clear items by Wednesday evening."
      },
      {
        "q": "What should a resident do if a leak appears before the inspection?",
        "options": [
          "Wait until Thursday.",
          "Contact the building office immediately.",
          "Call a neighbor only."
        ],
        "answer": 1,
        "why": "The instruction explicitly says not to wait for the team."
      }
    ]
  },
  {
    "id": "garden-post",
    "collection": "media",
    "tier": "Easy",
    "format": "post",
    "title": "A Neighborhood Garden Post",
    "subtitle": "Reading a social media announcement",
    "paragraphs": [
      "GREEN STREET COMMUNITY · Yesterday",
      "We planted forty tomato plants at the community garden this weekend! Thank you to everyone who helped.",
      "Next Saturday, we need two volunteers to water the seedlings between 9 and 10 a.m. Gloves and tools will be provided. No experience needed.",
      "Interested? Send us a direct message by Friday evening. Please don't post your phone number in the comments."
    ],
    "glossary": {
      "volunteers": [
        "People who help without being paid.",
        "ボランティア"
      ],
      "seedlings": [
        "Very young plants.",
        "苗"
      ],
      "provided": [
        "Supplied or made available.",
        "用意される"
      ],
      "direct message": [
        "A private message on a social platform.",
        "ダイレクトメッセージ"
      ]
    },
    "study": "A post can mix an update with a request. Identify who is being asked to do what.",
    "questions": [
      {
        "q": "What is the post asking readers to do?",
        "options": [
          "Buy tomatoes.",
          "Volunteer to water plants.",
          "Bring their own tools."
        ],
        "answer": 1,
        "why": "The group is seeking two volunteers for watering."
      },
      {
        "q": "How should interested readers respond?",
        "options": [
          "Post their phone number publicly.",
          "Send a direct message by Friday.",
          "Arrive without contacting anyone."
        ],
        "answer": 1,
        "why": "The post explicitly requests a direct message by Friday evening."
      }
    ]
  },
  {
    "id": "review-ratings",
    "collection": "media",
    "tier": "Developing",
    "format": "review",
    "title": "Five Stars, One Problem",
    "subtitle": "Think about what a rating tells you",
    "paragraphs": [
      "Review A · ★★★★★",
      "The room was spotless and the staff were helpful. I stayed for one night on a quiet weekday.",
      "Review B · ★★☆☆☆",
      "The location was excellent, but I could hear traffic from my room until midnight. I stayed on a busy Saturday.",
      "Hotel summary: 4.6 out of 5 based on 38 reviews.",
      "A high average rating is useful, but it does not guarantee the same experience for every visitor. Different rooms, dates and expectations can produce different reports. If quiet matters most to you, these two reviews raise a question that the average score does not answer."
    ],
    "glossary": {
      "spotless": [
        "Extremely clean.",
        "非常に清潔な"
      ],
      "traffic": [
        "Vehicles on roads.",
        "交通"
      ],
      "average rating": [
        "A single score calculated from many reviews.",
        "平均評価"
      ],
      "guarantee": [
        "Promise that something will happen.",
        "保証する"
      ],
      "expectations": [
        "What someone thinks or hopes will happen.",
        "期待"
      ]
    },
    "study": "Look beyond the average. Ask whether the reviewer's circumstances match yours.",
    "questions": [
      {
        "q": "What differs between the two reviewers?",
        "options": [
          "The days they stayed.",
          "The country they visited.",
          "Whether breakfast was included."
        ],
        "answer": 0,
        "why": "One stayed on a quiet weekday, the other on a busy Saturday."
      },
      {
        "q": "What cannot be concluded from the average rating alone?",
        "options": [
          "The hotel has reviews.",
          "Every room will be quiet.",
          "The rating is 4.6."
        ],
        "answer": 1,
        "why": "An average cannot guarantee one person's experience."
      }
    ]
  },
  {
    "id": "heat-center-report",
    "collection": "media",
    "tier": "Confident",
    "format": "news",
    "title": "City Opens Evening Cooling Rooms",
    "subtitle": "A short original local-news example",
    "paragraphs": [
      "City Services | Public information desk",
      "The city announced on Monday that three public buildings will remain open until 9 p.m. during this week's hot weather. The spaces will offer drinking water, seating and air-conditioned rooms at no charge.",
      "The announcement follows several days of above-average temperatures. Officials said they will review the opening hours at the end of the week. The statement did not say how many residents are expected to use the facilities.",
      "A local volunteer group welcomed the decision but asked whether the buildings could also open earlier for people who work night shifts. The city has not yet responded to that proposal."
    ],
    "glossary": {
      "above-average": [
        "Higher than the usual level.",
        "平均を上回る"
      ],
      "facilities": [
        "Buildings or equipment provided for a purpose.",
        "施設"
      ],
      "review": [
        "Examine again before making a decision.",
        "再検討する"
      ],
      "proposal": [
        "A suggested plan or course of action.",
        "提案"
      ]
    },
    "study": "Distinguish an official announcement, a group's response and what remains unknown. This is a fictional training article, not live local news.",
    "questions": [
      {
        "q": "Which detail is confirmed in the passage?",
        "options": [
          "Three buildings will remain open until 9 p.m.",
          "Every resident will use the service.",
          "Opening hours are permanent."
        ],
        "answer": 0,
        "why": "The announcement specifies three buildings and a 9 p.m. closing time."
      },
      {
        "q": "What remains unanswered?",
        "options": [
          "Whether water is free.",
          "Whether the buildings can open earlier.",
          "Whether the temperature is above average."
        ],
        "answer": 1,
        "why": "The city has not answered the volunteer group's proposal."
      }
    ]
  },
  {
    "id": "why-lines-form",
    "collection": "ideas",
    "tier": "Developing",
    "format": "essay",
    "title": "Why Do Lines Form?",
    "subtitle": "An explanation of an everyday pattern",
    "paragraphs": [
      "A line forms when people arrive faster than a service can help them. Imagine a café where the cashier serves one customer each minute. If three customers walk in during the same minute, two must wait even if the cashier works efficiently.",
      "The important distinction is between the speed of arriving and the speed of serving. A café might have no line at 10 a.m. and a long one at noon without any change in staff effort.",
      "This also explains why a line can persist after the rush ends: the service must first finish helping people who are already waiting. Adding a second cashier may reduce the queue, but the size of the effect depends on how many people continue to arrive."
    ],
    "glossary": {
      "efficiently": [
        "Without wasting time or effort.",
        "効率的に"
      ],
      "distinction": [
        "A difference between two things.",
        "区別"
      ],
      "persist": [
        "Continue to exist.",
        "続く"
      ],
      "depends on": [
        "Is determined or affected by.",
        "〜による"
      ]
    },
    "study": "Explanations often rely on a cause, an example, and a condition. Locate all three.",
    "questions": [
      {
        "q": "According to the passage, why can a line remain after arrivals slow down?",
        "options": [
          "Cashiers always become slower.",
          "Customers already waiting still need service.",
          "All cafés close at noon."
        ],
        "answer": 1,
        "why": "The existing queue must be served before the line disappears."
      },
      {
        "q": "Which claim is conditional rather than guaranteed?",
        "options": [
          "A second cashier may reduce the queue.",
          "Customers arrive at different times.",
          "A line involves waiting."
        ],
        "answer": 0,
        "why": "The effect depends on arrivals and service capacity."
      }
    ]
  },
  {
    "id": "one-week-test",
    "collection": "ideas",
    "tier": "Confident",
    "format": "essay",
    "title": "What Can a One-Week Experiment Tell Us?",
    "subtitle": "Evaluate a claim, not a slogan",
    "paragraphs": [
      "A language-learning app asks users to practise for one week. Afterward, 80 percent of those who complete the week say they feel more confident. The company announces that its method makes people fluent in seven days.",
      "The survey supports a narrower conclusion: among respondents who finished the week, many reported increased confidence. It does not show that their English became fluent. Confidence and skill are related but different measurements.",
      "There is another problem. People who stopped using the app were not included in the result. Perhaps the method helped them less, or perhaps they left for reasons unrelated to learning. Without their responses or an independent language assessment, the broader claim remains uncertain."
    ],
    "glossary": {
      "respondents": [
        "People who answer a survey.",
        "回答者"
      ],
      "narrower conclusion": [
        "A more limited conclusion.",
        "より限定的な結論"
      ],
      "measurements": [
        "Ways of finding or recording an amount or quality.",
        "測定値"
      ],
      "independent assessment": [
        "An evaluation separate from the original claim-maker.",
        "独立した評価"
      ]
    },
    "study": "Ask three questions: What was actually measured? Who was included? What conclusion follows?",
    "questions": [
      {
        "q": "What did the survey measure directly?",
        "options": [
          "Fluency.",
          "Confidence reported by completers.",
          "Grammar accuracy in a controlled test."
        ],
        "answer": 1,
        "why": "Only confidence reported by respondents who completed the week is described."
      },
      {
        "q": "Why is the advertisement too strong?",
        "options": [
          "Confidence and fluency were treated as the same thing.",
          "Surveys can never be useful.",
          "Nobody completed the week."
        ],
        "answer": 0,
        "why": "The measured outcome does not establish fluency."
      }
    ]
  },
  {
    "id": "models-and-reality",
    "collection": "ideas",
    "tier": "Advanced",
    "format": "essay",
    "title": "A Useful Model Is Not the Thing It Models",
    "subtitle": "On maps, predictions and mistaken certainty",
    "paragraphs": [
      "A map can guide you through a city precisely because it leaves things out. It does not show every crack in the pavement or every conversation taking place on the street. Its usefulness depends on representing the features needed for a particular decision.",
      "Scientific models work in much the same way. A model of traffic may describe roads and vehicle flow while ignoring drivers' private motives. That simplification is not automatically a defect. It becomes a problem when we ask the model to answer a question that depends on something it excludes.",
      "There is a subtle temptation here: because a model makes accurate predictions in one setting, we begin to treat its categories as if they were the structure of reality itself. Good reasoning resists that jump. It asks not merely whether a model works, but for which questions, under which assumptions, and with what consequences when it fails."
    ],
    "glossary": {
      "represents": [
        "Stands for or describes something.",
        "表す"
      ],
      "simplification": [
        "Making something less complex.",
        "単純化"
      ],
      "defect": [
        "A fault or weakness.",
        "欠点"
      ],
      "temptation": [
        "A strong desire to do something, even if unwise.",
        "誘惑"
      ],
      "assumptions": [
        "Things accepted as true for the sake of reasoning.",
        "前提"
      ]
    },
    "study": "Track the analogy (maps → scientific models), then identify the limit placed on the central claim.",
    "questions": [
      {
        "q": "When does simplification become a problem, according to the passage?",
        "options": [
          "Whenever details are missing.",
          "When the excluded details matter to the question.",
          "Whenever a model uses numbers."
        ],
        "answer": 1,
        "why": "The model fails as an answer when relevant features are omitted."
      },
      {
        "q": "What is the main warning?",
        "options": [
          "Never trust predictions.",
          "Do not confuse predictive success with an unlimited description of reality.",
          "Maps should include every detail."
        ],
        "answer": 1,
        "why": "The final paragraph warns against extending a model beyond its scope."
      }
    ]
  },
  {
    "id": "window-poem",
    "collection": "literature",
    "tier": "Developing",
    "format": "poem",
    "title": "The Window at Six",
    "subtitle": "An original short poem",
    "paragraphs": [
      "At six the window holds the rain,",
      "The streetlights bloom in little pools.",
      "A bicycle goes past again;",
      "The city folds its paper rules.",
      "I make two cups, then set one down.",
      "The kettle sings to no one here.",
      "Outside, the evening fills the town.",
      "Inside, an empty chair stays near."
    ],
    "glossary": {
      "streetlights": [
        "Lamps beside roads.",
        "街灯"
      ],
      "bloom": [
        "Open like a flower; here, spread brightly.",
        "花開く、広がる"
      ],
      "kettle": [
        "A container for boiling water.",
        "やかん"
      ],
      "empty chair": [
        "A chair with nobody sitting in it.",
        "空席"
      ]
    },
    "study": "Poetry can suggest an emotion through objects rather than stating it. Read once for the scene, then for the mood.",
    "questions": [
      {
        "q": "Which detail most strongly suggests someone's absence?",
        "options": [
          "A bicycle passes.",
          "Two cups are prepared but only one is used.",
          "It is six o'clock."
        ],
        "answer": 1,
        "why": "The unused cup and empty chair imply another person is missing."
      },
      {
        "q": "What mood is most supported by the poem?",
        "options": [
          "Quiet loneliness.",
          "Public celebration.",
          "Anger at traffic."
        ],
        "answer": 0,
        "why": "The unused cup, singing kettle and empty chair create a subdued scene."
      }
    ]
  },
  {
    "id": "mapmaker",
    "collection": "literature",
    "tier": "Confident",
    "format": "story",
    "title": "The Mapmaker's Blank Space",
    "subtitle": "An original literary scene",
    "paragraphs": [
      "The mapmaker was famous for drawing everything: lanes that turned into footpaths, abandoned wells, even the steps that disappeared beneath the river each spring. His maps were so detailed that visitors sometimes trusted them more than their own eyes.",
      "On the edge of each map, however, he left a pale square untouched. When asked why, he offered different explanations. To children he called it a place for dragons. To merchants he said the ink had not yet dried. Only his daughter knew the truth.",
      "Years ago, his wife had taken a walk through the hills and never returned. He had searched every route he could draw. The blank square was not where she had gone; it was where the certainty of his maps ended.",
      "After he died, his daughter continued the work. She kept the square, but beneath it she wrote: 'There is still more to learn.'"
    ],
    "glossary": {
      "abandoned": [
        "Left empty or no longer used.",
        "放棄された"
      ],
      "untouched": [
        "Not changed or marked.",
        "手つかずの"
      ],
      "merchants": [
        "People who buy and sell goods.",
        "商人"
      ],
      "certainty": [
        "The feeling or state of being sure.",
        "確信"
      ],
      "beneath": [
        "Under something.",
        "〜の下に"
      ]
    },
    "study": "The blank space is both a real feature of the map and a symbol. Separate these meanings first.",
    "questions": [
      {
        "q": "What did the blank square originally represent?",
        "options": [
          "A secret treasure.",
          "The limit of what the mapmaker knew.",
          "The location of his home."
        ],
        "answer": 1,
        "why": "He could not know where his wife had gone, despite mapping every route."
      },
      {
        "q": "How does the daughter change its meaning?",
        "options": [
          "She treats it as a place for future discovery.",
          "She erases it from every map.",
          "She fills it with dragons."
        ],
        "answer": 0,
        "why": "'There is still more to learn' emphasizes openness rather than only loss."
      }
    ]
  },
  {
    "id": "stairs-at-dawn",
    "collection": "literature",
    "tier": "Advanced",
    "format": "story",
    "title": "The Light on the Stairs",
    "subtitle": "An original reflective passage",
    "paragraphs": [
      "When I returned to the house, the stairs seemed narrower than they had in childhood. Nothing measurable had changed. The walls were where I remembered them, and the third step still gave its small complaint beneath my weight. Yet the distances between rooms, once immense, had quietly surrendered their importance.",
      "I had come to sort the things my father left behind: a cracked watch, an envelope of receipts, a drawer full of keys to locks nobody could identify. The objects were ordinary, even dull. I kept expecting one of them to explain him to me, as if a life were a puzzle whose missing piece could be found at the back of a cupboard.",
      "In the late afternoon, sunlight reached the landing and rested across the worn wood. I sat down on the top step. For the first time that day I stopped searching for an answer and allowed the house simply to be familiar."
    ],
    "glossary": {
      "measurable": [
        "Possible to measure.",
        "測定できる"
      ],
      "surrendered": [
        "Gave up or yielded; here, lost.",
        "手放した、失った"
      ],
      "receipts": [
        "Records showing that payment was made.",
        "領収書"
      ],
      "landing": [
        "The flat area between flights of stairs.",
        "階段の踊り場"
      ],
      "familiar": [
        "Known from earlier experience.",
        "見慣れた"
      ]
    },
    "study": "Literary narrators may describe perception rather than physical facts. Notice the distinction between changed space and changed self.",
    "questions": [
      {
        "q": "Why do the stairs seem narrower?",
        "options": [
          "The building has physically shrunk.",
          "The narrator's perspective has changed over time.",
          "Someone rebuilt the staircase."
        ],
        "answer": 1,
        "why": "The text explicitly says nothing measurable changed."
      },
      {
        "q": "What changes in the narrator's approach at the end?",
        "options": [
          "They stop demanding that the objects explain their father.",
          "They find a hidden letter.",
          "They decide to sell the house."
        ],
        "answer": 0,
        "why": "They give up searching for a final answer and allow familiarity to be enough."
      }
    ]
  }
]
export const readingTextById = Object.fromEntries(readingTexts.map(text => [text.id, text]))
