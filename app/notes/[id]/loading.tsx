export default function Loading() {
	return (
		<div className="p-6 h-full flex flex-col">
			<div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm flex flex-col flex-1 max-w-4xl w-full mx-auto animate-pulse">
				{/* Title skeleton */}
				<div className="h-8 bg-slate-200 rounded-lg w-1/3 mb-2"></div>
				{/* Date skeleton */}
				<div className="h-4 bg-slate-100 rounded-lg w-1/4 mb-6"></div>
				<hr className="border-slate-100 mb-6" />
				{/* Body text skeleton */}
				<div className="space-y-3 flex-1">
					<div className="h-4 bg-slate-100 rounded-lg w-full"></div>
					<div className="h-4 bg-slate-100 rounded-lg w-5/6"></div>
					<div className="h-4 bg-slate-100 rounded-lg w-2/3"></div>
				</div>
			</div>
		</div>
	);
}
