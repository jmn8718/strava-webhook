import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

export const revalidate = 0;

async function getActivities() {
	const supabase = createServerComponentClient({ cookies });
	const { data, error } = await supabase
		.from("activities")
		.select("*")
		.order("event_time", { ascending: false })
		.limit(10);

	if (error) throw error;
	return data;
}

export async function RecentActivities() {
	const activities = await getActivities();

	return (
		<div className="space-y-4">
			{activities.map((activity) => (
				<Card key={activity.id}>
					<CardHeader>
						<CardTitle className="text-lg">
							{activity.activity_type} - {activity.event_type}
						</CardTitle>
						<p className="text-sm text-muted-foreground">
							{formatDistanceToNow(new Date(activity.event_time), {
								addSuffix: true,
							})}
						</p>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							<p>Athlete ID: {activity.athlete_id}</p>
							<p>Object ID: {activity.object_id}</p>
							{Object.keys(activity.updates).length > 0 && (
								<div>
									<p className="font-semibold">Updates:</p>
									<pre className="text-sm bg-muted p-2 rounded-md overflow-auto">
										{JSON.stringify(activity.updates, null, 2)}
									</pre>
								</div>
							)}
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
