import { i18n } from "@lingui/core";
import { Trans } from "@lingui/react/macro";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

const getContent = createServerFn({ method: "GET" }).handler(() => {
	return i18n._("Translated content.");
});

export const Route = createFileRoute("/")({
	component: Home,
	loader: async () => await getContent(),
});

function Home() {
	const content = Route.useLoaderData();

	return (
		<div className="container mx-auto divide-y">
			<h1>
				<Trans>Home</Trans>
			</h1>
			<div className="py-12">{content}</div>
		</div>
	);
}
