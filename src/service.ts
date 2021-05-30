import { Injectable } from '@nestjs/common';
import { i18n } from 'i18next';

import { InjectI18n } from './decorators';

@Injectable()
export class TranslatorService {
    constructor(@InjectI18n() protected i18next: i18n) {}

    getInstance(): i18n {
        return this.i18next;
    }
}
