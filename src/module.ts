import { DynamicModule, Module } from '@nestjs/common';
import i18next, { InitOptions } from 'i18next';

import { getConfigToken, getTranslatorFunctionToken } from './helpers';
import { AsyncInitOptions } from './interfaces';
import { TranslatorService } from './service';

@Module({})
export class TranslatorModule {
    static forRootAsync(options?: AsyncInitOptions): DynamicModule {
        const configProvider = {
            provide: getConfigToken(),
            ...options
        };

        const translatorProvider = {
            provide: getTranslatorFunctionToken(),
            inject: [configProvider],
            useFactory: async (options: InitOptions) => {
                i18next.init({
                    whitelist: options.resources ? Object.keys(options.resources) : [],
                    resources: options.resources,
                    fallbackLng: 'en-US',
                    lng: 'en-US',
                    ...options
                });
                return i18next;
            }
        };

        const i18nextProvider = {
            provide: 'i18n',
            useValue: i18next
        };

        const providers: any[] = [configProvider, i18nextProvider, translatorProvider, TranslatorService];

        return {
            module: TranslatorModule,
            providers: providers,
            exports: [configProvider, i18nextProvider, TranslatorService]
        };
    }
}
