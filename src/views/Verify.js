
import React from "react";
import axios from "axios";
// reactstrap components

// core components
import ExamplesNavbar from "components/Navbars/IndexNav.js";
import { Redirect, useParams, Link } from "react-router-dom";
import {
    CardBody, Button
} from "reactstrap";
function VerifyPage() {
    const [loading, setLoad] = React.useState(false)
    const [detail, setDetail] = React.useState(null)
    const [valid, setValid] = React.useState(null)
    const [redirect, setRedirect] = React.useState(null)
    let { token } = useParams()

    React.useEffect(() => {
        const user = {
            key: token
        }
        setLoad(true)
        axios.post('/account-confirm-email/', user)
            .then(response => {
                if (response.status === 200) {
                    setValid(true)
                    setLoad(true)

                    localStorage.setItem("Email", 1)
                    setTimeout(() => {
                        setRedirect(true)
                    }, 5000)
                } else {
                    setValid(false)
                    setLoad(false)
                }
            }).catch(err => {
                setValid(false)
                setLoad(false)
            })
    }, []);



    if (valid === true && redirect) {
        return <Redirect to="/login-page" />;
    }

    return (
        <>
            <ExamplesNavbar />

            <div className="wrapper">
                <div className="page-header">

                    <div className="content-center brand">
                        <CardBody>
                            {valid === true && (
                                <div>

                                    <div className="alert alert-success" role="alert">
                                        Email Verification Done
                                        <p><small>Redirecting to Login Page....</small></p>
                                    </div>
                                </div>
                            )
                            }
                            {valid === false && (
                                <div>

                                    <div class="alert alert-danger" role="alert">
                                        <h>Email Verification Failed. Email may be already verified or the link is broken.</h>
                                    </div>
                                    <Button color="info" to="/login-page" tag={Link}>Login</Button>

                                </div>
                            )}


                            {loading && (

                                <div className="loader loader-1">
                                    <div className="loader-outter"></div>
                                    <div className="loader-inner"></div>
                                </div>
                            )
                            }
                        </CardBody>
                    </div>


                </div>
            </div>

        </>
    );
}
export default VerifyPage;
