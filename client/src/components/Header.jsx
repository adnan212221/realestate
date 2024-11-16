import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import '../style/header.scss'
import {useSelector} from 'react-redux'

const Header = () => {
  const {user} = useSelector(state =>state.user)
  
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link}  to="/">Adnan Real Estate</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
        <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            
            <Nav.Item>
              <Link to="/" className="nav-link">Home</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/about" className="nav-link">About</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/profile" className="nav-link">{user ? (<img src={user.avatar || user.rest.avatar} width='40%' alt='profile'/>):'sign in'}</Link>
            </Nav.Item>
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header