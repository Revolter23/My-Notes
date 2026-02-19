import { getNotebyId } from "@/app/_lib/getData";
import EditForm from "@/app/notes/[id]/_components/edit-form";

export default async function Page(props: { params: Promise<{ id: string }> }) {
	const { id } = await props.params;
	const note = await getNotebyId(id);
	console.log(note);
	return <EditForm note={note} />;
}
