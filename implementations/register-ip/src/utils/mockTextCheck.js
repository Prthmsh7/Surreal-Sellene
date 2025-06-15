export const checkTextOriginality = async (text) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const hasCopy = text.toLowerCase().includes('copy') || text.toLowerCase().includes('duplicate');
  return hasCopy ? 65 + Math.floor(Math.random() * 15) : 85 + Math.floor(Math.random() * 15);
};
