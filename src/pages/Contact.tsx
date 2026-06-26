import React from 'react';
import { useLanguage } from '../i18n';

const Contact: React.FC = () => {
  const assetPrefix = process.env.PUBLIC_URL || '';
  const { language } = useLanguage();
  const copy =
    language === 'ja'
      ? {
          title: '連絡先',
          intro: '以下のフォームにご記入いただくか、contact@stomii.com までメールでお気軽にご連絡ください。',
          name: 'お名前',
          yourName: 'お名前',
          email: 'メールアドレス',
          yourEmail: 'メールアドレス',
          message: 'メッセージ',
          yourMessage: 'メッセージ',
          referral: 'どこで私たちを知りましたか？',
          selectOption: '選択してください',
          socialMedia: 'ソーシャルメディア',
          friend: '友人',
          searchEngine: '検索エンジン',
          other: 'その他',
          submit: '送信',
          youtubeAlt: 'YouTube',
        }
      : {
          title: 'Contact',
          intro: 'Feel free to reach out by filling out the form below or emailing us at contact@stomii.com!',
          name: 'Name',
          yourName: 'Your Name',
          email: 'Email',
          yourEmail: 'Your Email',
          message: 'Message',
          yourMessage: 'Your Message',
          referral: 'How did you hear about us?',
          selectOption: 'Select an option',
          socialMedia: 'Social Media',
          friend: 'Friend',
          searchEngine: 'Search Engine',
          other: 'Other',
          submit: 'Submit',
          youtubeAlt: 'YouTube',
        };
  return (
    <main className="page page--contact">
      <div className="page-content contact-content">
        <h1>{copy.title}</h1>
        <p>{copy.intro}</p>

        <section className="contact-section">
          <form
            action="https://formspree.io/f/xnjjjgwl" // Replace YOUR_FORM_ID with your Formspree ID
            method="POST"
            className="contact-form"
          >
            <div className="form-group">
              <label htmlFor="name">{copy.name}:</label>
              <input type="text" id="name" name="name" placeholder={copy.yourName} required />
            </div>

            <div className="form-group">
              <label htmlFor="email">{copy.email}:</label>
              <input type="email" id="email" name="email" placeholder={copy.yourEmail} required />
            </div>

            <div className="form-group">
              <label htmlFor="message">{copy.message}:</label>
              <textarea id="message" name="message" rows={5} placeholder={copy.yourMessage} required></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="referral">{copy.referral}</label>
              <select id="referral" name="referral" required defaultValue="">
                <option value="" disabled>
                  {copy.selectOption}
                </option>
                <option value="social-media">{copy.socialMedia}</option>
                <option value="friend">{copy.friend}</option>
                <option value="search-engine">{copy.searchEngine}</option>
                <option value="other">{copy.other}</option>
              </select>
            </div>

            <button type="submit" className="submit-button">{copy.submit}</button>
          </form>
          
        </section>
        
      </div>
      
{/* Full-width footer outside the form/content */}
<footer className="footer">
        <div className="footer-inner">
          <div className="footer-left">
            <div>Copyright © 2026, stomii.com</div>
            <div>contact@stomii.com</div>
          </div>
          <div className="footer-right">
            {/* <a href="https://www.instagram.com/askypic" target="_blank" rel="noopener noreferrer" className="social-link">
              <img src="igicon.png" alt="Instagram" className="logo-ig" />
            </a> */}
            <a href="https://www.youtube.com/@stomiistudios" target="_blank" rel="noopener noreferrer" className="social-link">
              <img src={`${assetPrefix}/ytgreenlogo.png`} alt={copy.youtubeAlt} className="logo-yt" draggable={false} />
            </a>
          </div>
        </div>
      </footer>
    </main>    
  );
};

export default Contact;
