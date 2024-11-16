import { ChatInput } from './chat_input';
import { ChatHistory } from './chat_history';

export default function ChatModule() {
	return (
		<div className='w-full flex justify-center bg-zinc-50 m-4 rounded-xl shadow'>
			<div className='max-w-[800px] w-full flex flex-col-reverse m-8'>
				<ChatHistory />
				<ChatInput />
			</div>
		</div>
	);
}
