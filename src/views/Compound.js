import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import moment from 'moment';
import {
    Card, CardHeader, CardBody, Row, Col, CardTitle, Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText, Label, Button, UncontrolledAlert
} from "reactstrap";
import { authCheckState } from "../store/actions/auth";
import noUiSlider from "nouislider";

const Compound = () => {
    const dispatch = useDispatch()
    const [duration, setDuration] = React.useState("")
    const username = useSelector(state => state.auth.username)
    const userId = useSelector(state => state.auth.userId)
    const token = useSelector(state => state.auth.token)
    const [focused, setFocused] = React.useState("")
    const [active, setActive] = React.useState(false)
    const [balance, setBalance] = React.useState("")
    const [status, setStatus] = React.useState("")
    const [period, setPeriod] = React.useState("")
    const [durationEnd, setDura] = React.useState("")
    const [start, setStart] = React.useState("")
    const [load, setLoad] = React.useState(false)


    const onBlur = e => {
        setFocused("")
    }
    const onFocus = () => {

        setFocused("input-group-focus")

    }


    const compound = () => {
        setLoad(true)
        const user = {
            "active": true,
            "duration": duration,
            "amount": balance,
            "user": userId
        }
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.post('/listApi/compound-id/', user)
            .then(res => {
                setActive(true)
                setLoad(false)
            }).catch(err => {
                setLoad(false)
            })
    }

    React.useEffect(() => {
        dispatch(authCheckState())
        if (token) {
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
            axios.get(`/listApi/compounds?username=${username}`)
                .then(res => {
                    const dEnd = moment(res.data[res.data.length - 1].date_request).add(res.data[res.data.length - 1].duration, 'months').calendar()

                    setStatus(res.data[res.data.length - 1].active)
                    setDura(dEnd)
                    setPeriod(res.data[res.data.length - 1].duration)
                    setStart(res.data[res.data.length - 1].date_request)
                })
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
            axios.get('/rest-auth/user/')
                .then(res => {
                    setBalance(res.data.account_balance)
                })

        }

        let dr = document.getElementById('amount');
        const slider1 = document.getElementById('rangesliderPP');

        noUiSlider.create(slider1, {
            start: [7],
            connect: [true, false],
            step: 1,
            range: { min: 6, max: 12 }
        },
        );
        slider1.noUiSlider.on('update', (values, handle) => {
            var value = (values[handle]);
            let valuex = Math.trunc(value)

            setDuration(valuex)
        });
        dr.addEventListener('change', function () {
            slider1.noUiSlider.set([this.value]);
        });

    }, [])



    return (
        <>
            <div className="content">
                {status === true ?
                    <Row>
                        <Col>
                            <Card >
                                <CardHeader>
                                    <CardTitle tag="h4" >
                                        Compounding
                            </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Row >
                                        <Col >
                                            <hr />
                                                Status: <span style={{ color: "#22cccc" }}>{" "}{status === true ? "Active" : "Pending"}</span>
                                        </Col>
                                    </Row>
                                    <Row >
                                        <Col >
                                            <hr />
                                                Compounding Period: <span style={{ color: "#22cccc" }}>{" "}{period} Months</span>
                                        </Col>
                                    </Row>
                                    <Row >
                                        <Col >
                                            <hr />
                                                Duration: <span style={{ color: "#22cccc" }}>{" "} {moment(start).format('MMMM Do YYYY')}{" "} - {" "}{moment(durationEnd).format('MMMM Do YYYY')}</span>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    :
                    <Row>
                        <Col>
                            <Card >
                                <CardHeader>
                                    <CardTitle tag="h4" >
                                        Compound Your Interests
                            </CardTitle>
                                    <hr />
                                    {active ?
                                        <UncontrolledAlert color="success">
                                            <span>
                                                <b>Success - </b>
                     Compounding Activated
                    </span>
                                        </UncontrolledAlert>
                                        :
                                        null
                                    }
                                </CardHeader>
                                <Card style={{ textAlign: "center" }}>
                                    <CardBody>
                                        <Row>
                                            <Col>
                                                <p>Chose your compounding period</p>
                                                <small style={{ color: "darkcyan" }}>your interests will be rolled over and added to your trading power</small>


                                            </Col>
                                        </Row>

                                        <Row >
                                            <Col >
                                                <hr />
                                                Starting Balance: <span style={{ color: "#22cccc" }}>${balance}</span>
                                            </Col>
                                        </Row>
                                        <Row>

                                            <Col>
                                                <br />
                                                <InputGroup style={{ paddingLeft: "10%", paddingRight: "10%" }} className={focused}>
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="tim-icons icon-pencil" />
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                        type="number"
                                                        max={12}
                                                        min={6}
                                                        placeholder={duration}

                                                        id="amount"
                                                        onChange={e => setDuration(e.target.value)}
                                                        onFocus={() => onFocus()}
                                                        onBlur={() => onBlur()}
                                                    />
                                                </InputGroup>
                                                <Label for="amount"><h5 style={{ color: "#525f7f" }}> {duration} months compounding period</h5></Label>

                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col style={{ paddingLeft: "30%", paddingRight: "30%" }}>
                                                <div className="slider slider-info mb-3" id="rangesliderPP" />
                                            </Col>
                                        </Row>
                                    </CardBody>
                                    <Row>
                                        <Col>
                                            <small>Note: You can't withdraw during compounding period</small><br />
                                            {load === true ?
                                                <div className="loader loader-1">
                                                    <div className="loader-outter"></div>
                                                    <div className="loader-inner"></div>
                                                </div>
                                                :
                                                <Button onClick={e => compound()}>Compound</Button>
                                            }
                                        </Col>
                                    </Row>
                                </Card>
                            </Card>
                        </Col>
                    </Row>
                }
            </div>
        </>
    )
}


export default Compound;
