import type { LocalizedText } from '../i18n';

export type Project = {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  videoUrl: string;
  secondaryVideoUrl?: string;
  videoType: 'youtube' | 'none';
  thumbnail: {
    src: string;
    alt: LocalizedText;
    type: 'image' | 'video';
    objectPosition?: string;
  };
  stillFrames: Array<{
    src: string;
    alt: LocalizedText;
    solidBackground?: boolean;
  }>;
};

const assetPrefix = process.env.PUBLIC_URL || '';
const localized = (en: string, ja: string): LocalizedText => ({ en, ja });

export const projects: Project[] = [
  {
    slug: 'aigamo-documentary',
    title: localized('Aigamo Documentary (2027)', 'アイガモ・ドキュメンタリー (2027)'),
    description: localized(
      'The Aigamo Method is a Japanese regenerative agricultural technique where ducks are used to fertilize rice fields and eliminate pests. Through stories of Vermont farmer Erik Andrus and the international “World Duck Family,” the film explores the challenges and rewards of pursuing an unconventional path in a modern food system driven by convenience. Structured around the seasonal cycle of rice farming, the documentary portrays how shared values and purpose can connect people across cultures.',
      'アイガモ農法は、アヒルを使って田んぼに肥料を与え、害虫を取り除く日本の再生型農業の手法です。バーモント州の農家エリック・アンドラスと国際的な「ワールド・ダック・ファミリー」の物語を通して、この作品は、利便性に支配された現代の食料システムの中で、型にはまらない道を選ぶことの難しさと喜びを描きます。稲作の季節の循環に沿って構成されたこのドキュメンタリーは、価値観と目的の共有が文化を越えて人々を結びつける様子を映し出します。',
    ),
    videoType: 'none',
    videoUrl: '',
    thumbnail: {
      src: `${assetPrefix}/aigamodoc2.png`,
      alt: localized('Aigamo Documentary preview', 'アイガモ・ドキュメンタリーのプレビュー'),
      type: 'image',
      objectPosition: 'center 13%',
    },
    stillFrames: [
      {
        src: `${assetPrefix}/aigamod1.png`,
        alt: localized('Aigamo Documentary still frame 1', 'アイガモ・ドキュメンタリーのスチル 1'),
      },
      {
        src: `${assetPrefix}/aigamodoc2.png`,
        alt: localized('Aigamo Documentary still frame 2', 'アイガモ・ドキュメンタリーのスチル 2'),
      },
      {
        src: `${assetPrefix}/aigamodo3.png`,
        alt: localized('Aigamo Documentary still frame 3', 'アイガモ・ドキュメンタリーのスチル 3'),
      },
      {
        src: `${assetPrefix}/aigamodoc4.png`,
        alt: localized('Aigamo Documentary still frame 4', 'アイガモ・ドキュメンタリーのスチル 4'),
      },
    ],
  },
  {
    slug: 'hoka-spec-ad',
    title: localized('Hoka Spec Ad', 'HOKA スペック広告'),
    description: localized('', ''),
    videoType: 'youtube',
    videoUrl: 'https://www.youtube.com/watch?v=-YG1HqFnbuU',
    secondaryVideoUrl: 'https://www.youtube.com/watch?v=yqnsDNS4VFY',
    thumbnail: {
      src: `${assetPrefix}/hokaspec.png`,
      alt: localized('Hoka Spec Ad preview', 'HOKA スペック広告のプレビュー'),
      type: 'image',
    },
    stillFrames: [
      {
        src: `${assetPrefix}/hokastill0.png`,
        alt: localized('Hoka Spec Ad still frame 1', 'HOKA スペック広告のスチル 1'),
      },
      {
        src: `${assetPrefix}/hokastill1.png`,
        alt: localized('Hoka Spec Ad still frame 2', 'HOKA スペック広告のスチル 2'),
      },
      {
        src: `${assetPrefix}/hokastill2.png`,
        alt: localized('Hoka Spec Ad still frame 3', 'HOKA スペック広告のスチル 3'),
      },
      {
        src: `${assetPrefix}/hokastill3.png`,
        alt: localized('Hoka Spec Ad still frame 4', 'HOKA スペック広告のスチル 4'),
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

    return `https://www.youtube.com/embed/${shortCode}?enablejsapi=1&playsinline=1&rel=0&modestbranding=1`;
  } catch {
    return '';
  }
};
