import * as React from "react";
import * as ReactDOM from "react-dom";

// redux object model
// createStore: Used to create Store (Application State management object)
// applyMiddleware: Encapsulate all Aysnc calls and manage an Auto-Subscription to it
// compose: Used to control the store updates with reducers and all the action methods
// performing async operations those are encapsulated by middlewares
import { createStore, applyMiddleware, compose } from "redux";

// object provides us autosubscription async operations to look like sync
import createSagaMiddleware from "redux-saga";

// bridge b/w react and redux ->manages lifecycle of React components by provoding 
// subscription to the store subscription to them
import { Provider } from "react-redux";

import { reducers } from "./reducers/index";
import { rootSaga } from "./saga/index";
import { ProductRequestContainer } from "./components/requestProductComponent";
import { ListProductsContainer } from "./components/listProductsComponent";
import 'bootstrap/dist/css/bootstrap.css';
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(sagaMiddleware)
    // ,
    // window["__REDUX_DEVTOOLS_EXTENSION__"]
    //   ? window["__REDUX_DEVTOOLS_EXTENSION__"]()
    //   : f => f
  )
);

// this will invoke and execute the generator functions those are performing promise operations
// (manage call and subscribe to callback to resolve/reject)
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <>
      <ProductRequestContainer />
      <ListProductsContainer />
    </>
  </Provider>,
  document.getElementById("root")
);
