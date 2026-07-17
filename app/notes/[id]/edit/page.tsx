import { getNotebyId } from "@/app/_lib/getData";
import EditForm from "@/app/notes/[id]/_components/edit-form";

export default async function Page(props: { params: Promise<{ id: string }> }) {
	const { id } = await props.params;
	const note = await getNotebyId(id);
	
	if (!note) {
		return (
			<div className="flex flex-col items-center justify-center h-full p-8 text-center text-slate-400">
				<p className="text-sm">Note not found.</p>
			</div>
		);
	}

	return <EditForm note={note} />;
}
