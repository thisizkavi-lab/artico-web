import { useLanguage } from './Language'
import { RichText } from './ContentBlocks'
import Glyph from './Glyph'
import './study-documents.css'

export function StudyEmail({ block }) {
  const { language } = useLanguage()
  const ja = language === 'ja'
  const reply = block.presentation === 'email-reply'
  const parts = reply
    ? [['Greeting', 'あいさつ'], ['Confirmation + details', '受信の返事と重要な情報の確認'], ['Name', '名前']]
    : [['Subject', '件名'], ['Greeting', 'あいさつ'], ['Update', '変更点と時刻'], ['Attachment + request', '添付と返事のお願い'], ['Closing + name', '結びと名前']]
  return <figure className="ar-email-example">
    <figcaption><Glyph name={reply ? 'back' : 'arrow'} size={15} />
      {reply ? (ja ? '返信：受信と予定を確認する' : 'Reply: confirm receipt and the plan') : (ja ? 'メール：変更点を伝え、返事を頼む' : 'Email: share an update and ask for a reply')}
    </figcaption>
    <div className="ar-email-envelope">
      <span>{ja ? '差出人' : 'From'} <strong>{reply ? 'Eli' : 'Nora'}</strong></span>
      <span>{ja ? '宛先' : 'To'} <strong>{reply ? 'Nora' : 'Eli'}</strong></span>
    </div>
    {reply && <div className="ar-email-reply-subject" lang="en"><small>Subject</small> Re: Tuesday workshop: new room</div>}
    <div className="ar-email-parts">
      {block.paragraphs.map((runs, index) => <div className={`ar-email-part${!reply && index === 0 ? ' ar-email-subject' : ''}`} key={index}>
        <small className="ar-email-annotation">{parts[index]?.[ja ? 1 : 0]}</small>
        <p lang="en"><RichText runs={runs} /></p>
      </div>)}
    </div>
  </figure>
}

export function StudyForm() {
  const { language } = useLanguage()
  const ja = language === 'ja'
  return <figure className="ar-form-example">
    <figcaption>{ja ? '講座の申し込みフォーム（架空の例）' : 'Course registration · example form'}</figcaption>
    <dl className="ar-form-fields">
      <div><dt>Name <small>{ja ? '名前' : 'Your name'}</small></dt><dd>Alex Lee</dd></div>
      <div><dt>Email address <small>{ja ? 'メールアドレス' : 'Where to send the confirmation'}</small></dt><dd>alex@example.com</dd></div>
      <div><dt>Course choice <small>{ja ? '希望する講座' : 'The course you want to join'}</small></dt><dd>Tuesday workshop <Glyph name="chevron" size={14} /></dd></div>
    </dl>
    <div className="ar-form-submit-row"><span className="ar-form-submit" lang="en">Submit <Glyph name="arrow" size={15} /></span>
      <small>{ja ? '記入した内容を送信する' : 'Sends the completed form'}</small></div>
    <div className="ar-form-confirmation"><Glyph name="check" size={18} /><div>
      <small>{ja ? '送信後に表示されるメッセージ' : 'Message after submission'}</small>
      <p lang="en">Registration received. A confirmation will be sent.</p>
    </div></div>
    <p className="ar-form-caption">{ja ? '「受信」は参加枠の確定とは限りません。この例に支払いの欄はありません。' : 'Received does not yet mean a place is confirmed. This example has no payment field.'}</p>
  </figure>
}
