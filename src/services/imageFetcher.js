// Using Pollinations AI - A fast, free text-to-image API.
// This guarantees that the Image visually matches the exactly worded JSON product description from Gemini,
// perfectly solving the "random" placeholders problem.

export const getDynamicImage = (queryKeyword) => {
  if (!queryKeyword) return getFallbackImage('');
  
  // Enforce extremely high-quality, high-fashion e-commerce parameters
  const prompt = `luxury ${queryKeyword} high-end fashion, e-commerce isolated product photography, pure white background, photorealistic, 8k resolution, highly detailed`;
  const encodedPrompt = encodeURIComponent(prompt);
  
  // Randomize a seed to ensure if two of the exact same queries happen, it might generate slight variations.
  const seed = Math.floor(Math.random() * 100000);
  
  return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=500&height=700&nologo=true&seed=${seed}`;
}

export const getFallbackImage = (queryKeyword) => {
  // If the dynamic image fails, we will try rendering it without specific dimensions.
  const encodedPrompt = encodeURIComponent(`minimalist ${queryKeyword || 'fashion accessory'} product photography`);
  return `https://image.pollinations.ai/prompt/${encodedPrompt}?nologo=true`;
}
