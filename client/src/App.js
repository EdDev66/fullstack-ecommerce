
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import NavBar from './components/Navbar/NavBar';
import Home from './components/Pages/Home';
import SignIn from './components/Pages/SignIn';
import SignUp from './components/Pages/SignUp';
import Cart from './components/Pages/Cart';
import SingleProduct from './components/Pages/SingleProduct';
import ProfileScreen from './components/Pages/ProfileScreen';
import ShippingScreen from './components/Pages/ShippingScreen';
import PaymentScreen from './components/Pages/PaymentScreen';
import PlaceOrderScreen from './components/Pages/PlaceOrderScreen';
import OrderScreen from './components/Pages/OrderScreen';
import OrderList from './components/Pages/OrderList';
import UserList from './components/Pages/UserList';
import UserEditScreen from './components/Pages/UserEditScreen';
import ProductList from './components/Pages/ProductList';
import ProductEditScreen from './components/Pages/ProductEditScreen';

function App() {

  return (
    <Router>
      <div className="App">
        <NavBar />

        <Switch>
        <Route path='/search/:keyword' component={Home}/>
        <Route path='/' exact component={Home}/>
        <Route path='/page/:pageNumber' exact component={Home}/>
        <Route path='/search/:keyword/page/:pageNumber' exact component={Home}/>
        <Route path='/products/:id' exact component={SingleProduct}/>
        <Route path='/login' component={SignIn}/>
        <Route path='/admin/userlist' component={UserList}/>
        <Route path='/admin/user/:id/edit' component={UserEditScreen}/>
        <Route path='/admin/productlist/' exact component={ProductList}/>
        <Route path='/admin/productlist/:pageNumber' exact component={ProductList}/>
        <Route path='/admin/product/:id/edit' component={ProductEditScreen}/>
        <Route path='/shipping' component={ShippingScreen}/>
        <Route path='/payment' component={PaymentScreen}/>
        <Route path='/placeorder' component={PlaceOrderScreen}/>
        <Route path='/order/:id' component={OrderScreen}/>
        <Route path='/admin/orderlist' component={OrderList}/>
        <Route path='/profile' component={ProfileScreen}/>
        <Route path='/signup' component={SignUp}/>
        <Route path='/cart/:id?' component={Cart}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
