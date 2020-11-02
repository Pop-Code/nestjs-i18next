import { Injectable } from '@nestjs/common';
import { i18n } from 'i18next';

import { InjectTranslatorFunction } from './decorators';

@Injectable()
export class TranslatorService {
    constructor(@InjectTranslatorFunction() protected i18next: i18n) {}

    getInstance(): i18n {
        return this.i18next;
    }
}
