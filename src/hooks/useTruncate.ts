export function useTruncate() {
	const truncate = (text = '', length = 0): string => {
		if (!text || length <= 0) return text;

		return text.length > length ? `${text.slice(0, length)}...` : text;
	};

	return { truncate };
}
