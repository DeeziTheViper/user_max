import React from "react";
import { connect } from "react-redux";
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

class Compound extends React.Component {

    state = {
        amount: "",
        duration: ""
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onBlur = e => {
        this.setState({
            focused: ""
        })
    }
    onFocus = () => {
        this.setState({
            focused: "input-group-focus"
        })
    }


    compound() {
        const { username, token } = this.props
        const { amount, duration } = this.state
        const user = {
            "active": true,
            "duration": duration,
            "amount": amount,
            "user": username
        }
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.post('/userApi/usercompound-id/', user)
            .then(res => {
                console.log(res.data)
                this.setState({
                    active: true
                })
            })
    }

    componentDidMount() {
        this.props.checkstate()
        if (this.props.token !== undefined && this.props.token !== null) {
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${this.props.token}`
            }
            axios.get(`/userApi/usercompounds?username=${this.props.user}`)
                .then(res => {
                    const dura = moment(res.data[res.data.length - 1].date_request).add(res.data[res.data.length - 1].duration, 'months').calendar()
                    this.setState({ status: res.data[res.data.length - 1].active, duration: dura, period: res.data[res.data.length - 1].duration, start: res.data[res.data.length - 1].date_request })
                })
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${this.props.token}`
            }
            axios.get('/rest-auth/user/')
                .then(res => {
                    this.setState({ balance: res.data.account_balance })

                })

        }
        const roi = ""
        if (this.props.accountB !== undefined || null) {
            const accountB = this.props.accountB
            let roi = ""
            if (accountB < 250) {
                roi = 0
            }
            else if (accountB < 5000) {
                roi = 15
            }
            else if (accountB < 20000) {
                roi = 18
            }
            else if (accountB < 100000) {
                roi = 25
            }
            else {
                roi = 35
            }
        }
        let slider1 = this.refs.slider1
        let dr = document.getElementById('amount');

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
            let aprofit = Math.pow((1 + (roi / 100) / value), value)
            let profit = aprofit.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            this.setState({
                amount: valuex,
                profit: profit
            })
        });
        dr.addEventListener('change', function () {
            slider1.noUiSlider.set([this.value]);
        });
    }
    render() {
        const { amount, balance, status, duration, period, start } = this.state

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
                                                Duration: <span style={{ color: "#22cccc" }}>{" "} {moment(start).format('MMMM Do YYYY')}{" "} - {" "}{moment(duration).format('MMMM Do YYYY')}</span>
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
                                        {this.state.active ?
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
                                                    <InputGroup style={{ paddingLeft: "40%", paddingRight: "40%" }} className={this.state.focused}>
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="tim-icons icon-pencil" />
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            type="number"
                                                            max={12}
                                                            min={6}
                                                            placeholder={amount}
                                                            ref="amount"
                                                            id="amount"
                                                            onInput={this.handleChange}

                                                            onFocus={this.onFocus}
                                                            onBlur={this.onBlur}
                                                        />
                                                    </InputGroup>
                                                    <Label for="amount"><h5 style={{ color: "#525f7f" }}> {amount} months compounding period</h5></Label>

                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col style={{ paddingLeft: "30%", paddingRight: "30%" }}>
                                                    <div className="slider slider-info mb-3" ref="slider1" id="rangesliderPP" />
                                                </Col>
                                            </Row>
                                        </CardBody>
                                        <Row>
                                            <Col>
                                                <small>Note: You can't withdraw during compounding period</small><br />
                                                <Button onClick={e => this.compound()}>Compound</Button>
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
}
const mapStateToProps = state => {
    return {
        username: state.auth.userId,
        user: state.auth.username,
        token: state.auth.token,
        orders: state.orders.orders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        checkstate: () => dispatch(authCheckState())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Compound);
