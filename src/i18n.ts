import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;
    if (!locale || !['tr', 'en'].includes(locale)) locale = 'tr';

    return {
        locale,
        messages: (await import(`./i18n/messages/${locale}.json`)).default
    };
});
