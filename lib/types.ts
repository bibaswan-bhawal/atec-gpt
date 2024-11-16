export type MessageProps = {
	role: 'user' | 'assistant';
	text: string;
};

export type ChatHistoryProps = {
	threadId: string;
};

export type ThreadHistoryProps = {
	threadId: string;
	message: string;
};
