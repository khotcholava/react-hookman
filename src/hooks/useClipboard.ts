import { useState } from 'react';

export function useClipboard() {
	const [copied, setCopied] = useState(false);

	const copyToClipboard = async (text: string): Promise<void> => {
		if (navigator?.clipboard && typeof navigator.clipboard.writeText === 'function') {
			try {
				await navigator.clipboard.writeText(text);
				setCopied(true);

				setTimeout(() => setCopied(false), 2000);

				return;
			} catch (error) {
				console.error('Failed to copy to clipboard using Clipboard API:', error);
			}
		}

		try {
			const textArea = document.createElement('textarea');

			textArea.value = text;

			textArea.style.position = 'absolute';
			textArea.style.left = '-9999px';

			document.body.appendChild(textArea);
			textArea.select();

			const successful = document.execCommand('copy');

			if (successful) {
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			} else {
				throw new Error('Fallback copy failed');
			}

			document.body.removeChild(textArea);
		} catch (error) {
			console.error('Failed to copy to clipboard using fallback:', error);
			setCopied(false);
		}
	};

	return { copied, copyToClipboard };
}

