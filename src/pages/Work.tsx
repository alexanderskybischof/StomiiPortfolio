import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

const Work: React.FC = () => {
  const assetPrefix = process.env.PUBLIC_URL || '';

  useEffect(() => {
    const cards = document.querySelectorAll('.work-row');
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

  return (
    <main className="page page--work">
      <div className="page-content page-content--work">
        <h1 className="work-fade">Work</h1>
        <p className="work-description work-fade">
          
        </p>

        <section className="work-list work-fade">
          {projects.map((project) => (
            <Link className="work-row" key={project.slug} to={`/work/${project.slug}`}>
              <div className="work-row__label">
                <h2 className="work-row__title">{project.title}</h2>
              </div>
              <div className="work-row__media">
                {project.thumbnail.type === 'video' ? (
                  <video
                    src={project.thumbnail.src}
                    muted
                    playsInline
                    autoPlay
                    loop
                    preload="metadata"
                    aria-label={project.thumbnail.alt}
                  />
                ) : (
                    <img src={project.thumbnail.src} alt={project.thumbnail.alt} loading="lazy" />
                )}
              </div>
            </Link>
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
                <img src={`${assetPrefix}/ytgreenlogo.png`} alt="YouTube" className="logo-yt" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default Work;
