export const dynamic = 'force-dynamic';
export const revalidate = false;

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";

export default async function RestTodosPage() {

	const session = await auth();

	const todos = await prisma.todo.findMany({
		where: { userId: session?.user?.id },
		orderBy: { description: 'asc' }
	})

	return (
		<div>
			<div className="w-full px-3 mx-5 mb-5">
				<NewTodo />
			</div>
			<TodosGrid todos={todos} />
		</div>
	);
}