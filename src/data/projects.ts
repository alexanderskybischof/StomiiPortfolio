export type Project = {
  slug: string;
  title: string;
  description: string;
  videoUrl: string;
  secondaryVideoUrl?: string;
  thumbnail: {
    src: string;
    alt: string;
    type: 'image' | 'video';
  };
  stillFrames: Array<{
    src: string;
    alt: string;
    solidBackground?: boolean;
  }>;
};

export const projects: Project[] = [
  {
    slug: 'hoka-spec-ad',
    title: 'Hoka Spec Ad',
    description:
      '',
    videoUrl: 'https://www.youtube.com/watch?v=-YG1HqFnbuU',
    secondaryVideoUrl: 'https://www.youtube.com/watch?v=yqnsDNS4VFY',
    thumbnail: {
      src: `${process.env.PUBLIC_URL || ''}/hokaspec.png`,
      alt: 'Hoka Spec Ad preview',
      type: 'image',
    },
    stillFrames: [
      {
        src: `${process.env.PUBLIC_URL || ''}/hokastill0.png`,
        alt: 'Hoka Spec Ad still frame 1',
      },
      {
        src: `${process.env.PUBLIC_URL || ''}/hokaad.png`,
        alt: 'Hoka Spec Ad still frame 2',
      },
      {
        src: `${process.env.PUBLIC_URL || ''}/hokastill2.png`,
        alt: 'Hoka Spec Ad still frame 3',
      },
      {
        src: `${process.env.PUBLIC_URL || ''}/hokastill3.png`,
        alt: 'Hoka Spec Ad still frame 4',
      },
    ],
  },
];

export const getProjectBySlug = (slug?: string) =>
  projects.find((project) => project.slug === slug);

export const getYoutubeEmbedUrl = (videoUrl: string) => {
  try {
    const url = new URL(videoUrl);
    const shortCode = url.hostname.includes('youtu.be')
      ? url.pathname.replace('/', '')
      : url.searchParams.get('v');

    if (!shortCode) {
      return '';
    }

    return `https://www.youtube.com/embed/${shortCode}?enablejsapi=1`;
  } catch {
    return '';
  }
};
