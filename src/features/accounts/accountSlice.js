import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    balance: 0,
    loan: 0,
    purpose: "",
    isLoading: false,
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        Deposit(state, action) {
            state.isLoading = false;
            state.balance += action.payload;
        },
        Withdraw(state, action) {
            state.balance -= action.payload;
        },
        RequestLoan: {
            prepare(amount, purpose) {
                return {
                    payload: { amount, purpose }
                }
            },
            reducer(state, action) {
                if (state.loan > 0) return;
                state.balance += action.payload.amount;
                state.loan = action.payload.amount;
                state.purpose = action.payload.purpose;
            }
        },
        PayLoan(state) {
            state.balance -= state.loan;
            state.purpose = "";
            state.loan = 0;

        },
        convertingCurrency(state) {
            state.isLoading = true;
        }
    }
});
console.log(accountSlice);
export const { Withdraw, RequestLoan, PayLoan } = accountSlice.actions;
export function Deposit(amount, currency) {
    if (currency === 'USD') return { type: "account/Deposit", payload: amount };
    return async function (dispatch, getState) {
        dispatch({ type: "account/convertingCurrency" });
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
        const data = await res.json();
        const converted = data.rates.USD;
        dispatch({ type: "account/Deposit", payload: converted });
    }
}
export default accountSlice.reducer;


// export default function accountreducer(state = AccountinitialItems, action) {
//     switch (action.type) {
//         case "account/deposit":
//             return { ...state, balance: state.balance + action.payload };
//         case "account/withdraw":
//             if (state.balance < action.payload) return state;
//             return { ...state, balance: state.balance - action.payload };
//         case "account/RequestLoan":
//             return { ...state, balance: state.balance + action.payload.amount, loan: action.payload.amount, purpose: action.payload.purpose };
//         case "account/PayLoan":
//             return { ...state, balance: state.balance - state.loan, loan: 0, purpose: "" };
//         default:
//             return state;
//     }
// }





// export function Withdraw(amount) {
//     return { type: "account/withdraw", payload: amount }
// }
// export function RequestLoan(amount, purpose) {
//     return { type: "account/RequestLoan", payload: { amount, purpose } }
// }
// export function PayLoan() {
//     return { type: "account/PayLoan" }
// }
