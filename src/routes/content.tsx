import { createFileRoute } from "@tanstack/react-router";

export const DEPLOY_URL =
	typeof window !== "undefined"
		? window.location.origin
		: "http://localhost:3000";

export const Route = createFileRoute("/content")({
	component: Page,
	async loader({ context }) {
		return (await fetch(`${DEPLOY_URL}/api/content`, {
			headers: {
				"Accept-Language": context.i18n.locale, // When calling your API route, you need to pass a header, a cookie or a query string
			},
		}).then((r) => r.json())) as { content: string };
	},
});

function Page() {
	const content = Route.useLoaderData();

	return (
		<div>
			<div>{content.content}</div>
		</div>
	);
}
