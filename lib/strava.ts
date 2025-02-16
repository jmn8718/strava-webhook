import strava from "strava-v3";

const domain =
	process.env.NODE_ENV === "production"
		? "https://strava-webhook-coral.vercel.app"
		: "http://localhost:3000";

export const updateToken = (token: string) => {
	strava.config({
		access_token: token,
		client_id: process.env.STRAVA_CLIENT_ID,
		client_secret: process.env.STRAVA_CLIENT_SECRET,
		redirect_uri: `${domain}/strava/oauth`,
	});
};

updateToken("");
export default strava;
