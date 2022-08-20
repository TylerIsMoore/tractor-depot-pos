import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchSkuAsync } from "../state/reducers/transaction";
import { currencyFormatter } from "../utils/currencyFormatter";

const POS = () => {
  const { products, product, error, subtotal } = useSelector(
    (state) => state.transaction
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSkuSearched = (sku) => {
    dispatch(searchSkuAsync(sku));
  };

  const onTender = () => {
    navigate("/pay");
  };

  const salesTax = subtotal * 0.08;

  return (
    <div className="Main-container">
      <div>
        <ul className="Product-list">
          {products?.map((product, i) => (
            <Item
              key={`product-${i}`}
              description={product.description}
              price={product.price}
            />
          ))}
        </ul>
      </div>
      <div>
        <SKUForm className="SKU-Form" onSku={onSkuSearched} />
        <button
          className="btn btn-primary"
          disabled={(products?.length || 0) <= 0}
          onClick={onTender}
        >
          Tender
        </button>
        <p className="Subtotal-label">
          Subtotal: {currencyFormatter.format(subtotal)}
        </p>
        <p className="Tax-label">Tax: {currencyFormatter.format(salesTax)}</p>
        <p className="Total-label">
          Total: {currencyFormatter.format(subtotal + salesTax)}
        </p>
      </div>
    </div>
  );
};

const Item = ({ description, price }) => {
  return (
    <li>
      <p>
        {description} - ${price}
      </p>
    </li>
  );
};

const SKUForm = ({ onSku }) => {
  const [sku, updateSku] = useState("");

  const validate = () => {
    if (sku.length === 0) {
      return false;
    }
    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    onSku(sku);
    updateSku("");
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={sku}
        onChange={(e) => updateSku(e.target.value)}
      />
    </form>
  );
};

export default POS;
