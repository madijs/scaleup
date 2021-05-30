import { applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";/*Delete on production*/
import thunkMiddleWare from "redux-thunk";
import { rootReducer } from "./rootReducer";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleWare))
);

export default store;
