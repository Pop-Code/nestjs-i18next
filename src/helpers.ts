import { BUNDLE_OPTIONS_TOKEN, BUNDLE_TOKEN, CONFIG_TOKEN, I18N_TOKEN } from './constants';

export const getI18nToken = (): string => I18N_TOKEN;
export const getConfigToken = (): string => CONFIG_TOKEN;
export const getBundleToken = (name: string): string => `${BUNDLE_TOKEN}:${name}`;
export const getBundleOptionsToken = (name: string): string => `${BUNDLE_OPTIONS_TOKEN}:${name}`;
