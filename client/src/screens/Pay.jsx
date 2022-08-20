import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { reset } from "../state/reducers/transaction";
import { currencyFormatter } from "../utils/currencyFormatter";

const Pay = () => {
  const { subtotal, products } = useSelector((state) => state.transaction);
  const dispatch = useDispatch();

  if (products.length <= 0) {
    return <Navigate to="/pos" />;
  }

  const salesTax = subtotal * 0.08;

  const onPayment = () => {
    dispatch(reset());
  };

  return (
    <div>
      <div className="Total-container">
        <h1 className="Total-title">Here is your total due</h1>
        <p className="Subtotal-label">
          Subtotal: {currencyFormatter.format(subtotal)}
        </p>
        <p className="Tax-label">Tax: {currencyFormatter.format(salesTax)}</p>
        <p className="Total-label">
          Total: {currencyFormatter.format(subtotal + salesTax)}
        </p>
      </div>
      <div>
        <TenderForm
          className="Pay-form"
          expectedValue={subtotal + salesTax}
          onSuccess={onPayment}
        />
      </div>
    </div>
  );
};

const TenderForm = ({ expectedValue, onSuccess }) => {
  const [value, updateValue] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();

    if (value < Number(expectedValue)) {
      alert("Insufficient funds");
      return;
    }

    alert("Thank you for your purchase");
    onSuccess();
  };

  return (
    <form className="Tender-form" onSubmit={onSubmit}>
      <label className="Tender-label">Tender Amount</label>
      <input
        type="number"
        value={value}
        onChange={(e) => updateValue(Number(e.target.value))}
        min="0"
        step="0.01"
      />
    </form>
  );
};

export default Pay;
