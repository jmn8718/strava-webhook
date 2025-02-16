import { StravaAuthorization } from "@/components/strava-authorize";

export default async function AccountPage() {
	return (
		<div className="container mx-auto p-4">
			<StravaAuthorization />
		</div>
	);
}
