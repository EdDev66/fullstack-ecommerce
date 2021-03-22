
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import NavBar from './components/Navbar/NavBar';
import Home from './components/Pages/Home';
import SignIn from './components/Pages/SignIn';
import SignUp from './components/Pages/SignUp';
import Cart from './components/Pages/Cart';
import ProductsState from './context/ProductsState';
import SingleProduct from './components/Pages/SingleProduct';

function App() {

  return (
  <ProductsState>
    <Router>
      <div className="App">
        <NavBar />

        <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/products/:id' exact component={SingleProduct}/>
        <Route path='/signin' component={SignIn}/>
        <Route path='/signup' component={SignUp}/>
        <Route path='/cart' component={Cart}/>
        </Switch>
      </div>
    </Router>
  </ProductsState>
  );
}

export default App;
