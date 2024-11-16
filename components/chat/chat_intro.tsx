/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';

const products = [
	'What are the benefits of the ATEC Spine products?',
	'How do ATEC Spine products compare to other spinal products?',
	'What is the success rate of ATEC Spine products?',
	'What are the key features of ATEC Spine products?',
	'What are the different types of ATEC Spine products?',
];

const procedure = [
	'What are the benefits of the PTP?',
	'Why do LTP instead of a PLIF?',
	'What is the success rate of ATEC Spine procedures?',
	'What are the key features of ATEC Spine procedures?',
	'What are the different types of ATEC Spine procedures?',
];

const history = [
	'Who is the CEO?',
	'When was ATEC Spine founded?',
	'When did Atec officially launch its IPO?',
	'What is the mission of ATEC Spine?',
	'What are the core values of ATEC Spine?',
];

const ChatIntro = ({ askQuestion }: any) => {
	const handleProductQuestion = () => {
		const randomIndex = Math.floor(Math.random() * 5);

		const product = products[randomIndex];

		askQuestion(product);
	};

	const handleProcedureQuestion = () => {
		const randomIndex = Math.floor(Math.random() * 5);

		const product = procedure[randomIndex];

		askQuestion(product);
	};

	const handleHistoryQuestion = () => {
		const randomIndex = Math.floor(Math.random() * 5);

		const product = history[randomIndex];

		askQuestion(product);
	};

	return (
		<div className='order-3 h-full flex flex-col-reverse'>
			<div className='flex h-full flex-col justify-center items-center mb-8'>
				<Image className='mb-4' src='/assets/atec_logo.svg' alt='ATEC Spine Logo' width={80} height={80} />
				<h1 className='text-2xl font-medium mb-4'>Welcome to ATEC GPT</h1>
				<p className='text-center text-zinc-900/90'>
					ATEC GPT is your personal AI-powered assistant, ready to help you get the info you need about ATEC products, procedures, and all things spine. Whether you have
					questions about our offerings, need a refresher on Spine-Ace, or want to review company history, we’ve got you covered!
				</p>
				<div className='flex mt-4 space-x-4'>
					<Card className='w-[328px]'>
						<CardHeader>
							<CardTitle>Products</CardTitle>
						</CardHeader>
						<CardContent>At the forefront of spinal care, here at ATEC we offer innovative products that improve patient outcomes. From advanced fusion</CardContent>
						<CardFooter className='flex justify-between'>
							<Button onClick={handleProductQuestion}>Explore Products</Button>
						</CardFooter>
					</Card>
					<Card className='w-[328px]'>
						<CardHeader>
							<CardTitle>Procedures</CardTitle>
						</CardHeader>
						<CardContent>At the forefront of spinal care, here at ATEC we offer innovative products that improve patient outcomes. From advanced fusion</CardContent>
						<CardFooter className='flex justify-between'>
							<Button onClick={handleProcedureQuestion}>Explore Procedures</Button>
						</CardFooter>
					</Card>
					<Card className='w-[328px]'>
						<CardHeader>
							<CardTitle>Company History</CardTitle>
						</CardHeader>
						<CardContent>At the forefront of spinal care, here at ATEC we offer innovative products that improve patient outcomes. From advanced fusion</CardContent>
						<CardFooter className='flex justify-between'>
							<Button onClick={handleHistoryQuestion}>Explore ATEC History</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	);
};

export { ChatIntro };
