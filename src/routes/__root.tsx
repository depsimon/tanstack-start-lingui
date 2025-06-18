/// <reference types="vite/client" />
import { useLingui } from "@lingui/react";
import { Trans } from "@lingui/react/macro";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	createRootRouteWithContext,
	HeadContent,
	Link,
	Outlet,
	Scripts,
	useRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { createServerFn } from "@tanstack/react-start";
import { setHeader } from "@tanstack/react-start/server";
import { serialize } from "cookie-es";
import type * as React from "react";
import { toast } from "sonner";
import { Toaster } from "~/components/ui/sonner";
import { dynamicActivate, locales } from "~/modules/lingui/i18n";
import type { AppContext } from "~/router";
import stylesheetUrl from "~/styles/app.css?url";

const updateLanguage = createServerFn({ method: "POST" })
	.validator((locale: string) => locale)
	.handler(async ({ data }) => {
		setHeader(
			"Set-Cookie",
			serialize("locale", data, {
				maxAge: 30 * 24 * 60 * 60,
				path: "/",
			}),
		);
	});

export const Route = createRootRouteWithContext<AppContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
		links: [
			{ rel: "stylesheet", href: stylesheetUrl },
			{ rel: "preconnect", href: "https://rsms.me/" },
			{ rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
		],
	}),
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
			<TanStackRouterDevtools position="bottom-right" />
			<ReactQueryDevtools buttonPosition="bottom-left" />
			<Toaster />
		</RootDocument>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	const { i18n } = useLingui();
	const router = useRouter();

	return (
		<html lang={i18n.locale}>
			<head>
				<HeadContent />
			</head>
			<body>
				<div className="container mx-auto divide-y">
					<nav className="flex items-center gap-2">
						<Link
							to="/"
							activeOptions={{ exact: true }}
							activeProps={{ className: "font-bold" }}
						>
							<Trans>Home</Trans>
						</Link>
						<Link to="/content" activeProps={{ className: "font-bold" }}>
							<Trans>Content</Trans>
						</Link>
						{Object.entries(locales).map(([locale, label]) => (
							<button
								key={locale}
								className={locale === i18n.locale ? "font-bold" : ""}
								type="button"
								onClick={() => {
									updateLanguage({ data: locale }).then(async () => {
										await dynamicActivate(i18n, locale);

										toast.success(i18n._("Language updated with success!"));
										router.invalidate();
									});
								}}
							>
								{label}
							</button>
						))}
					</nav>

					<div className="py-12">{children}</div>
				</div>
				<Scripts />
			</body>
		</html>
	);
}
