import { type NextRequest, NextResponse } from "next/server";
// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
// import { cookies } from "next/headers"
// import type { Activity } from "@/lib/supabase"

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const mode = searchParams.get("hub.mode");
	const token = searchParams.get("hub.verify_token");
	const challenge = searchParams.get("hub.challenge");

	if (mode === "subscribe" && token === process.env.STRAVA_VERIFY_TOKEN) {
		console.log("Webhook verified");
		return NextResponse.json({ "hub.challenge": challenge });
	} else {
		return NextResponse.json({ error: "Invalid token" }, { status: 403 });
	}
}

export async function POST(req: NextRequest) {
	const body = await req.json();
	console.log("Received webhook:", body);

	try {
		// const supabase = createRouteHandlerClient({ cookies })
		// // Store the webhook event in Supabase
		// const activity: Omit<Activity, 'id'> = {
		//   event_id: `${body.object_id}-${body.event_time}`,
		//   athlete_id: body.owner_id,
		//   event_time: new Date(body.event_time * 1000).toISOString(),
		//   activity_type: body.object_type,
		//   event_type: body.aspect_type,
		//   object_type: body.object_type,
		//   object_id: body.object_id,
		//   updates: JSON.stringify(body.updates || {}),
		// }

		// const { error, data } = await supabase.from("activities").insert(activity)

		// if (error) {
		//   console.error("Error storing activity:", error)
		//   return NextResponse.json({ error: "Failed to store activity" }, { status: 500 })
		// }
		// console.log(data);
		return NextResponse.json({ message: "Activity stored successfully" });
	} catch (error) {
		console.error("Error processing webhook:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
