import { useEffect, useState } from 'react'
import { useLanguage } from './Language'
import './chapter11-visual.css'

// Each hit area is registered against its exact location in the illustrated board.
// The original drawing remains crisp at any screen size; Japanese annotations
// are live UI, and the pronunciation is attached to the word in its illustration.
const BOARDS = {
  "11-study-1": {
    "image": "ch11-calendar-words.svg",
    "alt": "April 2027 calendar with annotated month, year, days, date, weekdays, weekend, yesterday, today and tomorrow",
    "terms": [
      {
        "en": "month",
        "ja": "月",
        "x": 267,
        "y": 190,
        "width": 110
      },
      {
        "en": "year",
        "ja": "年",
        "x": 1042,
        "y": 165,
        "width": 90
      },
      {
        "en": "calendar",
        "ja": "カレンダー",
        "x": 1410,
        "y": 192,
        "width": 155
      },
      {
        "en": "day",
        "ja": "日",
        "x": 145,
        "y": 280,
        "width": 86
      },
      {
        "en": "weekday",
        "ja": "平日",
        "x": 164,
        "y": 360,
        "width": 144
      },
      {
        "en": "week",
        "ja": "週",
        "x": 148,
        "y": 475,
        "width": 100
      },
      {
        "en": "weekend",
        "ja": "週末",
        "x": 1420,
        "y": 360,
        "width": 158
      },
      {
        "en": "date",
        "ja": "日付",
        "x": 1400,
        "y": 520,
        "width": 90
      },
      {
        "en": "yesterday",
        "ja": "昨日",
        "x": 600,
        "y": 682,
        "jpY": 709,
        "width": 154
      },
      {
        "en": "today",
        "ja": "今日",
        "x": 720,
        "y": 682,
        "jpY": 709,
        "width": 96
      },
      {
        "en": "tomorrow",
        "ja": "明日",
        "x": 840,
        "y": 682,
        "jpY": 709,
        "width": 150
      }
    ]
  },
  "11-study-2": {
    "image": "ch11-writing-dates.svg",
    "alt": "Ordinals, date formats, spoken dates and spoken years",
    "terms": [
      {
        "en": "1st — first",
        "ja": "1日",
        "x": 150,
        "y": 247,
        "say": "first",
        "width": 180,
        "jpY": 268
      },
      {
        "en": "2nd — second",
        "ja": "2日",
        "x": 365,
        "y": 247,
        "say": "second",
        "width": 180,
        "jpY": 268
      },
      {
        "en": "3rd — third",
        "ja": "3日",
        "x": 580,
        "y": 247,
        "say": "third",
        "width": 180,
        "jpY": 268
      },
      {
        "en": "4th — fourth",
        "ja": "4日",
        "x": 795,
        "y": 247,
        "say": "fourth",
        "width": 180,
        "jpY": 268
      },
      {
        "en": "5th — fifth",
        "ja": "5日",
        "x": 1010,
        "y": 247,
        "say": "fifth",
        "width": 180,
        "jpY": 268
      },
      {
        "en": "6th — sixth",
        "ja": "6日",
        "x": 1225,
        "y": 247,
        "say": "sixth",
        "width": 180,
        "jpY": 268
      },
      {
        "en": "7th — seventh",
        "ja": "7日",
        "x": 1440,
        "y": 247,
        "say": "seventh",
        "width": 180,
        "jpY": 268
      },
      {
        "en": "8th — eighth",
        "ja": "8日",
        "x": 150,
        "y": 377,
        "say": "eighth",
        "width": 180,
        "jpY": 397
      },
      {
        "en": "9th — ninth",
        "ja": "9日",
        "x": 365,
        "y": 377,
        "say": "ninth",
        "width": 180,
        "jpY": 397
      },
      {
        "en": "10th — tenth",
        "ja": "10日",
        "x": 580,
        "y": 377,
        "say": "tenth",
        "width": 180,
        "jpY": 397
      },
      {
        "en": "20th — twentieth",
        "ja": "20日",
        "x": 795,
        "y": 377,
        "say": "twentieth",
        "width": 180,
        "jpY": 397
      },
      {
        "en": "21st — twenty-first",
        "ja": "21日",
        "x": 1010,
        "y": 377,
        "say": "twenty-first",
        "width": 180,
        "jpY": 397
      },
      {
        "en": "22nd — twenty-second",
        "ja": "22日",
        "x": 1225,
        "y": 377,
        "say": "twenty-second",
        "width": 180,
        "jpY": 397
      },
      {
        "en": "31st — thirty-first",
        "ja": "31日",
        "x": 1440,
        "y": 377,
        "say": "thirty-first",
        "width": 180,
        "jpY": 397
      },
      {
        "en": "04/07/2027",
        "ja": "2027年4月7日",
        "x": 264,
        "y": 552,
        "width": 305,
        "jpY": 644,
        "say": "April seventh, twenty twenty-seven"
      },
      {
        "en": "April 7, 2027",
        "ja": "2027年4月7日",
        "x": 600,
        "y": 557,
        "width": 265,
        "jpY": 580,
        "say": "April seventh, twenty twenty-seven"
      },
      {
        "en": "April seventh, twenty twenty-seven",
        "ja": "2027年4月7日",
        "x": 714,
        "y": 620,
        "width": 420,
        "jpY": 666,
        "say": "April seventh, twenty twenty-seven"
      },
      {
        "en": "1900",
        "ja": "1900年",
        "x": 1046,
        "y": 543,
        "jpY": 625,
        "say": "nineteen hundred",
        "width": 91
      },
      {
        "en": "1901",
        "ja": "1901年",
        "x": 1151,
        "y": 543,
        "jpY": 625,
        "say": "nineteen oh one",
        "width": 91
      },
      {
        "en": "2000",
        "ja": "2000年",
        "x": 1256,
        "y": 543,
        "jpY": 625,
        "say": "two thousand",
        "width": 91
      },
      {
        "en": "2001",
        "ja": "2001年",
        "x": 1361,
        "y": 543,
        "jpY": 625,
        "say": "two thousand one",
        "width": 91
      },
      {
        "en": "2033",
        "ja": "2033年",
        "x": 1466,
        "y": 543,
        "jpY": 625,
        "say": "twenty thirty-three",
        "width": 91
      }
    ]
  },
  "11-study-3": {
    "image": "ch11-telling-time.svg",
    "alt": "Twelve accurate analogue clock faces with times, minutes, seconds and hour units",
    "terms": [
      {
        "en": "one o'clock",
        "ja": "1時",
        "x": 140,
        "y": 301,
        "jpY": 329,
        "width": 227
      },
      {
        "en": "five past one",
        "ja": "1時5分",
        "x": 404,
        "y": 301,
        "jpY": 329,
        "width": 227
      },
      {
        "en": "ten past one",
        "ja": "1時10分",
        "x": 668,
        "y": 301,
        "jpY": 329,
        "width": 227
      },
      {
        "en": "quarter past one",
        "ja": "1時15分",
        "x": 932,
        "y": 301,
        "jpY": 329,
        "width": 227
      },
      {
        "en": "twenty past one",
        "ja": "1時20分",
        "x": 1196,
        "y": 301,
        "jpY": 329,
        "width": 227
      },
      {
        "en": "twenty-five past one",
        "ja": "1時25分",
        "x": 1460,
        "y": 301,
        "jpY": 329,
        "width": 227
      },
      {
        "en": "half past one",
        "ja": "1時30分",
        "x": 140,
        "y": 521,
        "jpY": 549,
        "width": 227
      },
      {
        "en": "twenty-five to two",
        "ja": "1時35分",
        "x": 404,
        "y": 521,
        "jpY": 549,
        "width": 227
      },
      {
        "en": "twenty to two",
        "ja": "1時40分",
        "x": 668,
        "y": 521,
        "jpY": 549,
        "width": 227
      },
      {
        "en": "quarter to two",
        "ja": "1時45分",
        "x": 932,
        "y": 521,
        "jpY": 549,
        "width": 227
      },
      {
        "en": "ten to two",
        "ja": "1時50分",
        "x": 1196,
        "y": 521,
        "jpY": 549,
        "width": 227
      },
      {
        "en": "five to two",
        "ja": "1時55分",
        "x": 1460,
        "y": 521,
        "jpY": 549,
        "width": 227
      },
      {
        "en": "second",
        "ja": "秒",
        "x": 192,
        "y": 604,
        "jpY": 655,
        "width": 160
      },
      {
        "en": "minute",
        "ja": "分",
        "x": 432,
        "y": 604,
        "jpY": 655,
        "width": 160
      },
      {
        "en": "hour",
        "ja": "時間",
        "x": 672,
        "y": 604,
        "jpY": 655,
        "width": 160
      },
      {
        "en": "quarter hour",
        "ja": "15分間",
        "x": 912,
        "y": 604,
        "jpY": 655,
        "width": 180
      },
      {
        "en": "half hour",
        "ja": "30分間",
        "x": 1152,
        "y": 604,
        "jpY": 655,
        "width": 175
      },
      {
        "en": "a.m. / p.m.",
        "ja": "午前／午後",
        "x": 1392,
        "y": 604,
        "jpY": 655,
        "width": 180
      }
    ]
  },
  "11-study-4": {
    "image": "ch11-frequency.svg",
    "alt": "Weekly and monthly calendars illustrating how frequently things happen",
    "terms": [
      {
        "en": "once a week",
        "ja": "週に1回",
        "x": 300,
        "y": 352,
        "jpY": 402,
        "width": 280
      },
      {
        "en": "twice a week",
        "ja": "週に2回",
        "x": 800,
        "y": 352,
        "jpY": 402,
        "width": 280
      },
      {
        "en": "three times a week",
        "ja": "週に3回",
        "x": 1300,
        "y": 352,
        "jpY": 402,
        "width": 280
      },
      {
        "en": "every day",
        "ja": "毎日",
        "x": 300,
        "y": 612,
        "jpY": 665,
        "width": 280
      },
      {
        "en": "every week",
        "ja": "毎週",
        "x": 800,
        "y": 612,
        "jpY": 665,
        "width": 280
      },
      {
        "en": "every month",
        "ja": "毎月",
        "x": 1300,
        "y": 612,
        "jpY": 665,
        "width": 280
      }
    ]
  },
  "11-study-5": {
    "image": "ch11-weather.svg",
    "alt": "Illustrated ordinary and extreme weather with English descriptions",
    "terms": [
      {
        "en": "warm",
        "ja": "暖かい",
        "x": 190,
        "y": 348,
        "jpY": 375,
        "width": 164,
        "say": "warm"
      },
      {
        "en": "sunny",
        "ja": "晴れ",
        "x": 430,
        "y": 348,
        "jpY": 375,
        "width": 164,
        "say": "sunny"
      },
      {
        "en": "chilly",
        "ja": "肌寒い",
        "x": 670,
        "y": 348,
        "jpY": 375,
        "width": 164,
        "say": "chilly"
      },
      {
        "en": "freezing",
        "ja": "凍えるほど寒い",
        "x": 910,
        "y": 348,
        "jpY": 375,
        "width": 164,
        "say": "freezing"
      },
      {
        "en": "icy",
        "ja": "凍っている",
        "x": 190,
        "y": 503,
        "jpY": 530,
        "width": 164,
        "say": "icy"
      },
      {
        "en": "snowy",
        "ja": "雪が降る",
        "x": 430,
        "y": 503,
        "jpY": 530,
        "width": 164,
        "say": "snowy"
      },
      {
        "en": "foggy",
        "ja": "霧が濃い",
        "x": 670,
        "y": 503,
        "jpY": 530,
        "width": 164,
        "say": "foggy"
      },
      {
        "en": "windy",
        "ja": "風が強い",
        "x": 910,
        "y": 503,
        "jpY": 530,
        "width": 164,
        "say": "windy"
      },
      {
        "en": "cloudy",
        "ja": "曇り",
        "x": 190,
        "y": 658,
        "jpY": 685,
        "width": 164,
        "say": "cloudy"
      },
      {
        "en": "overcast",
        "ja": "空一面が曇り",
        "x": 430,
        "y": 658,
        "jpY": 685,
        "width": 193,
        "say": "overcast"
      },
      {
        "en": "pouring",
        "ja": "土砂降り",
        "x": 670,
        "y": 658,
        "jpY": 685,
        "width": 164,
        "say": "pouring"
      },
      {
        "en": "°C / °F",
        "ja": "摂氏／華氏",
        "x": 910,
        "y": 658,
        "jpY": 685,
        "width": 164,
        "say": "degrees Celsius, degrees Fahrenheit"
      },
      {
        "en": "storm",
        "ja": "嵐",
        "x": 1195,
        "y": 348,
        "jpY": 375,
        "width": 164,
        "say": "storm"
      },
      {
        "en": "flood",
        "ja": "洪水",
        "x": 1425,
        "y": 348,
        "jpY": 375,
        "width": 164,
        "say": "flood"
      },
      {
        "en": "heat wave",
        "ja": "熱波",
        "x": 1195,
        "y": 503,
        "jpY": 530,
        "width": 164,
        "say": "heat wave"
      },
      {
        "en": "drought",
        "ja": "干ばつ",
        "x": 1425,
        "y": 503,
        "jpY": 530,
        "width": 164,
        "say": "drought"
      },
      {
        "en": "hurricane",
        "ja": "ハリケーン",
        "x": 1195,
        "y": 658,
        "jpY": 685,
        "width": 164,
        "say": "hurricane"
      },
      {
        "en": "blizzard",
        "ja": "猛吹雪",
        "x": 1425,
        "y": 658,
        "jpY": 685,
        "width": 164,
        "say": "blizzard"
      }
    ]
  }
}
const WEEKDAYS = [["Monday","月曜日"],["Tuesday","火曜日"],["Wednesday","水曜日"],["Thursday","木曜日"],["Friday","金曜日"],["Saturday","土曜日"],["Sunday","日曜日"]]
const MONTHS = [["January","1月"],["February","2月"],["March","3月"],["April","4月"],["May","5月"],["June","6月"],["July","7月"],["August","8月"],["September","9月"],["October","10月"],["November","11月"],["December","12月"]]
const base = import.meta.env.BASE_URL

