import { Inject } from '@nestjs/common';
import { getTranslatorFunctionToken } from './helpers';

export const InjectTranslatorFunction = () =>
    Inject(getTranslatorFunctionToken());
