
import React from "react";
import { connect, } from "react-redux"
// react plugin used to create charts

import * as actions from "store/actions/auth.js"
// reactstrap components

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    ListGroupItem,
    ListGroup,
    Container,
    Row,
    Col, UncontrolledTooltip
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNav.js";
import Footer from "components/Footer/Footer.js";





class LandingPage extends React.Component {
    state = {
        show: ""
    }
    componentDidMount() {
        this.props.authCheck()
        document.body.classList.toggle("landing-page");
    }

    componentWillUnmount() {
        document.body.classList.toggle("landing-page");
    }











    render() {
        return (
            <>
                <IndexNavbar />


                <br />
                <div className="wrapper">
                    <div className="page-header">

                        <img
                            alt="..."
                            className="path"
                            src={require("assets/img/blob.png")}
                        />
                        <img
                            alt="..."
                            className="path2"
                            src={require("assets/img/path2.png")}
                        />
                        <img
                            alt="..."
                            className="shapes triangle"
                            src={require("assets/img/triunghiuri.png")}
                        />
                        <img
                            alt="..."
                            className="shapes wave"
                            src={require("assets/img/waves.png")}
                        />
                        <img
                            alt="..."
                            className="shapes squares"
                            src={require("assets/img/patrat.png")}
                        />
                        <img
                            alt="..."
                            className="shapes circle"
                            src={require("assets/img/cercuri.png")}
                        />

                        <div className="content-center">
                            <Row className="row-grid justify-content-between align-items-center text-left">
                                <br />
                                <Col lg="4" md="5">
                                    <img
                                        alt="..."
                                        className="img-fluid"
                                        src={require("assets/img/bitcoin.png")}

                                    />
                                </Col>
                                <Col lg="6" md="6">
                                    <h1 className="text-white">
                                        Buy usermax services.<br />
                                        <span className="text-white">Pay for Max.</span>
                                    </h1>
                                    <p className="text-white mb-3">
                                        your customers and you...
                  </p>


                                </Col>

                            </Row>

                        </div>

                    </div>


                    <img
                        alt="..."
                        className="path"
                        src={require("assets/img/blob.png")}
                    />

                    <Container className="section section-lg">
                        <img
                            alt="..."
                            className="path"
                            src={require("assets/img/path4.png")}
                        />
                    </Container>
                    <section className="section section-lg">
                        <section className="section">
                            <img
                                alt="..."
                                className="path"
                                src={require("assets/img/path4.png")}
                            />
                            <Container style={{
                                paddingRight: "25px",
                                paddingleft: "25px"
                            }}>
                                <Row className="row-grid justify-content-between">
                                    <Col className="mt-lg-5" md="5">
                                        <Row>
                                            <Col className="px-2 py-2" lg="6" sm="12">
                                                <Card className="card-stats">
                                                    <CardBody>
                                                        <Row>
                                                            <Col md="4" xs="5">
                                                                <div className="icon-big text-center icon-warning">
                                                                    <i className="tim-icons icon-trophy text-warning" />
                                                                </div>
                                                            </Col>
                                                            <Col md="8" xs="7">
                                                                <div className="numbers">
                                                                    <CardTitle tag="p">2,641<small>+</small></CardTitle>
                                                                    <p />
                                                                    <p className="card-category">Users</p>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                            <Col className="px-2 py-2" lg="6" sm="12">
                                                <Card className="card-stats upper bg-default">
                                                    <CardBody>
                                                        <Row>
                                                            <Col md="4" xs="5">
                                                                <div className="icon-big text-center icon-warning">
                                                                    <i className="tim-icons icon-coins text-white" />
                                                                </div>
                                                            </Col>
                                                            <Col md="8" xs="7">
                                                                <div className="numbers">
                                                                    <CardTitle tag="p">65+</CardTitle>
                                                                    <p />
                                                                    <p className="card-category">Comms</p>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="px-2 py-2" lg="6" sm="12">
                                                <Card className="card-stats">
                                                    <CardBody>
                                                        <Row>
                                                            <Col md="4" xs="5">
                                                                <div className="icon-big text-center icon-warning">
                                                                    <i className="tim-icons icon-world text-info" />
                                                                </div>
                                                            </Col>
                                                            <Col md="8" xs="7">
                                                                <div className="numbers">
                                                                    <CardTitle tag="p">100%</CardTitle>
                                                                    <p />
                                                                    <p className="card-category">GT</p>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                            <Col className="px-2 py-2" lg="6" sm="12">
                                                <Card className="card-stats">
                                                    <CardBody>
                                                        <Row>
                                                            <Col md="4" xs="5">
                                                                <div className="icon-big text-center icon-warning">
                                                                    <i className="tim-icons icon-credit-card text-success" />
                                                                </div>
                                                            </Col>
                                                            <Col md="8" xs="7">
                                                                <div className="numbers">
                                                                    <CardTitle tag="p">Blockchain<small>+</small></CardTitle>
                                                                    <p />
                                                                    <p className="card-category">Based</p>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md="6">
                                        <div className="pl-md-5">
                                            <br />
                                            <h3 className="display-3 ">
                                                Accept Crypto for your services<br />
                       for greater Choice and opportunity.
                      </h3>
                                            <br />
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  </p>
                                            <br />
                                            <p id="more" style={{ display: "none" }}>
                                                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                      </p>
                                            <br />

                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </section>
                    </section>

                    <section className="section section-lg">
                        <img
                            alt="..."
                            className="path"
                            src={require("assets/img/path4.png")}
                        />
                        <img
                            alt="..."
                            className="path2"
                            src={require("assets/img/path5.png")}
                        />
                        <img
                            alt="..."
                            className="path3"
                            src={require("assets/img/path2.png")}
                        />
                        <Container>
                            <Row className="justify-content-center">
                                <Col lg="12">
                                    <h1 className="text-center">Your best benefit</h1>
                                    <Row className="row-grid justify-content-center">
                                        <Col lg="3">
                                            <div className="info">
                                                <div className="icon icon-primary">
                                                    <i className="tim-icons icon-money-coins" />
                                                </div>
                                                <h4 className="info-title">Time saving</h4>
                                                <hr className="line-primary" />
                                                <p>
                                                    consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore </p>
                                            </div>
                                        </Col>
                                        <Col lg="3">
                                            <div className="info">
                                                <div className="icon icon-warning">
                                                    <i className="tim-icons icon-chart-pie-36" />
                                                </div>
                                                <h4 className="info-title">Customizable</h4>
                                                <hr className="line-warning" />
                                                <p>
                                                    consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                        </p>
                                            </div>
                                        </Col>
                                        <Col lg="3">
                                            <div className="info">
                                                <div className="icon icon-success">
                                                    <i className="tim-icons icon-vector" />
                                                </div>
                                                <h4 className="info-title">efficient</h4>
                                                <hr className="line-success" />
                                                <p>
                                                    consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore      </p>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                    <Footer />
                </div>
            </>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        authCheck: () => dispatch(actions.authCheckState())
    }
}
export default connect(null, mapDispatchToProps)(LandingPage);
