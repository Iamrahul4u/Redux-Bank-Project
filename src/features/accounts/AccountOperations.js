import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Deposit, Withdraw, RequestLoan, PayLoan } from "./accountSlice";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");

  const { loan, purpose, isLoading } = useSelector(store => store.account);
  // console.log(balance);
  const dispatch = useDispatch();
  function handleDeposit() {
    dispatch(Deposit(depositAmount, currency));
    // dispatch(Deposit(depositAmount));

    setDepositAmount("");
  }

  function handleWithdrawal() {
    dispatch(Withdraw(withdrawalAmount));
    setWithdrawalAmount("")
  }

  function handleRequestLoan() {
    dispatch(RequestLoan(loanAmount, loanPurpose));
    setLoanAmount("");
    setLoanPurpose("");
  }

  function handlePayLoan() {
    dispatch(PayLoan());
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button onClick={handleDeposit} disabled={isLoading}>{isLoading ? "Converting" : `Deposit  ${depositAmount} `}</button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>
        {loan > 0 &&
          <div>
            <span>Pay back ${loan}({purpose})</span>
            <button onClick={handlePayLoan}>Pay loan</button>
          </div>
        }
      </div>
    </div>
  );
}

export default AccountOperations;
