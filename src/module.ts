import { Module, DynamicModule } from '@nestjs/common';
import { TranslatorService } from './service';
import i18next from 'i18next';
import { FactoryProvider } from '@nestjs/common/interfaces';
import { getTranslatorFunctionToken } from './helpers';

@Module({})
export class TranslatorModule {
    static forRootAsync(
        optionsFactory?: FactoryProvider<i18next.InitOptions>
    ): DynamicModule {
        const translatorProvider = {
            provide: getTranslatorFunctionToken(),
            inject: optionsFactory ? [optionsFactory.provide] : [],
            useFactory: async (options: i18next.InitOptions) => {
                i18next.init({
                    whitelist: options.resources
                        ? Object.keys(options.resources)
                        : [],
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

        const providers: any[] = [
            i18nextProvider,
            translatorProvider,
            TranslatorService
        ];

        if (optionsFactory) providers.push(optionsFactory);

        return {
            module: TranslatorModule,
            providers: providers,
            exports: [i18nextProvider, translatorProvider, TranslatorService]
        };
    }
}
