/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef, useState } from 'react';
import { AssistantStream } from 'openai/lib/AssistantStream';

import { ChatInput } from './chat_input';
import { ChatHistory } from './chat_history';
import { MessageProps } from '@/lib/types';
import { ChatIntro } from './chat_intro';

export default function ChatModule({ preLoadedThreadId, addThread }: any) {
	const [threadId, setThreadId] = useState('');
	const [messages, setMessages] = useState<MessageProps[]>([]);
	const [inputDisabled, setInputDisabled] = useState(false);

	const messagesEndRef = useRef<HTMLDivElement | null>(null);

	// create a new threadID when chat component created
	useEffect(() => {
		const createThread = async () => {
			if (preLoadedThreadId) return;
			const res = await fetch(`/api/assistants/threads`, {
				method: 'POST',
			});

			const data = await res.json();

			setThreadId(data.threadId);
		};

		createThread();
	}, [preLoadedThreadId]);

	useEffect(() => {
		const createThread = async () => {
			console.log('preLoadedThreadId', preLoadedThreadId);

			if (preLoadedThreadId) {
				setThreadId(preLoadedThreadId);
				setInputDisabled(true);
				setMessages([]);

				const res = await fetch(`/api/assistants/threads/${preLoadedThreadId}/messages`);

				const data = (await res.json()).data;

				for (let i = 0; i < data.length; i++) {
					console.log('data[i].role', data[i].role);

					if (data[i].role === 'user') {
						setMessages((prevMessages: MessageProps[]) => [{ role: 'user', text: data[i].content[0].text.value }, ...prevMessages]);
					} else {
						setMessages((prevMessages: MessageProps[]) => [{ role: 'assistant', text: data[i].content[0].text.value }, ...prevMessages]);
					}
				}

				console.log('data', data);

				setInputDisabled(false);
				return;
			}
		};

		createThread();
	}, [preLoadedThreadId]);

	// Auto-scroll to the bottom of the chat history
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	const sendMessage = async (text: string) => {
		const response: any = await fetch(`/api/assistants/threads/${threadId}/messages`, {
			method: 'POST',
			body: JSON.stringify({
				content: text,
			}),
		});

		const stream = AssistantStream.fromReadableStream(response.body);

		handleReadableStream(stream);
	};

	const handleSubmit = (text: string) => {
		if (!text.trim()) return;

		if (messages.length === 0) {
			addThread(threadId, text);
		}

		sendMessage(text);
		setMessages((prevMessages: MessageProps[]) => [...prevMessages, { role: 'user', text: text }]);

		setInputDisabled(true);
	};

	const appendMessage = (role: any, text: string) => {
		setMessages((prevMessages) => [...prevMessages, { role, text }]);
	};

	const appendToLastMessage = (text: string) => {
		setMessages((prevMessages) => {
			const lastMessage = prevMessages[prevMessages.length - 1];
			const updatedLastMessage = {
				...lastMessage,
				text: lastMessage.text + text,
			};
			return [...prevMessages.slice(0, -1), updatedLastMessage];
		});
	};

	const annotateLastMessage = (annotations: any) => {
		setMessages((prevMessages) => {
			const lastMessage = prevMessages[prevMessages.length - 1];
			const updatedLastMessage = {
				...lastMessage,
			};
			annotations.forEach((annotation: any) => {
				if (annotation.type === 'file_path') {
					updatedLastMessage.text = updatedLastMessage.text.replaceAll(annotation.text, `/api/files/${annotation.file_path.file_id}`);
				}
			});
			return [...prevMessages.slice(0, -1), updatedLastMessage];
		});
	};

	// textCreated - create new assistant message
	const handleTextCreated = () => {
		appendMessage('assistant', '');
	};

	// textDelta - append text to last assistant message
	const handleTextDelta = (delta: any) => {
		if (delta.value != null) {
			appendToLastMessage(delta.value);
		}
		if (delta.annotations != null) {
			annotateLastMessage(delta.annotations);
		}
	};

	// handleRunCompleted - re-enable the input form
	const handleRunCompleted = () => {
		setInputDisabled(false);
	};

	const handleReadableStream = (stream: AssistantStream) => {
		// messages
		stream.on('textCreated', handleTextCreated);
		stream.on('textDelta', handleTextDelta);

		// events without helpers yet (e.g. requires_action and run.done)
		stream.on('event', (event) => {
			if (event.event === 'thread.run.completed') handleRunCompleted();
		});
	};

	const showHistory = () => {
		if (preLoadedThreadId && messages.length === 0) {
			return <div className='order-3'>Loading...</div>;
		}

		if (messages.length === 0) {
			return <ChatIntro askQuestion={handleSubmit} />;
		}

		return <ChatHistory messagesEndRef={messagesEndRef} messages={messages} />;
	};

	return (
		<div className='w-full flex justify-center bg-zinc-50 m-4 rounded-xl shadow'>
			<div className='max-w-[800px] w-full flex flex-col-reverse m-8'>
				{showHistory()}
				<ChatInput sendMessage={handleSubmit} disabled={inputDisabled} />
				<div className='order-1 mt-2 justify-center self-center text-zinc-600/80 text-sm'>ATEC GPT can make mistakes. Check important info.</div>
			</div>
		</div>
	);
}
