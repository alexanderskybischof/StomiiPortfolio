import React, { useEffect, useRef } from 'react';

const Team: React.FC = () => {
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const targets: (Element | null)[] = [titleRef.current, leftRef.current, rightRef.current];
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    targets.forEach((t) => t && observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="page page--team">
      <div className="page-content page-content--team">
        <h1 className="work-fade" ref={titleRef}>Team</h1>
        <section className="team-grid">
          <div className="team-column work-fade" ref={leftRef}>
            <img className="team-photo" src="/IMG_1149.jpeg" alt="Alexander Sky portrait" />
            <div className="team-bio">
              <h2>Alexander Sky Bischof</h2>
              <p>
                alex@stomii.com
              </p>
              <a className="portfolio-link" href="https://alexanderskyb.com/" target="_blank" rel="noopener noreferrer">
                Click to view portfolio
              </a>
            </div>
          </div>

          <div className="team-divider" aria-hidden="true"></div>

          <div className="team-column work-fade" ref={rightRef}>
            <img className="team-photo" src="/Tomoki.jpg" alt="Tomoki Narukawa portrait" />
            <div className="team-bio">
              <h2>Tomoki Narukawa</h2>
              <p>
                tomoki@stomii.com
              </p>
              <a className="portfolio-link" href="https://tomokina.com" target="_blank" rel="noopener noreferrer">
                Click to view portfolio
                </a>
            </div>
          </div>
      
        </section>
        <footer className="footer">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', padding: '8px 16px' }}>
          <div style={{ textAlign: 'left', color: '#ccc', fontSize: '0.9rem' }}>
            <div>Copyright © 2026, stomii.com</div>
            <div>contact@stomii.com</div>
          </div>
          <div>
            {/* <a href="https://www.instagram.com/askypic" target="_blank" rel="noopener noreferrer" className="social-link">
              <img src="igicon.png" alt="Instagram" className="logo-ig" />
            </a> */}
            <a href="https://www.youtube.com/@stomiistudios" target="_blank" rel="noopener noreferrer" className="social-link">
              <img src="ytgreenlogo.png" alt="YouTube" className="logo-yt" />
            </a>
          </div>
        </div>
      </footer>
      </div>
    </main>
  );
};

export default Team;