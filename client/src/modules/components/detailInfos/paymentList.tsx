import "./paymentStyles.css";

const PaymentList = () => {
  return (
    <div>
      <h4>Formas de pagamento</h4>
      <div className="paymentContainer">
        <div className="vista">
          <div className="options">
            <img
              src="https://images.tcdn.com.br/commerce/assets/store/img/icons/formas_pagamento/pag_peqboletotraycheckout.png?07936d1f05f3ad2baeca9f6eacbf142c"
              alt=""
            />
            <img
              src="https://images.tcdn.com.br/commerce/assets/store/img/icons/formas_pagamento/pag_peqpix.png?07936d1f05f3ad2baeca9f6eacbf142c"
              alt=""
            />
          </div>

          <div className="method">
            <p>Á vista</p>
          </div>
        </div>

        <div className="parcelado">
          <div className="options">
            <img
              src="https://images.tcdn.com.br/commerce/assets/store/img/icons/formas_pagamento/pag_peqcartaovisa.png?07936d1f05f3ad2baeca9f6eacbf142c"
              alt=""
            />
            <img
              src="https://images.tcdn.com.br/commerce/assets/store/img/icons/formas_pagamento/pag_peqcartaomastercard.png?07936d1f05f3ad2baeca9f6eacbf142c"
              alt=""
            />
            <img
              src="https://images.tcdn.com.br/commerce/assets/store/img/icons/formas_pagamento/pag_peqcartaoelo.png?07936d1f05f3ad2baeca9f6eacbf142c"
              alt=""
            />
          </div>

          <div className="method">
            <p>Parcelado</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentList;
