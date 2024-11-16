const UserMessage = ({ text }: { text: string }) => {
	return (
		<div className='self-end bg-zinc-200 py-2 px-4 rounded-full my-4'>
			<p>{text}</p>
		</div>
	);
};

export { UserMessage };
