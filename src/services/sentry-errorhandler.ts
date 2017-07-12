import { IonicErrorHandler } from 'ionic-angular';  
import Raven from 'raven-js';

Raven  
    .config('https://9500eedd0c51488ab9b3902bf8393c2b@sentry.io/189448')
    .install();

export class SentryErrorHandler extends IonicErrorHandler {

    handleError(error) {
        super.handleError(error);

        try {
          Raven.captureException(error.originalError || error);
        }
        catch(e) {
          console.error(e);
        }
    }
}