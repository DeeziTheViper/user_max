
import React from "react";

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
    FormGroup,
    Form,
    Input,
    Label,
    UncontrolledTooltip,
    UncontrolledAlert
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/IndexNav.js";
import Footer from "components/Footer/Footer.js";
import axios from "axios";


class ContactPage extends React.Component {

    state = {

        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        errors: {},
        detail: ""

    };
    contact() {
        const { name, email, phone, company, message, } = this.state
        const user = {
            name: name,
            email: email,
            phone: phone,
            subject: "Contact form",
            company: company,
            message: message,

        }

        axios.post('/contact-us-api/', user)
            .then(res => {
                this.setState({
                    detail: res.data.success
                })
            }).catch(err => console.log(err))
    }
    handleName = e => {

        let { name } = this.state;
        let errors = {};
        let formIsValid = true;

        //Name
        if (!name) {
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        }


        this.setState({ errors: errors });
        return formIsValid;
    }
    handleMessage = e => {

        let { message } = this.state;
        let errors = {};
        let formIsValid = true;

        //Name
        if (!message) {
            formIsValid = false;
            errors["message"] = "Cannot be empty";
        }


        this.setState({ errors: errors });
        return formIsValid;
    }
    handleEmail = e => {

        let { email } = this.state
        let errors = {};
        let formIsValid = true;
        //Email
        if (!email) {
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        }

        if (typeof email !== "undefined") {
            let lastAtPos = email.lastIndexOf('@');
            let lastDotPos = email.lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }
        }
        this.setState({ errors: errors });
        return formIsValid;
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    };
    checkform() {
        let { name, email, message } = this.state;
        let errors = {};
        let formIsValid = true;



        //Name
        if (!name) {
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        }




        if (!email) {
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        }

        if (typeof email !== "undefined") {
            let lastAtPos = email.lastIndexOf('@');
            let lastDotPos = email.lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }
        }





        //Name
        if (!message) {
            formIsValid = false;
            errors["message"] = "Cannot be empty";
        }



        this.setState({ errors: errors });
        return formIsValid;

    }
    handleSubmit = e => {
        e.preventDefault();

        if (this.checkform()) {
            this.contact();
        } else {
            this.checkform();
        }

    }
    componentDidMount() {
        document.body.classList.toggle("landing-page");

    }



    componentWillUnmount() {
        document.body.classList.toggle("landing-page");
    }
    render() {




        return (
            <>
                <ExamplesNavbar />
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

                                <Col >
                                    <h1 className="text-white">
                                        How can we help today? <br />
                                        <span className="text-white">Support center</span>
                                    </h1>
                                </Col>
                            </Row>
                        </div>
                    </div>

                    <img
                        alt="..."
                        className="path"
                        src={require("assets/img/path3.png")}
                    />

                    <Container style={{ marginTop: "-10%" }}>

                        <Row>
                            <Col md="4">
                                <hr className="line-info" />
                                <h1>
                                    Support{" "}
                                    <span className="text-info"> center</span>
                                </h1>
                                <hr className="line-success" />
                            </Col>
                        </Row>

                    </Container>
                    <div className="wrapper">
                        <div className="page-header">
                            <img
                                alt="..."
                                className="dots"
                                src={require("assets/img/dots.png")}
                            />
                            <img
                                alt="..."
                                className="path"
                                src={require("assets/img/path4.png")}
                            />

                            <Container >
                                <Row>
                                    <Col >
                                        <Card className="card-plain">
                                            <CardHeader>
                                                <h5 className="text-on-back">01</h5>
                                            </CardHeader>
                                            <CardBody>
                                                <Form>
                                                    {this.state.detail && (<UncontrolledAlert className="alert-with-icon" color="success">
                                                        <span data-notify="icon" className="tim-icons icon-bell-55" />
                                                        <span>
                                                            <b>Thank You! -</b>
                                                            {this.state.detail}
                                                        </span>
                                                    </UncontrolledAlert>)}
                                                    <Row>

                                                        <Col md="6">
                                                            <Label for="error" className="control-label">{this.state.errors["name"]}</Label>
                                                            <FormGroup className={this.state.errors['name'] ? "has-danger" : null}>
                                                                <label>Your Name</label>
                                                                <Input onChange={this.handleChange} onBlur={this.handleName} placeholder="Mike" name="name" type="text" />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="6">
                                                            <Label for="error" className="control-label">{this.state.errors["email"]}</Label>
                                                            <FormGroup className={this.state.errors['email'] ? "has-danger" : null}>
                                                                <label>Email address</label>
                                                                <Input onChange={this.handleChange}
                                                                    placeholder="mike@email.com"
                                                                    type="email"
                                                                    name="email"
                                                                    onBlur={this.handleEmail}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md="6">

                                                            <FormGroup >
                                                                <label>Phone</label>
                                                                <Input onChange={this.handleChange} placeholder="001-12321345" name="phone" type="text" />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="6">
                                                            <FormGroup>
                                                                <label>Company(Enterprise)</label>
                                                                <Input onChange={this.handleChange} placeholder="Dippace" name="company" type="text" />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md="12">
                                                            <Label for="error" className="control-label">{this.state.errors["message"]}</Label>
                                                            <FormGroup className={this.state.errors['message'] ? "has-danger" : null}>
                                                                <label>Message</label>
                                                                <Input onChange={this.handleChange} onBlur={this.handleMessage} placeholder="Hello there!" name="message" type="text" />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <Button
                                                        className="btn-round float-right"
                                                        color="primary"
                                                        data-placement="right"
                                                        id="tooltip341148792"
                                                        type="button"
                                                        onClick={this.handleSubmit}
                                                    >
                                                        Send text
                        </Button>
                                                    <UncontrolledTooltip
                                                        delay={0}
                                                        placement="right"
                                                        target="tooltip341148792"
                                                    >
                                                        Can't wait for your message
                        </UncontrolledTooltip>
                                                </Form>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>

                        </div>
                    </div>
                    <Footer />
                </div>
            </>
        );
    }
}


export default ContactPage;
