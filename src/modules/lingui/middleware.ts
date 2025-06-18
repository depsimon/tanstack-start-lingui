import { i18n } from "@lingui/core";
import { createMiddleware } from "@tanstack/react-start";
import { setupLocaleFromRequest } from "~/modules/lingui/i18n.server";

export const i18nMiddleware = createMiddleware({ type: "request" }).server(
	async ({ next }) => {
		await setupLocaleFromRequest(i18n);

		const result = await next({
			context: {
				i18n,
			},
		});

		return result;
	},
);
