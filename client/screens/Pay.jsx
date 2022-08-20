import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { reset } from '../state/reducers/transaction';
import { currencyFormatter } from '../utils/currencyFormatter';

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
            <h1>Pay</h1>
            <p>Subtotal: {currencyFormatter.format(subtotal)}</p>
            <p>Tax: {currencyFormatter.format(salesTax)}</p>
            <p>Total: {currencyFormatter.format(subtotal + salesTax)}</p>
            <div>
                <TenderForm
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
            alert('Insufficient funds');
            return;
        }

        alert('Thank you for your purchase');
        onSuccess();
    };

    return (
        <form onSubmit={onSubmit}>
            <label>Tender Amount</label>
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
