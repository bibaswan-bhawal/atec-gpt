import { MessageProps } from '@/lib/types';
import { UserMessage } from './user_message';
import { AssistantMessage } from './assistantMessage';

const Message = ({ role, text }: MessageProps) => {
	switch (role) {
		case 'user':
			return <UserMessage text={text} />;
		case 'assistant':
			return <AssistantMessage text={text} />;
		default:
			return null;
	}
};

export { Message };
