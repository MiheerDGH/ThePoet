import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

/**
 * Angular 19+ correct SSR entry point.
 * Uses bootstrapApplication() with BootstrapContext to create ApplicationRef.
 */
export default function bootstrap(context: BootstrapContext) {
  return bootstrapApplication(AppComponent, appConfig, context);
}
