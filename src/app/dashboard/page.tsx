import { auth } from "@/auth";
import { WidgetItem } from "@/components/WidgetItem";
import { redirect } from "next/navigation";

export default async function DashboardPage() {

	const session = await auth();

	if (!session) {
		redirect('/api/auth/signin');
	}

	return (
		<div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
			<WidgetItem title="Usuario conectado server side">
				<div className="flex flex-col">
					<span>{session.user?.name}</span>
					<span>{session.user?.image}</span>
					<span>{session.user?.email}</span>
				</div>
				{JSON.stringify(session)}
			</WidgetItem>
		</div>
	);
}