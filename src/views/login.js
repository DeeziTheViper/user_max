
import React from "react";
import classnames from "classnames";
import { authLogin } from "../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";

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
import { Redirect, Link } from "react-router-dom";


const LoginPage = () => {
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
        emailFocus: "",
        errors: '',
        passwordFocus: ''
    })

    const [square, setSquare] = React.useState({
        squares1to6: "",
        squares7and8: "",
    })
    const dispatch = useDispatch()
    const loading = useSelector(state => state.auth.loading)
    const detail = useSelector(state => state.auth.detail)
    const token = useSelector(state => state.auth.token)
    const error = useSelector(state => state.auth.error)

    const { email, password, errors, emailFocus, passwordFocus } = formData
    const { squares1to6, squares7and8 } = square

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleEmail = e => {
        setFormData({ ...formData, emailFocus: false })
        let errors = {};
        let formIsValid = true;
        //Email
        if (!email) {
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        }
        setFormData({ ...formData, errors: errors });
        return formIsValid;
    }

    const handlePass = e => {
        setFormData({ ...formData, passwordFocus: false })
        let errors = {};
        let formIsValid = true;
        if (!password) {
            formIsValid = false;
            errors["password"] = "Input Password"
        }

        setFormData({ ...formData, errors: errors });
        return formIsValid;
    }

    const checkform = () => {
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

        setFormData({ ...formData, errors: errors });
        return formIsValid;

    }



    const onSubmit = e => {
        e.preventDefault();
        if (checkform()) {
            dispatch(authLogin(email, password))
        }
    };

    const followCursor = event => {
        let posX = event.clientX - window.innerWidth / 2;
        let posY = event.clientY - window.innerWidth / 6;
        setSquare({
            ...square,
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

    React.useEffect(() => {
        document.body.classList.toggle("register-page");
        document.documentElement.addEventListener("mousemove", followCursor);
        return () => {
            document.body.classList.toggle("register-page");
            document.documentElement.removeEventListener(
                "mousemove",
                followCursor
            );
        }
    }, [])

    if (token !== null) {
        return <Redirect to="/user" />
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
                                style={{ transform: squares7and8 }}
                            />
                            <div
                                className="square square-8"
                                id="square8"
                                style={{ transform: squares7and8 }}
                            />
                            <Row>
                                <div className="mx-auto col-md-8 col-lg-5" >

                                    <Card className="card-register">
                                        <CardHeader>
                                        </CardHeader>
                                        <h6 className="card-title" style={{ textAlign: 'center' }}>Login</h6>

                                        <CardBody>
                                            {error ?
                                                <Alert color="danger">{error && <p>{error.detail}</p>}</Alert>
                                                :
                                                null
                                            }
                                            {detail ?
                                                <Alert color="danger" ><p>{detail.detail}</p></Alert>

                                                : null}
                                            <Form className="form" onSubmit={onSubmit}>
                                                <Label for="error" className="control-label">{errors["email"]}</Label>

                                                <InputGroup
                                                    className={errors["email"] ? "has-danger" : classnames({
                                                        "input-group-focus": emailFocus
                                                    })}>
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="tim-icons icon-email-85" />
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                        onChange={e => handleChange(e)}
                                                        value={email}
                                                        name="email"
                                                        placeholder="Email"
                                                        type="text"
                                                        onFocus={e => setFormData({ ...formData, emailFocus: true })}
                                                        onBlur={e => handleEmail(e)}
                                                        style={{ cursor: "text" }}
                                                    />
                                                </InputGroup>
                                                <Label for="error" className="control-label">{errors["password1"]}</Label>
                                                <InputGroup
                                                    className={errors["password"] ? "has-danger" : classnames({
                                                        "input-group-focus": passwordFocus
                                                    })}
                                                >
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="tim-icons icon-lock-circle" />
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                        onChange={e => handleChange(e)}
                                                        value={password}
                                                        name="password"
                                                        placeholder="Password"
                                                        type="password"
                                                        onFocus={e =>
                                                            setFormData({ ...formData, passwordFocus: true })
                                                        }
                                                        onBlur={
                                                            handlePass
                                                        }
                                                        style={{ cursor: "text" }}
                                                    />
                                                </InputGroup>
                                            </Form>
                                        </CardBody>


                                        <div className="text-center card-footer">

                                            {
                                                loading ?
                                                    <div className="loader loader-1">
                                                        <div className="loader-outter"></div>
                                                        <div className="loader-inner"></div>
                                                    </div>
                                                    :

                                                    <Button className="btn-round btn btn-primary btn-lg btn-block" onClick={onSubmit}>
                                                        Login
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


export default LoginPage
