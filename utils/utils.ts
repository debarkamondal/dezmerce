export const areKeysPresent = (keys: string[], obj: {}) => {
	const objKeys = Object.keys(obj);
	return keys.some((key) => objKeys.includes(key));
};

export const renameImages = (
	productId: number,
	images: string[],
	thumbnail: string
) => {
	thumbnail = `${productId}-thumbnail.${thumbnail.split(".").pop()}`;
	images = images.map(
		(img, index) => `${productId}-${index}.${img.split(".").pop()}`
	);
	return { thumbnail, images };
};
