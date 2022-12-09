import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../users/userSlice";

const Header = () => {
  const user = useSelector((state) => state.userData.loggedInUser);
  const dispatch = useDispatch();

  return (
    <div className="header-conatiner">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Home
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/user/" + user.id}>
                {user.first_name + " " + user.last_name}
              </Nav.Link>
              <Nav.Link as={Link} onClick={() => dispatch(logOut())} to="/auth">
                Log Out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
export default Header;
