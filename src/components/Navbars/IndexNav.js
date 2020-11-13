
import React from "react";
import { Link } from "react-router-dom";
import "assets/blk/blk-design-system-react.scss?v=1.1.0";
import "assets/demo/demo.css";
// reactstrap components
import {
    Button,
    Collapse,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col,
    UncontrolledTooltip
} from "reactstrap";

class ComponentsNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseOpen: false,
            color: "navbar-transparent"
        };
    }
    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user !== null || undefined) {
            this.setState({ user: user.token })
        }
        window.addEventListener("scroll", this.changeColor);
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.changeColor);
    }
    changeColor = () => {
        if (
            document.documentElement.scrollTop > 99 ||
            document.body.scrollTop > 99
        ) {
            this.setState({
                color: "bg-info"
            });
        } else if (
            document.documentElement.scrollTop < 100 ||
            document.body.scrollTop < 100
        ) {
            this.setState({
                color: "navbar-transparent"
            });
        }
    };
    toggleCollapse = () => {
        document.documentElement.classList.toggle("nav-open");
        this.setState({
            collapseOpen: !this.state.collapseOpen
        });
    };
    onCollapseExiting = () => {
        this.setState({
            collapseOut: "collapsing-out"
        });
    };
    onCollapseExited = () => {
        this.setState({
            collapseOut: ""
        });
    };
    scrollToDownload = () => {
        document
            .getElementById("download-section")
            .scrollIntoView({ behavior: "smooth" });
    };
    render() {
        const { user } = this.state
        return (
            <Navbar
                className={"fixed-top " + this.state.color}
                color-on-scroll="100"
                expand="lg"
            >
                <Container>
                    <div className="navbar-translate">
                        <NavbarBrand
                            to="/"
                            tag={Link}
                            id="navbar-brand"
                        >

                            <span>UserMax• </span>

                        </NavbarBrand>

                        <button
                            aria-expanded={this.state.collapseOpen}
                            className="navbar-toggler navbar-toggler"
                            onClick={this.toggleCollapse}
                        >
                            <span className="navbar-toggler-bar bar1" />
                            <span className="navbar-toggler-bar bar2" />
                            <span className="navbar-toggler-bar bar3" />
                        </button>
                    </div>
                    <Collapse
                        className={"justify-content-end " + this.state.collapseOut}
                        navbar
                        isOpen={this.state.collapseOpen}
                        onExiting={this.onCollapseExiting}
                        onExited={this.onCollapseExited}
                    >
                        <div className="navbar-collapse-header">
                            <Row>
                                <Col className="collapse-brand" xs="6">
                                    <a href="#app" onClick={e => e.preventDefault()}>
                                        UserMax•
                  </a>
                                </Col>
                                <Col className="collapse-close text-right" xs="6">
                                    <button
                                        aria-expanded={this.state.collapseOpen}
                                        className="navbar-toggler"
                                        onClick={this.toggleCollapse}
                                    >
                                        <i className="tim-icons icon-simple-remove" />
                                    </button>
                                </Col>
                            </Row>
                        </div>
                        <Nav navbar>

                            <UncontrolledDropdown nav>
                                <DropdownToggle
                                    caret
                                    color="default"
                                    data-toggle="dropdown"
                                    href="#getstarted"
                                    nav
                                    onClick={e => e.preventDefault()}
                                >
                                    <i className="fa fa-cogs d-lg-none d-xl-none" />
                  Getting started
                </DropdownToggle>
                                <DropdownMenu className="dropdown-with-icons">
                                    <DropdownItem tag={Link} to="/">
                                        <i className="tim-icons icon-planet" />
                    Home
                  </DropdownItem>
                                    <DropdownItem tag={Link} to="/pricing">
                                        <i className="tim-icons icon-paper" />
                    Pricing
                  </DropdownItem>
                                    <DropdownItem tag={Link} to="/register">
                                        <i className="tim-icons icon-app" />
                    Register
                  </DropdownItem>
                                    {
                                        user ?
                                            <DropdownItem onClick={this.props.logout}>
                                                <i className="tim-icons icon-single-02" />
                    Logout
                  </DropdownItem>
                                            :
                                            <DropdownItem tag={Link} to="/login" >
                                                <i className="tim-icons icon-single-02" />
                  Login
                </DropdownItem>
                                    }


                                </DropdownMenu>
                            </UncontrolledDropdown>
                            {
                                user ?
                                    <NavItem>

                                        <NavLink onClick={e => window.location.href = '/user'}><i className="tim-icons icon-sound-wave" /> Dashboard
                  </NavLink>

                                    </NavItem>
                                    :
                                    <NavItem>

                                        <NavLink tag={Link} to='/register'><i className="tim-icons icon-sound-wave" /> Signup
                  </NavLink>

                                    </NavItem>
                            }
                            <NavItem>
                                <NavLink tag={Link} to="/about">
                                    About us
                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink tag={Link} to="/support">
                                    Have an issue?
                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default ComponentsNavbar;
