export default function CardSkeleton() {
	return (
		<article className="flex flex-col gap-3 border border-gray-400 rounded-lg p-4 animate-pulse h-32 w-full hover:shadow-lg transition-shadow duration-200">
			<div className="bg-gray-300 rounded-md h-5 w-[50%]"></div>
			<div className="bg-gray-300 rounded-md h-5 w-full"></div>
			<div className="bg-gray-300 rounded-md h-5 w-full"></div>
		</article>
	);
}
