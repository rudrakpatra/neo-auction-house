export function formatTimeDifference(ms: number) {
	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;

	const days = Math.floor(ms / day);
	ms -= days * day;
	const hours = Math.floor(ms / hour);
	ms -= hours * hour;
	const minutes = Math.floor(ms / minute);
	ms -= minutes * minute;
	const seconds = Math.floor(ms / second);

	const dayString = days ? `${days}d ` : '';
	const hourString = hours ? `${hours}h ` : '';
	const minuteString = minutes ? `${minutes}m ` : '';
	const secondString = seconds ? `${seconds}s ` : '';
	return dayString + hourString + minuteString + secondString;
}
export function formatTime(time: number) {
	return new Date(time).toLocaleString();
}
export function formatEllipsis(
	value: string | number,
	length: number,
	position: 'start' | 'middle' | 'end' = 'middle'
) {
	const str = value.toString();
	if (str.length <= length) return str;
	if (position === 'start') return '...' + str.substring(str.length - length);
	if (position === 'end') return str.substring(0, length) + '...';
	const half = Math.floor(length / 2);
	return str.substring(0, half) + '...' + str.substring(str.length - half);
}
