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
};

/** Card thumbnails in public/images/thumbs are at most 720 px wide (see scripts/optimize-images.py). */
export function designImage(id: string) {
  const [width, height] = designSizes[id] ?? [1254, 1254];
  const thumbWidth = Math.min(width, 720);
  return {
    thumb: `/images/thumbs/${id}.webp`,
    full: `/images/${id}.webp`,
    width: thumbWidth,
    height: Math.round((height * thumbWidth) / width),
    fullWidth: width,
  };
}
