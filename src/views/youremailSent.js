
import React from "react";
import axios from "axios";
import classnames from "classnames";

// reactstrap components
import {
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

class EmailSent extends React.Component {
    state = {
        email: "",
        detail: null,
        errors: {}

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


    checkform() {
        let { email } = this.state;
        let errors = {};
        let formIsValid = true;
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


    componentDidMount() {
        document.body.classList.toggle("register-page");
        document.documentElement.addEventListener("mousemove", this.followCursor);
        if (localStorage.key("account")) {
            let user = JSON.parse(localStorage.getItem("account"));
            if (user) {
                if (user.email) {
                    this.setState({ email: user.email })
                }
            }
        }
    }
    onSubmit = e => {
        e.preventDefault();

        if (this.checkform()) {
            const { email } = this.state;
            this.setState({ loading: true })
            axios.post('/resend-verification-email/', {
                email: email
            }

            ).then((res) => {
                this.setState({
                    detail: res.data.detail,
                    loading: false,


                })

            }).catch(err => {

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
        const { email, loading } = this.state;

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

                                        <h4 style={{ color: "rgb(54, 158, 120)" }}>Email Confirmation Link Sent.. Check your inbox</h4>

                                        <div>
                                            <hr />
                                            <h5 style={{ color: "rgb(101, 152, 187)" }} >Didn't get the link? Resend!</h5>
                                        </div>

                                        {this.state.redirect ?
                                            <p style={{ textAlign: 'center', color: "#00bf81" }} >Redirecting to Login....</p>
                                            :
                                            <div>
                                                {this.state.detail ?
                                                    <Alert color="info"> <p>{this.state.detail}</p></Alert>
                                                    :
                                                    null
                                                }
                                                <Form className="form" id="myForm" onSubmit={this.onSubmit}>
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
                                                            placeholder={
                                                                this.state.errors["email"] ?
                                                                    this.state.errors['email']
                                                                    :
                                                                    "Email"
                                                            }
                                                            type="text"
                                                            onFocus={e => this.setState({ emailFocus: true })}
                                                            onBlur={this.handleEmail}
                                                        />
                                                    </InputGroup>

                                                </Form>
                                            </div>
                                        }



                                        <div className="text-center">
                                            {loading ?

                                                <div className="loader loader-1">
                                                    <div className="loader-outter"></div>
                                                    <div className="loader-inner"></div>
                                                </div>
                                                :

                                                <Button className="btn-round btn btn-secondary btn-lg btn-block" onClick={this.onSubmit}>
                                                    Resend Confirmation Link
                                                        </Button>

                                            }
                                        </div>
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


export default EmailSent;
