import { json } from "@tanstack/react-start";
import { createServerFileRoute } from "@tanstack/react-start/server";
import { i18nMiddleware } from "~/modules/lingui/middleware";

export const ServerRoute = createServerFileRoute("/api/content")
	.middleware([i18nMiddleware])
	.methods({
		GET: async ({ context }) => {
			return json({
				content: context.i18n._("API Content"),
			});
		},
	});
