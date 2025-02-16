import { StravaSubscriptions } from "@/components/strava-subscriptions";

export default async function SubscriptionsPage() {
	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Strava Subscriptions</h1>
			<StravaSubscriptions />
		</div>
	);
}
