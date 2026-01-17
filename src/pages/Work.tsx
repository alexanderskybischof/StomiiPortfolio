import React, { useEffect } from 'react';

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process: () => void;
      };
    };
  }
}

type WorkItem = {
  title: string;
  roles: string[];
  youtubeId?: string;
  instagramUrl?: string;
};

const workItems: WorkItem[] = [
  // Your work items here
];

const ensureInstagramEmbedScript = () => {
  // Using direct iframe embeds; no external script required.
};

// ...existing code...
const Work: React.FC = () => {
  useEffect(() => {
    const cards = document.querySelectorAll('.work-card');
    const fadeTargets = document.querySelectorAll('.work-fade');

    if (!('IntersectionObserver' in window)) {
      cards.forEach((card) => card.classList.add('visible'));
      fadeTargets.forEach((el) => el.classList.add('visible'));
    } else {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      cards.forEach((card) => observer.observe(card));
      fadeTargets.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    ensureInstagramEmbedScript();
  }, []);

  return (
    <main className="page page--work">
      <div className="page-content page-content--work">
        <h1 className="work-fade">Work</h1>
        <p className="work-description work-fade">
          This page is currently under development, please refer to the individual links in our contact page to see current work.
        </p>

        <section className="work-grid work-fade">
          {workItems.map((item, index) => (
            <article className="work-card" key={`${item.title}-${index}`}>
              <div className="work-card__label">
                <span className="work-card__title">{item.title}</span>
                <span className="work-card__roles">{item.roles.join(' • ')}</span>
              </div>
              <div className="work-card__frame">
                {item.youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${item.youtubeId}`}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                ) : (
                  <iframe
                    src={item.instagramUrl}
                    title={item.title}
                    allowFullScreen
                    frameBorder={0}
                    loading="lazy"
                  ></iframe>
                )}
              </div>
            </article>
          ))}
        </section>

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
              <img src="ytgreenlogo.png" alt="YouTube" className="logo-yt" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  </main>
);
};
// ...existing code...

export default Work;