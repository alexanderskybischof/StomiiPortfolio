import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

const Home: React.FC = () => {
  const infoContentRef = useRef<HTMLDivElement | null>(null);
  const infoImageRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const brandsRef = useRef<HTMLElement | null>(null);
  const assetPrefix = process.env.PUBLIC_URL || '';

  useEffect(() => {
    const targets: (Element | null)[] = [infoContentRef.current, infoImageRef.current, brandsRef.current];
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

    targets.forEach((target) => target && observer.observe(target));

    return () => observer.disconnect();
  }, []);

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <header className="hero-section" id="home">
        <div className="video-container">
          <video
            className="background-video"
            autoPlay
            loop
            muted
            id="background-video"
            ref={videoRef}
          >
            <source src={`${assetPrefix}/rel.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="hero-text">
          <img src={`${assetPrefix}/sforstomii.png`} alt="Alexander Sky Logo middle" />
        </div>
        <button className="video-control" onClick={toggleVideoPlayback} aria-label={isPlaying ? 'Pause video' : 'Play video'}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
      </header>

      <section className="info-section" id="about">
        <div className="bio-container">
          <div className="info-content" ref={infoContentRef}>
            <h2>Stomii Studios</h2>
            <p>	<h3>Who</h3> Stomii is a boutique, full-service production company run by Alexander Sky Bischof and Tomoki Narukawa specializing in outdoor commercials and documentaries. 
	<h3>What</h3> Our strengths lie in naturalistic, fast-paced storytelling grounded in human movement and dynamic outdoor settings. In the past, we have worked with clothing brands, surf schools, athletic teams, and nonprofits. 
	<h3>Where</h3> We are currently located out of Sydney, Australia, but frequently travel to Tokyo, San Francisco, and Boston. Let’s get in touch and discuss!
</p>
          </div>

          <div className="info-image" ref={infoImageRef}>
            <img src={`${assetPrefix}/Alex.JPG`} alt="Alexander Sky portrait" />
          </div>
        </div>
      </section>

      <section className="brands-section work-fade" ref={brandsRef}>
        <div className="brands-grid">
          <img src={`${assetPrefix}/brand1.png`} alt="Brand 1" className="brand-logo" />
          <img src={`${assetPrefix}/brand2.png`} alt="Brand 2" className="brand-logo" />
          <img src={`${assetPrefix}/brand3.png`} alt="Brand 3" className="brand-logo" />
          <img src={`${assetPrefix}/brand4.png`} alt="Brand 4" className="brand-logo" />
          <img src={`${assetPrefix}/brand5.png`} alt="Brand 5" className="brand-logo" />
          <img src={`${assetPrefix}/brand6.png`} alt="Brand 6" className="brand-logo" />
          <img src={`${assetPrefix}/brand7.png`} alt="Brand 7" className="brand-logo" />
          <img src={`${assetPrefix}/brand8.png`} alt="Brand 8" className="brand-logo" />
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
              <img src={`${assetPrefix}/ytgreenlogo.png`} alt="YouTube" className="logo-yt" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
