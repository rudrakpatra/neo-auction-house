export default function humanReadableTimeDifference(ms: number) {
	const seconds = Math.floor(ms / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const weeks = Math.floor(days / 7);
	const weekString = weeks > 0 ? `${weeks}w ` : '';
	const dayString = days > 0 ? `${days % 7}d ` : '';
	const hourString = hours > 0 ? `${hours % 24}h ` : '';
	const minuteString = minutes > 0 ? `${minutes % 60}m ` : '';
	const secondString = seconds > 0 ? `${seconds % 60}s ` : '';
	const time = weekString + dayString + hourString + minuteString + secondString;
	return time;
}
