import { Test, TestingModule } from '@nestjs/testing';
import i18next from 'i18next';

import { TranslatorModule } from '../module';
import { TranslatorService } from '../service';

let app: TestingModule;

beforeEach(async () => {
    app = await Test.createTestingModule({
        imports: [
            TranslatorModule.forRootAsync({
                useFactory: () => {
                    return {
                        resources: {
                            'en-US': {
                                translation: {
                                    foo: {
                                        bar: 'foobar'
                                    }
                                }
                            }
                        }
                    };
                }
            })
        ]
    }).compile();
});

describe('TranslatorModule', () => {
    it('should init the module', async () => {
        const service = app.get(TranslatorService);
        expect(service).toBeDefined();

        const instance = service.getInstance();
        expect(instance).toBeDefined();
        expect(instance).toBe(i18next);
    });

    it('should translate a key', async () => {
        const service = app.get(TranslatorService);
        const translated = service.getInstance().t('foo.bar');
        expect(translated).toBe('foobar');
    });
});
