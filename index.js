'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = createMiddleware;

function createMiddleware() {
  /*
    Function that generates a crash reporter for Sentry.
  */

  if (!Raven || !Raven.isSetup()) return;

  return function (store) {
    return function (next) {
      return function (action) {
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
              state: store.getState()
            }
          });
        }
      };
    };
  };
}

module.exports = exports['default'];
