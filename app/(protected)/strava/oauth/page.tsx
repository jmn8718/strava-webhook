"use client";

import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function StravaCallback() {
	const searchParams = useSearchParams();
	const [error, setError] = useState("");
	const [redirectToDashboard, setRedirectToDashboard] = useState(false);
	useEffect(() => {
		const code = searchParams.get("code");
		if (code) {
			fetch("/api/strava/oauth", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ code }),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log("token exchanged:", data);
					setRedirectToDashboard(true);
				})
				.catch((err) => {
					setError((err as Error).message);
				});
		} else {
			setError("Missing code parameter");
		}
	}, []);

	if (redirectToDashboard) {
		return redirect("/dashboard");
	}
	return <div>{error || "processing..."}</div>;
}
