import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import './Cart.css'

const Cart = props => {
  const { products, subtotal, onCheckout, loading, checking } = props;
  const nodes = products.map((item, key) => (
    <li key={key}>
      <img src={item.src} alt=""/>{item.title}-$ {item.price} x {item.quantity} 
    </li>
  ));
  return (
    <div>
      <h1 className='cart-title'>Your Cart</h1>
      <ul className='cart-item'>{nodes}</ul>
      <div className='total'>Total: {subtotal}</div>
      <div>
        {checking && <div style={{color: 'red'}}>Checking ...</div>}
        <Button type='danger' onClick={onCheckout} disabled={subtotal <= 0.00 || loading}>Checkout</Button>
      </div>
    </div>
  );
};

const mapStateToProps = ({cart, products, loading}) => ({
  products: cart.added.map(id => ({...products.byId[id], quantity: cart.quantities[id]})),
  subtotal: cart.added.reduce((amount, id) => products.byId[id].price * cart.quantities[id] + amount, 0).toFixed(2),
  loading: loading.models['cart'],
  checking: loading.effects['cart/checkout']
})

const mapDispatchToProps = (dispatch) => ({
  onCheckout: () => dispatch({
    type: 'cart/checkout'
  })
})
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
