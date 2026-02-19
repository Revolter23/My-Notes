import { getNotebyId } from "@/app/_lib/getData";

export default async function Page(props: { params: Promise<{ id: string }> }) {
	const { id } = await props.params;
	const note = await getNotebyId(id);
	return (
		<>
			<h1 className="text-4xl">{note.title}</h1>
			<p className="text-lg text-gray-400">{note.content}</p>
		</>
	);
}
