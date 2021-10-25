import { DynamicModule, Global, Module } from '@nestjs/common';
import i18next, { i18n, InitOptions } from 'i18next';

import { getBundleOptionsToken, getBundleToken, getConfigToken, getI18nToken } from './helpers';
import { AsyncForFeatureOptions, AsyncInitOptions, ForFeatureOptions } from './interfaces';
import { TranslatorService } from './service';

@Module({})
@Global()
export class TranslatorModule {
    static forRootAsync(options: AsyncInitOptions): DynamicModule {
        const configProvider = {
            ...options,
            provide: getConfigToken()
        };

        const i18nProvider = {
            provide: getI18nToken(),
            inject: [getConfigToken()],
            useFactory: async (opts: InitOptions) => {
                return new Promise((resolve, reject) => {
                    i18next.init(
                        {
                            resources: opts.resources,
                            fallbackLng: 'en',
                            lng: 'en',
                            ...opts
                        },
                        (error) => {
                            if (error) {
                                return reject(error);
                            }
                            return resolve(i18next);
                        }
                    );
                });
            }
        };

        const providers: any[] = [configProvider, i18nProvider, TranslatorService];

        return {
            module: TranslatorModule,
            providers: providers,
            exports: [configProvider, i18nProvider, TranslatorService]
        };
    }

    static forFeatureAsync(options: AsyncForFeatureOptions): DynamicModule {
        const bundleOptionsToken = getBundleOptionsToken(options.name);
        const bundleOptionsProvider = {
            ...options,
            provide: bundleOptionsToken
        };

        const bundleToken = getBundleToken(options.name);
        const bundleProvider = {
            provide: bundleToken,
            inject: [getI18nToken(), bundleOptionsToken],
            useFactory: async (i18n: i18n, options: ForFeatureOptions) => {
                for (const lang in options.resources) {
                    const language = options.resources[lang];
                    for (const ns in language) {
                        const resource = language[ns];
                        i18n.addResourceBundle(lang, ns, resource, true, true);
                    }
                }
            }
        };

        return {
            module: TranslatorModule,
            providers: [bundleOptionsProvider, bundleProvider]
        };
    }
}
