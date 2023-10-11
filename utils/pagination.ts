export const paginationHours = (hours: string[], itemsPerPage: number) => {
	const numPages = Math.ceil(hours.length / itemsPerPage);
	const pages = [];
	for (let i = 0; i < numPages; i++) {
		pages.push(hours.slice(i * itemsPerPage, (i + 1) * itemsPerPage));
	}
	return pages;
};
