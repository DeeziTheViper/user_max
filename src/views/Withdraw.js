import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import * as statactions from "../store/actions/stats";

import {
    Card, CardHeader, CardBody, Row, Col, CardTitle, Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText, Label, Button, UncontrolledAlert
} from "reactstrap";



const Withdraw = () => {
    const dispatch = useDispatch()


    const [focused, setFocused] = useState()
    const [amount, setAmount] = useState(0)
    const [active, setActive] = useState(false)
    const token = useSelector(state => state.auth.token)
    const userid = useSelector(state => state.auth.userId)
    const username = useSelector(state => state.auth.username)
    dispatch(statactions.getStat(username, token))
    const roic = useSelector(state => state.stats.roic)

    const slider1 = useRef()
    const dr = useRef();
    const handleChange = e => {
        setAmount(e.target.value)
        /*slider1.current.noUiSlider.set([e.target.value]);*/
    }

    const onBlur = e => {
        setFocused("")
    }
    const onFocus = () => {
        setFocused("input-group-focus"
        )
    }




    /*useEffect(() => {





        const start = roic / 2


        noUiSlider.create(slider1.current, {
            start: [start],
            connect: [true, false],
            step: 1,
            range: { min: 0, max: roic }
        },
        );

        slider1.current.noUiSlider.on('update', (values, handle) => {
            var value = (values[handle]);
            setAmount(
                value
            )
        });


    }, [roic])*/




    const withdraw = () => {

        const user = {
            "user": userid,
            "amount": amount,
            "status": "Pending",
        }
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.post('/listApi/payout-now/', user)
            .then(res => {
                setActive(
                    true
                )
            })
    }

    return (
        <>

            <div className="content">
                <Row>
                    <Col>
                        <Card >
                            <CardHeader>
                                <CardTitle tag="h4" >
                                    Liquidate
                            </CardTitle>
                                {active ?
                                    <UncontrolledAlert color="success">
                                        <span>
                                            <b>Success - </b>
                      Your Withdrawal will be processed
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
                                            <p>Withdraw your Interests</p>
                                            <small style={{ color: "darkcyan" }}>BTC will be be sent to your default or provided wallet address</small>
                                        </Col>
                                    </Row>

                                    <Row >
                                        <Col >
                                            <hr />
                                                Available Balance: <span style={{ color: "#22cccc" }}>${roic}</span>
                                        </Col>
                                    </Row>
                                    <Row>

                                        <Col>
                                            <br />
                                            <InputGroup style={{ paddingLeft: "40%", paddingRight: "40%" }} className={focused}>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="tim-icons icon-wallet-43" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    type="number"
                                                    max={12}
                                                    min={6}
                                                    placeholder={amount}
                                                    ref={dr}

                                                    onChange={e => handleChange(e)}

                                                    onFocus={e => onFocus()}
                                                    onBlur={e => onBlur()}
                                                />
                                            </InputGroup>
                                            <Label for="amount"><h5 style={{ color: "#525f7f" }}> Withdraw $ {amount}</h5></Label>

                                        </Col>

                                    </Row>

                                </CardBody>
                                <Row>
                                    <Col>
                                        <small>All coins are stored in cold storages, your withdraw will be completed within a 24hours window </small><br />
                                        <Button onClick={e => withdraw()}>Withdraw</Button>
                                    </Col>
                                </Row>
                            </Card>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}



export default Withdraw;
