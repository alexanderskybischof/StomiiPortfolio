import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getProjectBySlug, getYoutubeEmbedUrl } from '../data/projects';
import { getText, useLanguage } from '../i18n';

const ProjectDetail: React.FC = () => {
  const { projectSlug } = useParams<{ projectSlug: string }>();
  const assetPrefix = process.env.PUBLIC_URL || '';
  const project = getProjectBySlug(projectSlug);
  const { language } = useLanguage();
  const [activeFrameIndex, setActiveFrameIndex] = useState<number | null>(null);
  const embedUrl = project && project.videoType === 'youtube' ? getYoutubeEmbedUrl(project.videoUrl) : '';
  const secondaryEmbedUrl = project?.secondaryVideoUrl
    ? getYoutubeEmbedUrl(project.secondaryVideoUrl)
    : '';
  const title = project ? getText(project.title, language) : '';
  const description = project ? getText(project.description, language) : '';
  const galleryFrames = project?.stillFrames ?? [];
  const activeFrame = activeFrameIndex !== null ? galleryFrames[activeFrameIndex] : null;

  useEffect(() => {
    if (activeFrameIndex === null) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveFrameIndex(null);
        return;
      }

      if (event.key === 'ArrowRight') {
        setActiveFrameIndex((currentIndex) =>
          currentIndex === null ? currentIndex : (currentIndex + 1) % galleryFrames.length,
        );
      }

      if (event.key === 'ArrowLeft') {
        setActiveFrameIndex((currentIndex) =>
          currentIndex === null ? currentIndex : (currentIndex - 1 + galleryFrames.length) % galleryFrames.length,
        );
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeFrameIndex, galleryFrames.length]);

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  return (
    <main className="page page--project">
      <div className="page-content page-content--project">
        <div className="project-detail__header work-fade visible">
          <Link to="/work" className="project-detail__back-link">
            {language === 'ja' ? '作品一覧へ戻る' : 'Back to Work'}
          </Link>
          <h1>{title}</h1>
        </div>

        {embedUrl ? (
          <section className="project-detail__video work-fade visible">
            <div className="project-detail__video-grid">
              <div className="project-detail__video-frame">
                <iframe
                  src={embedUrl}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
              {secondaryEmbedUrl ? (
                <div className="project-detail__video-frame">
                  <iframe
                    src={secondaryEmbedUrl}
                    title={language === 'ja' ? `${title} 別バージョン` : `${title} alternate video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        <section className="project-detail__description work-fade visible">
          <p>{description}</p>
        </section>

        <section className="project-detail__stills work-fade visible" aria-label={language === 'ja' ? `${title} スチル一覧` : `${title} still frames`}>
          {project.stillFrames.map((frame) => (
            <figure
              className={`project-detail__still${frame.solidBackground ? ' project-detail__still--solid' : ''}`}
              key={frame.src}
            >
              <button
                type="button"
                className="project-detail__still-button"
                onClick={() => {
                  const nextIndex = galleryFrames.findIndex((galleryFrame) => galleryFrame.src === frame.src);
                  setActiveFrameIndex(nextIndex === -1 ? null : nextIndex);
                }}
                aria-label={language === 'ja' ? `${getText(frame.alt, language)} を開く` : `Open ${getText(frame.alt, language)}`}
              >
                <img
                  className={frame.solidBackground ? 'project-detail__still-image--solid' : undefined}
                  src={frame.src}
                  alt={getText(frame.alt, language)}
                  loading="lazy"
                  draggable={false}
                />
              </button>
            </figure>
          ))}
        </section>

        {activeFrame ? (
          <div
            className="project-detail__lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={language === 'ja' ? `${title} 画像ビューア` : `${title} image viewer`}
            onClick={() => setActiveFrameIndex(null)}
          >
            <button
              type="button"
              className="project-detail__lightbox-close"
              onClick={() => setActiveFrameIndex(null)}
              aria-label={language === 'ja' ? '画像ビューアを閉じる' : 'Close image viewer'}
            >
              {language === 'ja' ? '閉じる' : 'Close'}
            </button>
            {galleryFrames.length > 1 ? (
              <button
                type="button"
                className="project-detail__lightbox-nav project-detail__lightbox-nav--prev"
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveFrameIndex((currentIndex) =>
                    currentIndex === null ? currentIndex : (currentIndex - 1 + galleryFrames.length) % galleryFrames.length,
                  );
                }}
                aria-label={language === 'ja' ? '前の写真' : 'Previous photo'}
              >
                &#8249;
              </button>
            ) : null}
            <div className="project-detail__lightbox-content" onClick={(event) => event.stopPropagation()}>
              <img src={activeFrame.src} alt={getText(activeFrame.alt, language)} draggable={false} />
            </div>
            {galleryFrames.length > 1 ? (
              <button
                type="button"
                className="project-detail__lightbox-nav project-detail__lightbox-nav--next"
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveFrameIndex((currentIndex) =>
                    currentIndex === null ? currentIndex : (currentIndex + 1) % galleryFrames.length,
                  );
                }}
                aria-label={language === 'ja' ? '次の写真' : 'Next photo'}
              >
                &#8250;
              </button>
            ) : null}
          </div>
        ) : null}

        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-left">
              <div>Copyright © 2026, stomii.com</div>
              <div>contact@stomii.com</div>
            </div>
            <div className="footer-right">
              <a
                href="https://www.youtube.com/@stomiistudios"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <img src={`${assetPrefix}/ytgreenlogo.png`} alt="YouTube" className="logo-yt" draggable={false} />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default ProjectDetail;
