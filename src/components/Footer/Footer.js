
/*eslint-disable*/
import React from "react";
// used for making the prop types of this component


// reactstrap components
import { Container, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">

        <Container fluid>
          <Nav>
            <NavItem>
              <NavLink href="/" > UserMax</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">About Us</NavLink>
            </NavItem>

          </Nav>
          <div className="copyright">
            © {new Date().getFullYear()}{" "}
            <i className="tim-icons icon-heart-2" /> by{" "}
            <a
              href="/"
              target="_blank"
            >
              UsexMax
            </a>{" "}
            Your users and you
          </div>
        </Container>
      </footer>
    );
  }
}

export default Footer;
