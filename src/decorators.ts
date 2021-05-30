import { Inject } from '@nestjs/common';

import { getI18nToken } from './helpers';

export const InjectI18n = (): ParameterDecorator => Inject(getI18nToken());
