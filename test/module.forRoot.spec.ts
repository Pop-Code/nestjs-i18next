import { Test, TestingModule } from '@nestjs/testing';
import i18next from 'i18next';

import { getI18nToken, TranslatorModule, TranslatorService } from '../src';
import locales from './locales.json';

let app: TestingModule;

beforeEach(async () => {
    app = await Test.createTestingModule({
        imports: [
            TranslatorModule.forRootAsync({
                useFactory: () => {
                    return {
                        resources: locales
                    };
                }
            })
        ]
    }).compile();
});

describe('TranslatorModule', () => {
    it('should have the i18n instance defined ', async () => {
        const i18n = app.get(getI18nToken());
        expect(i18n).toBeDefined();
        expect(i18n).toBe(i18next);
    });

    it('should have the TranslatorService defined ', async () => {
        const service = app.get(TranslatorService);
        expect(service).toBeDefined();

        const instance = service.getInstance();
        expect(instance).toBeDefined();
        expect(instance).toBe(i18next);
    });

    it('should init the module', async () => {
        const service = app.get(TranslatorService);
        expect(service).toBeDefined();

        const instance = service.getInstance();
        expect(instance).toBeDefined();
        expect(instance).toBe(i18next);
    });

    it('should translate keys', async () => {
        const service = app.get(TranslatorService);
        const translated = service.getInstance().t('foo.bar');
        expect(translated).toBe('bar-en');

        const translatedFr = service.getInstance().t('foo.bar', { lng: 'fr' });
        expect(translatedFr).toBe('bar-fr');
    });
});
