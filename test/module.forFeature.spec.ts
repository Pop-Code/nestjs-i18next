import { Test, TestingModule } from '@nestjs/testing';

import { TranslatorModule, TranslatorService } from '../src';
import locales from './locales.json';

let app: TestingModule;

beforeEach(async () => {
    app = await Test.createTestingModule({
        imports: [
            TranslatorModule.forRootAsync({
                useFactory: () => {
                    return {};
                }
            }),
            TranslatorModule.forFeatureAsync({
                name: 'TestBundle',
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
    it('should have a bundle', async () => {
        const service = app.get(TranslatorService);
        const instance = service.getInstance();
        expect(instance.hasResourceBundle('en', 'translation')).toBe(true);
    });

    it('should translate keys', async () => {
        const service = app.get(TranslatorService);

        const translated = service.getInstance().t('foo.bar', { lng: 'en' });
        expect(translated).toBe('bar-en');

        const translatedFr = service.getInstance().t('foo.bar', { lng: 'fr' });
        expect(translatedFr).toBe('bar-fr');
    });
});
