/** Intrinsic sizes of the original designs in public/images (used for srcset and layout reservation). */
export const designSizes: Record<string, [number, number]> = {
  'image-01': [1088, 1088],
  'image-02': [1122, 1402],
  'image-03': [1254, 1254],
  'image-04': [1254, 1254],
  'image-05': [1254, 1254],
  'image-06': [1254, 1254],
  'image-07': [1254, 1254],
  'image-08': [1122, 1402],
  'image-09': [1254, 1254],
  'image-10': [1254, 1254],
  'image-11': [1254, 1254],
  'image-12': [1254, 1254],
  'image-13': [1254, 1254],
  'image-14': [1254, 1254],
  'image-15': [2508, 2508],
  'image-16': [2508, 2508],
  'image-17': [2048, 2048],
  'image-18': [2508, 2508],
  'image-21': [1254, 1254],
  'image-22': [1254, 1254],
  'image-23': [2048, 2048],
};

/** Designs wider than 1600 px (the 2x AI-upscaled ones) also ship this 1254 px copy in public/images/large for phones. */
const largeWidth = 1254;

/** Card thumbnails in public/images/thumbs are at most 720 px wide (see scripts/optimize-images.py). */
export function designImage(id: string) {
  const [width, height] = designSizes[id] ?? [1254, 1254];
  const thumbWidth = Math.min(width, 720);
  return {
    thumb: `/images/thumbs/${id}.webp`,
    large: width > 1600 ? { src: `/images/large/${id}.webp`, width: largeWidth } : undefined,
    full: `/images/${id}.webp`,
    width: thumbWidth,
    height: Math.round((height * thumbWidth) / width),
    fullWidth: width,
  };
}
