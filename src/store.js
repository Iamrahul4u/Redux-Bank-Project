
import { configureStore } from "@reduxjs/toolkit";
import accountreducer from "./features/accounts/accountSlice";
import customerreducer from "./features/customers/customerSlice";

const store = configureStore({
    reducer: { account: accountreducer, customer: customerreducer }
});

// store.dispatch({ type: "account/deposit", payload: 1000 });
// console.log(store.getState());
// store.dispatch({ type: "account/withdraw", payload: 1500 });
// console.log(store.getState());
// store.dispatch({ type: "account/RequestLoan", payload: { amount: 500, purpose: "Buy a Car" } });
// console.log(store.getState());
// store.dispatch({ type: "account/PayLoan" });
// console.log(store.getState());

export default store;