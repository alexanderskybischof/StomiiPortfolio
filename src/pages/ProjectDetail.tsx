import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getProjectBySlug, getYoutubeEmbedUrl } from '../data/projects';

const ProjectDetail: React.FC = () => {
  const { projectSlug } = useParams<{ projectSlug: string }>();
  const assetPrefix = process.env.PUBLIC_URL || '';
  const project = getProjectBySlug(projectSlug);

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  const embedUrl = getYoutubeEmbedUrl(project.videoUrl);
  const secondaryEmbedUrl = project.secondaryVideoUrl
    ? getYoutubeEmbedUrl(project.secondaryVideoUrl)
    : '';

  return (
    <main className="page page--project">
      <div className="page-content page-content--project">
        <div className="project-detail__header work-fade visible">
          <Link to="/work" className="project-detail__back-link">
            Back to Work
          </Link>
          <h1>{project.title}</h1>
        </div>

        <section className="project-detail__video work-fade visible">
          <div className="project-detail__video-grid">
            <div className="project-detail__video-frame">
              <iframe
                src={embedUrl}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
            {secondaryEmbedUrl ? (
              <div className="project-detail__video-frame">
                <iframe
                  src={secondaryEmbedUrl}
                  title={`${project.title} alternate video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            ) : null}
          </div>
        </section>

        <section className="project-detail__description work-fade visible">
          <p>{project.description}</p>
        </section>

        <section className="project-detail__stills work-fade visible" aria-label={`${project.title} still frames`}>
          {project.stillFrames.map((frame) => (
            <figure
              className={`project-detail__still${frame.solidBackground ? ' project-detail__still--solid' : ''}`}
              key={frame.src}
            >
              <img
                className={frame.solidBackground ? 'project-detail__still-image--solid' : undefined}
                src={frame.src}
                alt={frame.alt}
                loading="lazy"
              />
            </figure>
          ))}
        </section>

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
                <img src={`${assetPrefix}/ytgreenlogo.png`} alt="YouTube" className="logo-yt" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default ProjectDetail;
