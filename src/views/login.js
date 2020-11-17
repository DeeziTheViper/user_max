
import React from "react";
import classnames from "classnames";
import { authLogin } from "../store/actions/auth";
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Alert,
    Button,
    Label
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/IndexNav.js";
import Footer from "components/Footer/Footer.js";
import { connect } from "react-redux"
import { Redirect, Link } from "react-router-dom";


class LoginPage extends React.Component {
    state = {
        email: "",
        password: "",
        squares1to6: "",
        squares7and8: "",
        errors: []
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleEmail = e => {
        this.setState({ emailFocus: false })
        let { email } = this.state
        let errors = {};
        let formIsValid = true;
        //Email
        if (!email) {
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        }
        this.setState({ errors: errors });
        return formIsValid;
    }

    handlePass = e => {
        this.setState({ passwordFocus: false })
        let { password } = this.state;
        let errors = {};
        let formIsValid = true;
        if (!password) {
            formIsValid = false;
            errors["password"] = "Input Password"
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    checkform() {
        let { email, password } = this.state;
        let errors = {};
        let formIsValid = true;




        if (!email) {
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        }



        if (!password) {
            formIsValid = false;
            errors["password"] = "Input Password"
        }

        this.setState({ errors: errors });
        return formIsValid;

    }



    onSubmit = e => {
        e.preventDefault();
        const { email, password } = this.state;
        if (this.checkform()) {
            this.props.login(email, password);
        }
    };

    componentDidMount() {
        document.body.classList.toggle("register-page");
        document.documentElement.addEventListener("mousemove", this.followCursor);
    }
    componentWillUnmount() {
        document.body.classList.toggle("register-page");
        document.documentElement.removeEventListener(
            "mousemove",
            this.followCursor
        );
    }
    followCursor = event => {
        let posX = event.clientX - window.innerWidth / 2;
        let posY = event.clientY - window.innerWidth / 6;
        this.setState({
            squares1to6:
                "perspective(500px) rotateY(" +
                posX * 0.05 +
                "deg) rotateX(" +
                posY * -0.05 +
                "deg)",
            squares7and8:
                "perspective(500px) rotateY(" +
                posX * 0.02 +
                "deg) rotateX(" +
                posY * -0.02 +
                "deg)"
        });
    };



    render() {
        const { error, token, detail } = this.props;
        const { email, password } = this.state;
        if (token) {
            return <Redirect to="/user"></Redirect>;
        }

        return (
            <>
                <ExamplesNavbar />
                <div className="wrapper">
                    <div className="page-header">
                        <div className="page-header-image" />
                        <div className="content">
                            <Container>
                                <div
                                    className="square square-7"
                                    id="square7"
                                    style={{ transform: this.state.squares7and8 }}
                                />
                                <div
                                    className="square square-8"
                                    id="square8"
                                    style={{ transform: this.state.squares7and8 }}
                                />
                                <Row>
                                    <div className="mx-auto col-md-8 col-lg-5" >

                                        <Card className="card-register">
                                            <CardHeader>
                                            </CardHeader>
                                            <h6 className="card-title" style={{ textAlign: 'center' }}>Login</h6>

                                            <CardBody>
                                                {this.props.error ?
                                                    <Alert color="danger">{error && <p>{this.props.error.detail}</p>}</Alert>
                                                    :
                                                    null
                                                }
                                                {this.props.detail ?
                                                    <Alert color="danger" ><p>{this.props.detail.detail}</p></Alert>

                                                    : null}
                                                <Form className="form" onSubmit={this.onSubmit}>
                                                    <Label for="error" className="control-label">{this.state.errors["email"]}</Label>

                                                    <InputGroup
                                                        className={this.state.errors["email"] ? "has-danger" : classnames({
                                                            "input-group-focus": this.state.emailFocus
                                                        })}>
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="tim-icons icon-email-85" />
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            onChange={this.handleChange}
                                                            value={email}
                                                            name="email"
                                                            placeholder="Email"
                                                            type="text"
                                                            onFocus={e => this.setState({ emailFocus: true })}
                                                            onBlur={this.handleEmail}
                                                            style={{ cursor: "text" }}
                                                        />
                                                    </InputGroup>
                                                    <Label for="error" className="control-label">{this.state.errors["password1"]}</Label>
                                                    <InputGroup
                                                        className={this.state.errors["password"] ? "has-danger" : classnames({
                                                            "input-group-focus": this.state.passwordFocus
                                                        })}
                                                    >
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="tim-icons icon-lock-circle" />
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            onChange={this.handleChange}
                                                            value={password}
                                                            name="password"
                                                            placeholder="Password"
                                                            type="password"
                                                            onFocus={e =>
                                                                this.setState({ passwordFocus: true })
                                                            }
                                                            onBlur={
                                                                this.handlePass
                                                            }
                                                            style={{ cursor: "text" }}
                                                        />
                                                    </InputGroup>
                                                </Form>
                                            </CardBody>


                                            <div className="text-center card-footer">

                                                {
                                                    this.props.loading ?
                                                        <div className="loader loader-1">
                                                            <div className="loader-outter"></div>
                                                            <div className="loader-inner"></div>
                                                        </div>
                                                        :

                                                        <Button className="btn-round btn btn-primary btn-lg btn-block" onClick={this.onSubmit}>
                                                            Get Started
                                                        </Button>
                                                }

                                                <div className="pull-left ml-3 mb-3">
                                                    <h6 className="link footer-link" color="info"><Link to="/register">Create Account</Link></h6>
                                                </div>
                                                <div className="pull-right mr-3 mb-3">
                                                    <h6 className="link footer-link" color="info"><Link to="/password/reset">Forgot Password?</Link></h6>
                                                </div>
                                            </div>

                                        </Card>
                                    </div>
                                </Row>
                                <div className="register-bg" />

                            </Container>
                        </div>
                    </div>
                    <Footer />
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        token: state.auth.token,
        detail: state.auth.detail
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (username, password) => dispatch(authLogin(username, password))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
