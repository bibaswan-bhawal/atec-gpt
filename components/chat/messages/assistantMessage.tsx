import Image from 'next/image';
import Markdown from 'react-markdown';

const AssistantMessage = ({ text }: { text: string }) => {
	return (
		<div className='flex self-start items-start my-4 max-w-[100%] text-pretty break-words'>
			<Image className='mr-4' src='/assets/atec_logo.svg' alt='ATEC Spine Logo' width={32} height={32} />
			<div>
				<Markdown>{text}</Markdown>
			</div>
		</div>
	);
};

export { AssistantMessage };
