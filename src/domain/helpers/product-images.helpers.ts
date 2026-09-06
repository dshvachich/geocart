export const normalizeProductImages = (imageUrls: string[]) => {
  const imageSrcSet = new Set<string>();

  return imageUrls.reduce<string[]>((images, imageUrl) => {
    const imageSrc = imageUrl.trim();

    if (!imageSrc || imageSrcSet.has(imageSrc)) {
      return images;
    }

    imageSrcSet.add(imageSrc);
    images.push(imageSrc);

    return images;
  }, []);
};
