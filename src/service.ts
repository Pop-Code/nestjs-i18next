import { Injectable, Inject } from '@nestjs/common';
import i18next from 'i18next';
import { InjectTranslatorFunction } from './decorators';
import countries from 'i18n-iso-countries';
import c_fr from 'i18n-iso-countries/langs/fr.json';
import c_en from 'i18n-iso-countries/langs/en.json';

countries.registerLocale(c_fr);
countries.registerLocale(c_en);

export { countries };

@Injectable()
export class TranslatorService {
    constructor(
        @Inject('i18n')
        protected i18next: i18next.i18n,
        @InjectTranslatorFunction()
        protected translator: i18next.TFunction
    ) {}

    t(value: string, options?: i18next.TFunction) {
        return this.translator(value, options);
    }

    static getCountries(language: string = 'en') {
        const allCoutries = countries.getNames(language.slice(0, 2));
        return Object.keys(allCoutries).map(key => ({
            value: key,
            label: allCoutries[key]
        }));
    }

    static getCountryCodes() {
        return Object.keys(countries.getAlpha2Codes());
    }
}
