export const convertedData = dateString => {
	const date = new Date(dateString);
	const day = date.getUTCDate();
	const month = getUkrainianMonth(date.getUTCMonth());
	const year = date.getUTCFullYear();
	const hours = date.getUTCHours();
	const minutes = date.getUTCMinutes();
	const hoursText = padZero(hours + 3); // Додати 3 години через UTC
	const minutesText = padZero(minutes);

	return `${day} ${month} ${year} ${hoursText}:${minutesText}`;
};

const getUkrainianMonth = month => {
	const ukrainianMonths = [
		'січня',
		'лютого',
		'березня',
		'квітня',
		'травня',
		'червня',
		'липня',
		'серпня',
		'вересня',
		'жовтня',
		'листопада',
		'грудня',
	];
	return ukrainianMonths[month];
};

const padZero = number => {
	return number.toString().padStart(2, '0');
};
