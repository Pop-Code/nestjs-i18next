import { ModuleMetadata } from '@nestjs/common';
import { i18n, InitOptions, Resource } from 'i18next';

export interface AsyncInitOptions extends Pick<ModuleMetadata, 'imports'> {
    init?: (i18n: i18n) => i18n;
    useFactory: (...args: any[]) => Promise<InitOptions> | InitOptions;
    inject?: any[];
}

export interface ForFeatureOptions {
    resources: Resource;
}

export interface AsyncForFeatureOptions extends Pick<ModuleMetadata, 'imports'> {
    name: string;
    useFactory: (...args: any[]) => Promise<ForFeatureOptions> | ForFeatureOptions;
    inject?: any[];
}
