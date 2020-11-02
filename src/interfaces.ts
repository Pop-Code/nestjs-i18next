import { ModuleMetadata } from '@nestjs/common';
import { i18n, InitOptions } from 'i18next';

export interface AsyncInitOptions extends Pick<ModuleMetadata, 'imports'> {
    init?: (i18n: i18n) => i18n;
    useFactory: (...args: any[]) => Promise<InitOptions> | InitOptions;
    inject?: any[];
}
