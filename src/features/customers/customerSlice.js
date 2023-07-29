import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fullName: "",
    nationalID: "",
    createdAt: "",
};


const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        Create: {
            prepare(fullName, nationalID) {
                return {
                    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
                };
            },
            reducer(state, action) {
                state.fullName = action.payload.fullName;
                state.nationalID = action.payload.nationalID;
                state.createdAt = action.payload.createdAt;
            },
        },
        Update(state, action) {
            state.fullName = action.payload;
        }


    }

})

export const { Update, Create } = customerSlice.actions;
console.log(customerSlice);
export default customerSlice.reducer;
// export default function customerreducer(state = CustomerInitialitem, action) {
//     switch (action.type) {
//         case "customer/Create":
//             return {
//                 ...state,
//                 fullName: action.payload.fullName,
//                 nationalID: action.payload.nationalID,
//                 createdAt: action.payload.createdAt,
//             }
//         case "customer/Update":
//             return {
//                 ...state,
//                 fullName: action.payload,
//             }
//         default:
//             return state;
//     }
// }


// export function Create(fullName, nationalID) {
//     return { type: "customer/Create", payload: { fullName, nationalID, createdAt: new Date().toISOString() } }
// }
// export function Update(fullName) {
//     return {
//         type: "customer/Update", payload: fullName
//     }
// }
