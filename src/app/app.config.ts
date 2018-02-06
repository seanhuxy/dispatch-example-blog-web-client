import { AppConfig } from './app-config';
export { AppConfig } from './app-config';

import { InjectionToken } from '@angular/core';

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export function configFactory(): AppConfig {
    // hack: https://github.com/angular/angular-cli/issues/2508
    // inject app configurations from index.html
    return <AppConfig>window['APP_CONFIG'];
}