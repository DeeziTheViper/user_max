
import React from "react";
import axios from "axios";
import classnames from "classnames";

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
    Row,
    Alert,
    Button,
    Container,
    Label
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/IndexNav.js";
import { Redirect, } from "react-router-dom";
class PassReset extends React.Component {
    state = {
        password: "",
        password2: "",
        detail: null,
        errors: {},

    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
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

        if (typeof password !== "undefined") {
            if (!password.match(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/)) {
                formIsValid = false;
                errors["password"] = "Password must contain at least one letter,number, and be longer than six charaters.";
            }
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    confirmpassword = e => {
        this.setState({ password2Focus: false })
        let { password, password2 } = this.state;
        let errors = {};
        let formIsValid = true;

        if (!password2.match(password)) {
            formIsValid = false
            errors["password2"] = "Passwords do not match"
        }
        this.setState({ errors: errors });
        return formIsValid;
    }


    checkform() {
        let { password, password2 } = this.state;
        let errors = {};
        let formIsValid = true;
        if (!password) {
            formIsValid = false;
            errors["password"] = "Input Password"
        }

        if (typeof password !== "undefined") {
            if (!password.match(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/)) {
                formIsValid = false;
                errors["password"] = "Password must contain at least one letter,number, and be longer than six charaters.";
            }
        }

        if (!password2.match(password)) {
            formIsValid = false
            errors["password2"] = "Passwords do not match"
        }

        this.setState({ errors: errors });
        return formIsValid;

    }


    async componentDidMount() {
        document.body.classList.toggle("register-page");
        document.documentElement.addEventListener("mousemove", this.followCursor);
        const token = this.props.match.params.token
        const uid = this.props.match.params.uid
        if (token && uid) {
            this.setState({ token: this.props.match.params.token, uid: uid })


        }
    }
    onSubmit = e => {
        e.preventDefault();

        if (this.checkform()) {
            const { password, password2, token, uid, } = this.state;
            this.setState({ loading: true })
            axios.post('/rest-auth/password/reset/confirm/', {
                new_password1: password,
                new_password2: password2,
                uid: uid,
                token: token,
            }

            ).then((res) => {
                if (res.status === 200) {
                    this.setState({
                        detail: res.data.detail,
                        loading: false,


                    })
                    setTimeout(() => {
                        this.setState({
                            info: true,
                            loading: true
                        })
                    }, 2000)
                    setTimeout(() => {
                        this.setState({
                            redirect: true,
                            loading: true
                        })
                    }, 5000)
                }
                console.log(res)
            }).catch(err => {
                console.log(err);
                setTimeout(() => {
                    this.setState({
                        detail: "Link Broken", loading: false
                    })
                }, 2000)

            })
        }
        else {
            this.checkform()
        }
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
        const { loading, password, password2 } = this.state;
        if (this.state.redirect) {
            return <Redirect to="/login-page" />;
        }


        return (
            <>
                <ExamplesNavbar />

                <div className="wrapper">
                    <div className="page-header">
                        <div className="page-header-image" />
                        <div className="content">
                            <Container>
                                <Row>
                                    <div className="mx-auto col-md-8 col-lg-5" >

                                        <Card className="card-register">
                                            <CardHeader>
                                            </CardHeader>
                                            <h6 className="card-title" style={{ textAlign: 'center' }}>Password Reset</h6>


                                            <CardBody>
                                                {this.state.info ?
                                                    <p style={{ textAlign: 'center', color: "#00bf81" }} >Redirecting to Login....</p>
                                                    :
                                                    <div>
                                                        {this.state.detail ?
                                                            <Alert color="info"> <p>{this.state.detail}</p></Alert>
                                                            :
                                                            null
                                                        }
                                                        <Form className="form" id="myForm" onSubmit={this.onSubmit}>
                                                            <Label for="error" className="control-label">{this.state.errors["password"]}</Label>

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
                                                                    placeholder="New Password"
                                                                    type="password"
                                                                    onFocus={e =>
                                                                        this.setState({ passwordFocus: true })
                                                                    }
                                                                    onBlur={
                                                                        this.handlePass
                                                                    }
                                                                />
                                                            </InputGroup>
                                                            <Label for="error" className="control-label">{this.state.errors["password2"]}</Label>
                                                            <InputGroup
                                                                className={this.state.errors["password2"] ? "has-danger" : classnames({
                                                                    "input-group-focus": this.state.password2Focus
                                                                })}
                                                            >
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>
                                                                        <i className="tim-icons icon-lock-circle" />
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input
                                                                    onChange={this.handleChange}
                                                                    value={password2}
                                                                    name="password2"
                                                                    placeholder="Confirm Password"
                                                                    type="password"
                                                                    onFocus={e =>
                                                                        this.setState({ password2Focus: true })
                                                                    }
                                                                    onBlur={
                                                                        this.confirmpassword
                                                                    }
                                                                />
                                                            </InputGroup>
                                                        </Form>
                                                    </div>
                                                }
                                            </CardBody>


                                            <div className="text-center card-footer">
                                                {loading ?

                                                    <div className="loader loader-1">
                                                        <div className="loader-outter"></div>
                                                        <div className="loader-inner"></div>
                                                    </div>
                                                    :

                                                    <Button className="btn-round btn btn-secondary btn-lg btn-block" onClick={this.onSubmit}>
                                                        Reset
                                                        </Button>

                                                }
                                            </div>
                                        </Card>
                                    </div>
                                </Row>
                            </Container>
                        </div>


                    </div>
                </div>

            </>
        );
    }
}


export default PassReset;
