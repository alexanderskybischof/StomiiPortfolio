import React from 'react';

const Contact: React.FC = () => {
  const assetPrefix = process.env.PUBLIC_URL || '';
  return (
    <main className="page page--contact">
      <div className="page-content contact-content">
        <h1>Contact</h1>
        <p>Feel free to reach out by filling out the form below or emailing us at contact@stomii.com!</p>

        <section className="contact-section">
          <form
            action="https://formspree.io/f/xnjjjgwl" // Replace YOUR_FORM_ID with your Formspree ID
            method="POST"
            className="contact-form"
          >
            {/* Name Section */}
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" placeholder="Your Name" required />
            </div>

            {/* Email Section */}
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" placeholder="Your Email" required />
            </div>

            {/* Message Section */}
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" rows={5} placeholder="Your Message" required></textarea>
            </div>

            {/* How Did You Hear About Me Section */}
            <div className="form-group">
              <label htmlFor="referral">How did you hear about us?</label>
              <select id="referral" name="referral" required>
                <option value="" disabled selected>
                  Select an option
                </option>
                <option value="social-media">Social Media</option>
                <option value="friend">Friend</option>
                <option value="search-engine">Search Engine</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-button">Submit</button>
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
              <img src={`${assetPrefix}/ytgreenlogo.png`} alt="YouTube" className="logo-yt" />
            </a>
          </div>
        </div>
      </footer>
    </main>    
  );
};

export default Contact;
