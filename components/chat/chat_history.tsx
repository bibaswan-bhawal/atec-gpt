/* eslint-disable @typescript-eslint/no-explicit-any */
import { MessageProps } from '@/lib/types';
import { Message } from './messages/message';

const ChatHistory = ({ messagesEndRef, messages }: any) => {
	return (
		<div className='order-3 flex grow flex-col overflow-y-auto'>
			{messages.map((message: MessageProps, index: any) => (
				<Message key={index} role={message.role} text={message.text} />
			))}
			<div ref={messagesEndRef} />
		</div>
	);
};

export { ChatHistory };
