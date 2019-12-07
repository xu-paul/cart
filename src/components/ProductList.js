import React from 'react';
import {connect} from 'dva';
import { d } from '../utils/utils';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import './ProductList.css';
const ProductList = props => {
  const { products, addToCart } = props;
  const list = (products || []).map((item, key) => (
    <li key={key}>
      <div className='pname'>
        <img src={item.src} alt=""/>
        <span>{item.title}</span>{'-'}
        <span>${item.price}</span>{' '}
        <span>x{item.inventory}</span>
      </div>
      <div>
        <Button type="primary" onClick={() => addToCart(item.id)} disabled={!item.inventory}>添加购物车</Button>
      </div>
    </li>
  ));
  return (
    <div>
      <h1>Products</h1>
      <ul className='item'>
        {list}
      </ul>
    </div>
  );
};

const mapStateToProps = ({products}) => ({
  products: d(products.byId, products.result)
})

const mapDispatchToProps = (dispatch) => ({
  addToCart: (id) => dispatch({
    type: 'cart/add',
    payload: {
      id
    }
  })
})
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