function sayEnglish(phrase, onFailure) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onFailure()
    return
  }
  const speech = window.speechSynthesis
  speech.cancel()
  const utterance = new SpeechSynthesisUtterance(phrase)
  utterance.lang = 'en-US'
  utterance.rate = 0.9
  utterance.pitch = 1
  const voices = speech.getVoices()
  const usVoice = voices.find((voice) => /^en[-_]US$/i.test(voice.lang) && voice.localService)
    || voices.find((voice) => /^en[-_]US$/i.test(voice.lang))
    || voices.find((voice) => /^en\b/i.test(voice.lang))
  if (usVoice) utterance.voice = usVoice
  try {
    speech.speak(utterance)
  } catch {
    onFailure()
  }
}

function WordRow({ title, words, language, onSpeak }) {
  return (
    <div className="ar-ch11-word-row">
      <span className="ar-ch11-word-row-title">{title}</span>
      <div className="ar-ch11-words">
        {words.map(([english, japanese]) => (
          <button key={english} className="ar-ch11-inline-word" type="button"
            title={`Hear: ${english}`} aria-label={`Hear ${english}`}
            onClick={() => onSpeak(english)}>
            <span lang="en">{english}</span>
            {language === 'ja' && <small lang="ja">{japanese}</small>}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Chapter11VisualBoard({ section, focusedId }) {
  const { language } = useLanguage()
  const [error, setError] = useState('')
  const board = BOARDS[section.id]
  useEffect(() => () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel()
  }, [])
  if (!board) return null
  const speak = (word) => {
    setError('')
    sayEnglish(word, () => setError(language === 'ja' ? 'この端末では音声を再生できません。' : 'English speech is unavailable on this device.'))
  }
  return (
    <div className="ar-ch11-atlas">
      <div className="ar-ch11-board" role="group" aria-label={board.alt}>
        <img className="ar-ch11-board-art" src={`${base}assets/course/${board.image}?v=20261101-5`}
          alt={board.alt} loading="lazy" draggable="false" />
        {board.terms.map((item, index) => (
          <div key={`${section.id}-${index}`}>
            <button type="button" className="ar-ch11-term-hit"
              style={{
                left: `${item.x / 16}%`,
                top: `${item.y / 7.4}%`,
                width: `${(item.width || 150) / 16}%`
              }}
              title={`Listen: ${item.say || item.en}`}
              aria-label={`Listen to ${item.say || item.en}`}
              onClick={() => speak(item.say || item.en)}>
              <span className="ar-ch11-listen-mark" aria-hidden="true">♪</span>
            </button>
            {language === 'ja' && section.id !== '11-study-5' && (
              <span className="ar-ch11-translation" lang="ja" aria-hidden="true"
                style={{left:`${item.x / 16}%`,top:`${(item.jpY || item.y+26) / 7.4}%`}}>
                {item.ja}
              </span>
            )}
          </div>
        ))}
      </div>
      {language === 'ja' && section.id === '11-study-5' && (
        <div className="ar-ch11-weather-ja" lang="ja" aria-label="天気の語彙と日本語訳">
          <div className="ar-ch11-weather-ja-grid">
            {board.terms.map((item) => (
              <div className="ar-ch11-weather-ja-item" key={item.en}>
                <span lang="en">{item.en}</span>
                <span lang="ja">{item.ja}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {section.id === '11-study-1' && (
        <div className="ar-ch11-board-notes">
          <WordRow title={language === 'ja' ? '曜日' : 'Days of the week'} words={WEEKDAYS} language={language} onSpeak={speak} />
          <WordRow title={language === 'ja' ? '月' : 'Months of the year'} words={MONTHS} language={language} onSpeak={speak} />
        </div>
      )}
      {section.id === '11-study-4' && (
        <div className="ar-ch11-board-notes ar-ch11-frequency-extra">
          <div className="ar-ch11-month-mini" aria-hidden="true">
            <strong>APRIL</strong>
            <div className="ar-ch11-month-grid">
              {Array.from({ length: 30 }, (_, index) => (
                <span key={index} className={[5, 14, 23].includes(index + 1) ? 'is-visited' : ''}>
                  {index + 1}
                </span>
              ))}
            </div>
          </div>
          <button className="ar-ch11-inline-word" type="button" title="Hear three times a month"
            onClick={() => speak('three times a month')}>
            <span lang="en">three times a month</span>
            {language === 'ja' && <small lang="ja">月に3回</small>}
          </button>
        </div>
      )}
      {error && <p className="ar-ch11-audio-error" role="status">{error}</p>}
      {focusedId && <span className="ar-ch11-screen-reader" aria-hidden="true">{focusedId}</span>}
    </div>
  )
}
