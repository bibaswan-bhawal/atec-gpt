'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

const ChatInput = () => {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<div className={`order-first p-2 rounded-xl transition-all ${isFocused ? 'outline outline-2 outline-zinc-950' : 'outline outline-zinc-600/10'}`}>
			<textarea
				rows={1}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				placeholder='Type your message here.'
				className='w-full resize-none flex min-h-[60px] bg-transparent px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
			/>
			<div className='flex flex-row-reverse'>
				<Button>
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
