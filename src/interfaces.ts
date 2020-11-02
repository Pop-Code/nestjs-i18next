import { ModuleMetadata } from '@nestjs/common';
import { InitOptions } from 'i18next';

export interface AsyncInitOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory: (...args: any[]) => Promise<InitOptions> | InitOptions;
    inject?: any[];
}
