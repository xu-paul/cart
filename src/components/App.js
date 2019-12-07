import React from 'react';
import { connect } from 'dva';
//import { getAllProducts } from '../reducers/products';
import ProductList from './ProductList';
import Cart from './Cart';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import './App.css'

class App extends React.Component {
    componentDidMount () {
        const { dispatch } = this.props;

        dispatch({
            type:'products/query'
        });
    }
    render () {
        const { Header, Footer, Content } = Layout;
        return <div style={{textAlign:'center'}}>
      
        <Layout>
      <Header><h1>Shopping-Cart</h1></Header>
      <Content><ProductList/></Content>
      <Footer> <Cart/></Footer>
       </Layout>
        </div>
    }
}

export default connect()(App);
