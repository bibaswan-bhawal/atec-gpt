import { type NextRequest } from 'next/server';

import { openai } from '@/app/openai';
import { assistantId } from '@/app/assistant-config';

// Send a new message to a thread
export async function POST(request: NextRequest, { params }: { params: Promise<{ threadId: string }> }) {
	const { content } = await request.json();

	const threadId = (await params).threadId;

	await openai.beta.threads.messages.create(threadId, {
		role: 'user',
		content: content,
	});

	const stream = openai.beta.threads.runs.stream(threadId, {
		assistant_id: assistantId,
	});

	return new Response(stream.toReadableStream());
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(request: NextRequest, { params }: { params: Promise<{ threadId: string }> }) {
	const threadId = (await params).threadId;

	const messages = await openai.beta.threads.messages.list(threadId);

	return Response.json(messages);
}
