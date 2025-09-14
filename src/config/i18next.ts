import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import { LanguageDetector } from 'i18next-http-middleware';

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filepath = fileURLToPath(import.meta.url);
const __dirname = dirname(__filepath);

i18next
    .use(Backend)
    .use(LanguageDetector)
    .init({
        fallbackLng: 'en',
        backend: { loadPath: path.join(__dirname, '../locales/{{lng}}.json') },
    });

export default i18next;
