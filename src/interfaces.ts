import { FactoryProvider } from '@nestjs/common';
import { i18n, InitOptions, Resource } from 'i18next';

export type AsyncInitOptions = Omit<
    FactoryProvider<Partial<InitOptions> | i18n | Promise<Partial<InitOptions> | i18n>>,
    'provide'
>;

export interface ForFeatureOptions {
    resources: Resource;
}

export interface AsyncForFeatureOptions
    extends Omit<FactoryProvider<ForFeatureOptions | Promise<ForFeatureOptions>>, 'provide'> {
    name: string;
}
