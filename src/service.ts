import { Inject, Injectable } from '@nestjs/common';
import { i18n, TFunction } from 'i18next';

import { InjectTranslatorFunction } from './decorators';

@Injectable()
export class TranslatorService {
    constructor(@Inject('i18n') protected i18next: i18n, @InjectTranslatorFunction() protected translator: TFunction) {}

    getTranslator(): TFunction {
        return this.translator;
    }
}
