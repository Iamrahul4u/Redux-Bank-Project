import { createStore, combineReducers, applyMiddleware } from "redux";
import accountreducer from "./features/accounts/accountSlice";
import customerreducer from "./features/customers/customerSlice";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
const rootReducer = combineReducers({
    account: accountreducer,
    customer: customerreducer,
})
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));


// store.dispatch({ type: "account/deposit", payload: 1000 });
// console.log(store.getState());
// store.dispatch({ type: "account/withdraw", payload: 1500 });
// console.log(store.getState());
// store.dispatch({ type: "account/RequestLoan", payload: { amount: 500, purpose: "Buy a Car" } });
// console.log(store.getState());
// store.dispatch({ type: "account/PayLoan" });
// console.log(store.getState());

export default store;