const ProductSummury = ({
  price,
  protectionFees,
  shippingFees,
  totalPrice,
}) => {
  return (
    <div className="payment-card summury">
      <div className="title">Résumé de la commande </div>
      <div className="content">
        <ul>
          <li>
            Commande <span>{price}</span>
          </li>
          <li>
            Frais de protection acheteurs <span>{protectionFees} </span>
          </li>
          <li>
            Frais de port <span> {shippingFees} € </span>{" "}
          </li>
        </ul>
      </div>
      <div className="divider"></div>
      <div className="content">
        <ul>
          <li className="bold">
            Total <span> {totalPrice} € </span>{" "}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductSummury;
