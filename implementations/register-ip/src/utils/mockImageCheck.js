export const checkImageOriginality = async (file) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  const hasWatermark = file.name.includes('_watermarked');
  return hasWatermark ? 90 + Math.floor(Math.random() * 10) : 60 + Math.floor(Math.random() * 20);
};
