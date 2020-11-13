
import React from "react";
import { Link } from "react-router-dom"
// javascript plugin used to create scrollbars on windows
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    CardFooter,
    ListGroupItem,
    ListGroup,
    UncontrolledTooltip,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/IndexNav.js";
import Footer from "components/Footer/Footer.js";
import { connect } from "react-redux";
import * as actions from "store/actions/products";

class RatePage extends React.Component {


    componentDidMount() {
        document.body.classList.toggle("landing-page");
        this.props.getProduct();
    }



    componentWillUnmount() {
        document.body.classList.toggle("landing-page");
    }
    render() {

        const { data } = this.props;



        return (
            <>
                <ExamplesNavbar />
                <div className="wrapper">

                    <section className="section section-lg section-coins">
                        <img
                            alt="..."
                            className="path"
                            src={require("assets/img/path3.png")}
                        />
                        <img
                            alt="..."
                            className="shapes triangle"
                            src={require("assets/img/triunghiuri.png")}
                        />

                        <Container>

                            <Row>
                                <Col md="4">
                                    <hr className="line-info" />
                                    <h1>
                                        Choose the Kit{" "}
                                        <span className="text-info">that fits your needs</span>
                                    </h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3">
                                    <Card className="card-coin card-plain">
                                        <CardHeader>
                                            <img
                                                alt="..."
                                                className="img-center img-fluid"
                                                src={require("assets/img/ripp.png")}
                                            />
                                        </CardHeader>

                                        <CardBody>
                                            <Row>

                                                <Col className="text-center" md="12">
                                                    <h1 className="card-title" ><small >$</small>20</h1>
                                                    <UncontrolledTooltip placement="bottom" target="help-tip">
                                                        tempor incididunt ut labore et dolore magna aliqua.
                                                    </UncontrolledTooltip>
                                                    <span>silver</span>
                                                    <hr className="line-primary" />
                                                    <h5 id="help-tip"> 1/month </h5>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <ListGroup>

                                                    <ListGroupItem><i class="tim-icons icon-chart-bar-32"></i>&nbsp; $20 </ListGroupItem>
                                                    <ListGroupItem><i class="tim-icons icon-time-alarm" />&nbsp;&nbsp; 24/7 Support</ListGroupItem>
                                                    <ListGroupItem><i class="tim-icons icon-calendar-60" />&nbsp;&nbsp; 100% GT</ListGroupItem>
                                                </ListGroup>
                                            </Row>
                                        </CardBody>

                                        <CardFooter className="text-center">
                                            <Button to="/register-page" tag={Link} className="btn-simple" color="primary">
                                                Get plan
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </Col>
                                <Col md="3">
                                    <Card className="card-coin card-plain">
                                        <CardHeader>
                                            <img
                                                alt="..."
                                                className="img-center img-fluid"
                                                src={require("assets/img/etherum.png")}
                                            />
                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col className="text-center" md="12">
                                                    <h1 className="card-title" ><small>$</small>50</h1>
                                                    <UncontrolledTooltip placement="bottom" target="help-tip">
                                                        tempor incididunt ut labore et dolore magna aliqua.
                                                    </UncontrolledTooltip>
                                                    <span>Bronze</span>
                                                    <hr className="line-primary" />
                                                    <h5 id="help-tip">0/month</h5>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <ListGroup>

                                                    <ListGroupItem><i className="tim-icons icon-chart-bar-32"></i>&nbsp; $100</ListGroupItem>
                                                    <ListGroupItem><i className="tim-icons icon-time-alarm" />&nbsp;&nbsp; 24/7 Support</ListGroupItem>
                                                    <ListGroupItem><i className="tim-icons icon-calendar-60" />&nbsp;&nbsp; 100% GT</ListGroupItem>
                                                </ListGroup>
                                            </Row>
                                        </CardBody>
                                        <CardFooter className="text-center">
                                            <Button to="/register-page" tag={Link} className="btn-simple" color="primary">
                                                Get plan
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </Col>
                                <Col md="3">
                                    <Card className="card-coin card-plain">
                                        <CardHeader>
                                            <img
                                                alt="..."
                                                className="img-center img-fluid"
                                                src={require("assets/img/bitcoin.png")}
                                            />
                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col className="text-center" md="12">
                                                    <h1 className="card-title" ><small>$</small>150</h1>
                                                    <UncontrolledTooltip placement="bottom" target="help-pro">
                                                        tempor incididunt ut labore et dolore magna aliqua.
                                                    </UncontrolledTooltip>
                                                    <span>Diamond</span>
                                                    <hr className="line-primary" />
                                                    <h5 id="help-pro">2 / month</h5>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <ListGroup>
                                                    <ListGroupItem><i class="tim-icons icon-chart-bar-32"></i>&nbsp; $150</ListGroupItem>
                                                    <ListGroupItem><i class="tim-icons icon-time-alarm" />&nbsp;&nbsp; 24/7 Support</ListGroupItem>
                                                    <ListGroupItem><i class="tim-icons icon-calendar-60" />&nbsp;&nbsp; 100% GT</ListGroupItem>
                                                </ListGroup>
                                            </Row>
                                        </CardBody>
                                        <CardFooter className="text-center">
                                            <Button to="/register-page" tag={Link} className="btn-simple" color="success">
                                                Get plan
                      </Button>
                                        </CardFooter>
                                    </Card>
                                </Col>
                                <Col md="3">
                                    <Card className="card-coin card-plain">
                                        <CardHeader>
                                            <img
                                                alt="..."
                                                className="img-center img-fluid"
                                                src={require("assets/img/ripp.png")}
                                            />
                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col className="text-center" md="12">
                                                    <h1 className="card-title" ><small>$</small>200</h1>
                                                    <UncontrolledTooltip placement="bottom" target="help-ent">
                                                        tempor incididunt ut labore et dolore magna aliqua.
                                                    </UncontrolledTooltip>
                                                    <span>Gold</span>
                                                    <hr className="line-primary" />
                                                    <h5 id="help-ent">2 / month</h5>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <ListGroup>
                                                    <ListGroupItem><i class="tim-icons icon-chart-bar-32"></i>&nbsp; $200</ListGroupItem>
                                                    <ListGroupItem><i class="tim-icons icon-time-alarm" />&nbsp;&nbsp; 24/7 Support</ListGroupItem>
                                                    <ListGroupItem><i class="tim-icons icon-calendar-60" />&nbsp;&nbsp; 100% GT</ListGroupItem>
                                                </ListGroup>
                                            </Row>
                                        </CardBody>
                                        <CardFooter className="text-center">
                                            <Button to="/register-page" tag={Link} className="btn-simple" color="info">
                                                Get plan
                      </Button>
                                        </CardFooter>
                                    </Card>
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

const mapStateToProps = state => {
    return {
        data: state.products.products,
        loading: state.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProduct: () => dispatch(actions.getProduct())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(RatePage);
