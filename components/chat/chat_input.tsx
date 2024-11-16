/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const ChatInput = ({ sendMessage, disabled }: any) => {
	const [query, setQuery] = useState('');
	const [isFocused, setIsFocused] = useState(false);
	const [isMetaKeyPressed, setIsMetaKeyPressed] = useState(false);

	const handleSubmit = useCallback(() => {
		if (disabled) return;

		if (!query || query.length == 0) return;

		if (!query.trim()) return;

		sendMessage(query);
		setQuery('');
	}, [disabled, query, sendMessage]);

	const handleEnterKeyPress = useCallback(
		(event: any) => {
			if (isFocused && event.key === 'Enter' && isMetaKeyPressed) {
				event.preventDefault();
				handleSubmit();
			}
		},
		[handleSubmit, isFocused, isMetaKeyPressed]
	);

	const handleKeyDown = useCallback((event: any) => {
		if (event.key === 'Meta') {
			setIsMetaKeyPressed(true);
		}
	}, []);

	const handleKeyUp = useCallback((event: any) => {
		if (event.key === 'Meta') {
			setIsMetaKeyPressed(false);
		}
	}, []);

	useEffect(() => {
		// attach the event listener
		document.addEventListener('keydown', handleEnterKeyPress);

		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('keyup', handleKeyUp);

		// remove the event listener
		return () => {
			document.removeEventListener('keydown', handleEnterKeyPress);
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('keyup', handleKeyUp);
		};
	}, [handleEnterKeyPress, handleKeyDown, handleKeyUp]);

	return (
		<div className={`order-2 p-2 rounded-xl transition-all ${isFocused ? 'outline outline-2 outline-zinc-950' : 'outline outline-zinc-600/10'}`}>
			<textarea
				rows={1}
				value={query}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				onChange={(e) => setQuery(e.target.value)}
				placeholder='Type your message here.'
				className='w-full resize-none flex min-h-[60px] bg-transparent px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
			/>
			<div className='flex flex-row-reverse'>
				<Button onClick={handleSubmit} disabled={disabled}>
					<span className='flex items-center content-center'>
						Ask
						<span className='inline-flex items-center ml-1 bg-white/10 border-zinc-600 border rounded'>
							<div className='text-xs pt-0.5 px-0.5'>⌘</div>
							<div className='text-xs pt-0.5 px-0.5'>↵</div>
						</span>
					</span>
				</Button>
			</div>
		</div>
	);
};

export { ChatInput };
