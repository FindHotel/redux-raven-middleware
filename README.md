# redux-raven-middleware

Redux middleware for sending error reports to Sentry through globally available
Raven object (this fork expects Raven to be configured outside of the 
application).

Will automatically send an error report upon encountering a Javascript error
on dispatching any action. redux-raven-middleware will pass in the error as
well as extra information such as the action that caused the error and the
entire Redux application state.

## RavenMiddleware()

Creates a Raven Middleware.

```js
import {applyMiddleware, createStore} from 'redux';
import RavenMiddleware from 'redux-raven-middleware';


const createStoreWithMiddleware = applyMiddleware(
  RavenMiddleware()
)(createStore);
```
