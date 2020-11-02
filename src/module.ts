import { DynamicModule, Module } from '@nestjs/common';
import { FactoryProvider } from '@nestjs/common/interfaces';
import i18next, { InitOptions } from 'i18next';

import { getTranslatorFunctionToken } from './helpers';
import { TranslatorService } from './service';

@Module({})
export class TranslatorModule {
    static forRootAsync(optionsFactory?: FactoryProvider<InitOptions>): DynamicModule {
        const translatorProvider = {
            provide: getTranslatorFunctionToken(),
            inject: optionsFactory ? [optionsFactory.provide] : [],
            useFactory: async (options: InitOptions) => {
                i18next.init({
                    whitelist: options.resources ? Object.keys(options.resources) : [],
                    resources: options.resources,
                    fallbackLng: 'en-US',
                    lng: 'en-US',
                    ...options
                });
            }
        };

        const i18nextProvider = {
            provide: 'i18n',
            useValue: i18next
        };

        const providers: any[] = [i18nextProvider, translatorProvider, TranslatorService];

        if (optionsFactory) providers.push(optionsFactory);

        return {
            module: TranslatorModule,
            providers: providers,
            exports: [i18nextProvider, translatorProvider, TranslatorService]
        };
    }
}
