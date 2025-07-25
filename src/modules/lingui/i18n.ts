import type { I18n } from "@lingui/core";

export const locales = {
	en: "English",
	fr: "French",
};

export const isLocaleValid = (locale: string) =>
	Object.keys(locales).includes(locale);

export const defaultLocale = "en";

/**
 * We do a dynamic import of just the catalog that we need
 * @param i18n an I18n instance
 * @param locale any locale string
 */
export async function dynamicActivate(i18n: I18n, locale: string) {
	if (i18n.locale === locale) return;

	const { messages } = await import(`../../locales/${locale}/messages.po`);

	i18n.load(locale, messages);
	i18n.activate(locale);
}
