import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUserAlt, FaDragon } from 'react-icons/fa';
import './NavBar.css'

const NavBar = () => {
    return (
        <Navbar bg="light" expand='md' className="py-3 navbar-sizing">
            <Container>
            <Navbar.Brand as={Link} to='/'><FaDragon className="navLogo"/> Red Dragon</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="m-auto">
                    <Form inline>
                        <FormControl className="col-md-8 col-sm-10" type="text" placeholder="Search Products"/>
                        <Button className="col-md-4 col-sm-2" variant="outline-danger">Search</Button>
                    </Form>
                </Nav>
                <Nav>
                    <Nav.Link as={Link} to='/cart'>Cart (0) <FaShoppingCart/></Nav.Link>
                    <Nav.Link as={Link} to='/signIn'>Sign In <FaUserAlt/></Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;