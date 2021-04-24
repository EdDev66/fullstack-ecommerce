import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/userActions';
import { Route } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUserAlt, FaDragon } from 'react-icons/fa';
import { NavDropdown } from 'react-bootstrap';
import './NavBar.css'
import { ORDER_RESET } from '../../constants/orderContants';
import { USER_DETAILS_RESET } from '../../constants/userConstants';

const NavBar = () => {
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    
    const logoutHandler = () => {
        dispatch(logout());
        dispatch({ type: USER_DETAILS_RESET })
        dispatch({ type: ORDER_RESET })
    }
    
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart;
    
    const [numberProducts, setNumberProducts] = useState(0);

    useEffect(() => {
        if(localStorage.length > 0 && localStorage.getItem('cartItems') !== null){

        let productsParse = JSON.parse(localStorage.getItem('cartItems'));
        let productsCount = productsParse.length
            setNumberProducts(productsCount)
        }
    }, [dispatch, cartItems, userInfo])

    return (
        <Navbar bg="light" expand='md' className="py-3 navbar-sizing">
            <Container>
            <Navbar.Brand as={Link} to='/'><FaDragon className="navLogo"/> Red Dragon</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="m-auto">
                    <Route render={({ history }) => <SearchBar history={history} />} />
                </Nav>
                <Nav>
                    <Nav.Link as={Link} to='/cart'>Cart ({numberProducts}) <FaShoppingCart/></Nav.Link>
                    {userInfo ? (
                      <NavDropdown title={userInfo.name} id="collasible-nav-dropdown">
                        <NavDropdown.Item as={Link} to='/profile'>Profile</NavDropdown.Item>
                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                      </NavDropdown>
                    ) : <Nav.Link as={Link} to='/login'>Sign In <FaUserAlt/></Nav.Link>}
                    {/* {userInfo && userInfo.IsAdmin? (
                        <NavDropdown title='Admin' id="adminmenu">
                        <NavDropdown.Item as={Link} to='/admin/userlist'>Users</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to='/admin/productlist'>Products</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to='/admin/orderlist'>Orders</NavDropdown.Item>
                       
                      </NavDropdown>
                    ) : null} */}
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;