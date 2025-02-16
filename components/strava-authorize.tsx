"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "./ui/button";

export function StravaAuthorization() {
	const [url, setUrl] = useState("");

	useEffect(() => {
		getUrl();
	}, []);

	const getUrl = async () => {
		const response = await fetch("/api/strava/oauth");
		const data = await response.json();
		setUrl(data.url);
	};

	return (
		<div>
			<Card>
				<CardHeader>
					<CardTitle>Strava Authorization</CardTitle>
				</CardHeader>
				<CardContent>
					<Link href={url}>
						<Button>Authorize</Button>
					</Link>
				</CardContent>
			</Card>
		</div>
	);
}
