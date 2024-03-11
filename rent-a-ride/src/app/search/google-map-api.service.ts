import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GoogleMapApiService {
  constructor() {}

  loadScript(src: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (typeof document !== 'undefined') {
        const script = document.createElement('script');
        script.src = src;

        // Wrap resolve and reject in functions with Event parameter
        script.onload = () => resolve();
        script.onerror = (event: Event | string) => {
          const errorMessage =
            typeof event === 'string' ? event : 'Failed to load script.';
          reject(new Error(errorMessage));
        };

        document.body.appendChild(script);
      } else {
        reject(new Error('Document is not defined.'));
      }
    });
  }
}
