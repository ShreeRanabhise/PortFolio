import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Shree Ranabhise | AI Web Developer Portfolio',
    short_name: 'Shree Ranabhise',
    description: 'Portfolio of Shree Ranabhise - AI Web Developer building scalable web applications and cloud architecture.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f1218',
    theme_color: '#0f1218',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
