import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { MatExpansionModule } from '@angular/material/expansion';
export const appConfig: ApplicationConfig = {
  providers: [
      provideRouter(routes),
    provideClientHydration(),
    provideAnimations(), // Agregar esto
    importProvidersFrom(MatExpansionModule) // Agregar esto para el acordeón
    ]
};
