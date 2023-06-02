export const formatedTags = value => {
	const tags = value
		.split(',')
		.map(tag => tag.trim())
		.filter(tag => tag !== '');
	return tags;
};
