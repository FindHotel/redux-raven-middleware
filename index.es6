export default function createMiddleware() {
  /*
    Function that generates a crash reporter for Sentry.
  */

  if (!Raven || !Raven.isSetup()) return;

  return store => next => action => {
    try {
      Raven.captureBreadcrumb({
        category: 'redux',
        message: action.type
      });

      return next(action);
    } catch (err) {
      console.error('[redux-raven-middleware] Reporting error to Sentry:', err);

      // Send the report.
      Raven.captureException(err, {
        extra: {
          action: action,
          state: store.getState(),
        }
      });
    }
  }
}
