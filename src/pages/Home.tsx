import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../i18n';

const Home: React.FC = () => {
  const infoContentRef = useRef<HTMLDivElement | null>(null);
  const infoImageRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const brandsRef = useRef<HTMLElement | null>(null);
  const assetPrefix = process.env.PUBLIC_URL || '';
  const { language } = useLanguage();

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

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 700px)').matches;
    setIsMobile(mobile);
    if (mobile && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
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

  const copy =
    language === 'ja'
      ? {
          pauseVideo: '動画を一時停止',
          playVideo: '動画を再生',
          logoAlt: 'Stomii Studios ロゴ',
          title: 'Stomii Studios',
          who: 'Stomiiは、アレクサンダー・スカイ・ビショフと成川友希が運営する、アウトドア広告とドキュメンタリーを専門とする小規模なフルサービス制作会社です。',
          what:
            '私たちの強みは、人の動きとダイナミックな屋外環境に根ざした、自然体でテンポの良いストーリーテリングにあります。これまでに、アパレルブランド、サーフスクール、スポーツチーム、非営利団体と仕事をしてきました。',
          where:
            '現在は東京、サンフランシスコ、ボストンを拠点に活動しています。ぜひご連絡ください。',
          whoLabel: '誰',
          whatLabel: '何',
          whereLabel: 'どこ',
          portraitAlt: 'アレクサンダー・スカイのポートレート',
          youtubeAlt: 'YouTube',
        }
      : {
          pauseVideo: 'Pause video',
          playVideo: 'Play video',
          logoAlt: 'Stomii Studios logo',
          title: 'Stomii Studios',
          who:
            'Stomii is a boutique, full-service production company run by Alexander Sky Bischof and Tomoki Narukawa specializing in outdoor commercials and documentaries.',
          what:
            'Our strengths lie in naturalistic, fast-paced storytelling grounded in human movement and dynamic outdoor settings. In the past, we have worked with clothing brands, surf schools, athletic teams, and nonprofits.',
          where:
            'We are currently located out of Tokyo, San Francisco, and Boston. Let’s get in touch and discuss!',
          whoLabel: 'Who',
          whatLabel: 'What',
          whereLabel: 'Where',
          portraitAlt: 'Alexander Sky portrait',
          youtubeAlt: 'YouTube',
        };

  return (
    <>
      <header className="hero-section" id="home">
        <div className="video-container">
          <video
            className="background-video"
            autoPlay={!isMobile}
            loop
            muted
            playsInline
            id="background-video"
            ref={videoRef}
          >
            <source src={`${assetPrefix}/rel.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="hero-text">
          <img src={`${assetPrefix}/sforstomii.png`} alt={copy.logoAlt} draggable={false} />
        </div>
        <button className="video-control" onClick={toggleVideoPlayback} aria-label={isPlaying ? copy.pauseVideo : copy.playVideo}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
      </header>

      <section className="info-section" id="about">
        <div className="bio-container">
          <div className="info-content" ref={infoContentRef}>
            <h2>{copy.title}</h2>
            <div className="info-copy-stack">
              <div>
                <h3>{copy.whoLabel}</h3>
                <p>{copy.who}</p>
              </div>
              <div>
                <h3>{copy.whatLabel}</h3>
                <p>{copy.what}</p>
              </div>
              <div>
                <h3>{copy.whereLabel}</h3>
                <p>{copy.where}</p>
              </div>
            </div>
          </div>

          <div className="info-image" ref={infoImageRef}>
            <img src={`${assetPrefix}/Alex.JPG`} alt={copy.portraitAlt} draggable={false} />
          </div>
        </div>
      </section>

      <section className="brands-section work-fade" ref={brandsRef}>
        <div className="brands-grid">
          <img src={`${assetPrefix}/brand1.png`} alt="Brand 1" className="brand-logo" draggable={false} />
          <img src={`${assetPrefix}/brand2.png`} alt="Brand 2" className="brand-logo" draggable={false} />
          <img src={`${assetPrefix}/brand3.png`} alt="Brand 3" className="brand-logo" draggable={false} />
          <img src={`${assetPrefix}/brand4.png`} alt="Brand 4" className="brand-logo" draggable={false} />
          <img src={`${assetPrefix}/brand5.png`} alt="Brand 5" className="brand-logo" draggable={false} />
          <img src={`${assetPrefix}/brand6.png`} alt="Brand 6" className="brand-logo" draggable={false} />
          <img src={`${assetPrefix}/brand7.png`} alt="Brand 7" className="brand-logo" draggable={false} />
          <img src={`${assetPrefix}/brand8.png`} alt="Brand 8" className="brand-logo" draggable={false} />
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
              <img src={`${assetPrefix}/ytgreenlogo.png`} alt={copy.youtubeAlt} className="logo-yt" draggable={false} />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
