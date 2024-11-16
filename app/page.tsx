/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import ChatModule from '@/components/chat/chat';
import { ThreadHistoryProps } from '@/lib/types';

export default function Home() {
	const [threadId, setThreadId] = useState<string | undefined>(undefined);

	const [items, setItems] = useState<any>(null);

	useEffect(() => {
		const savedValue: ThreadHistoryProps[] = JSON.parse(localStorage.getItem('items') || '[]');
		setItems(savedValue);
	}, []);

	useEffect(() => {
		localStorage.setItem('items', JSON.stringify(items));

		console.log(items);
	}, [items]);

	const addThread = (threadId: string, text: string) => {
		const newItems: ThreadHistoryProps[] = [...items, { threadId: threadId, message: text }];
		setItems(newItems);
	};

	const setThread = (threadId: string) => {
		setThreadId(threadId);
		console.log(threadId);
	};

	return (
		<main className='h-screen flex justify-center bg-zinc-200'>
			<div className='w-[400px]'>
				<div className='m-4'>
					<Image className='mr-4' src='/assets/atec_logo.svg' alt='ATEC Spine Logo' width={32} height={32} />
					<h1 className='text-xl font-medium my-4'>History</h1>
					{items.map((thread: ThreadHistoryProps, index: any) => (
						<div key={index} onClick={() => setThread(thread.threadId)}>
							<p key={index}>{thread.message}</p>
						</div>
					))}
				</div>
			</div>
			<ChatModule preLoadedThreadId={threadId} addThread={addThread} />
		</main>
	);
}
