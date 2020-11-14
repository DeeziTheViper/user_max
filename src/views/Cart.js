
import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/products";
import noUiSlider from "nouislider";
import classnames from "classnames";
import axios from "axios";

// reactstrap components
import {
    Card, CardHeader, CardBody, Row, Col, Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText, Label, Button, CardFooter
} from "reactstrap";

class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            focused: "",
            Pfocused: "",
            lfocused: "",
            amount: "",
            EntValue: "",
            ProValue: "",
            pay: false
        };
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    };
    onFocus = () => {
        this.setState({
            focused: "input-group-focus",

        });
    };
    onBlur = () => {
        this.setState({
            focused: "",
        });
    };

    realTym = (amoun, dolla, userid, pid, addr) => {
        const amount = amoun
        const dollar = dolla
        const socket = new WebSocket(`wss://www.blockonomics.co/payment/${addr}`)
        socket.addEventListener('open', function (event) {

        });
        socket.addEventListener('message', event => {
            const result = JSON.parse(event.data)

            const btcValue = result.value / 100000000
            const txid = result.txid
            const vam = 167377096 / 100000000

            if (btcValue === vam) {

                this.setState({
                    paid: true,
                    load: true
                })
                this.postStatus(userid, pid, txid, dollar)
            }
            if (result.status === 2) {

                setTimeout(() => {
                    this.setState({
                        received: true,
                        load: false
                    })
                    this.updateOrder(txid)
                }, 6000)

            }
        });
        socket.addEventListener('error', err => {
            console.log('Socket is closed. Reconnect will be attempted in 1 second.', err.message);
            setTimeout(amount => {
                this.realTym(amount, dollar)
            }, 10000);
        });
    }
    payment(btc, labe, ms, amoun, userId, id) {
        const amount = encodeURIComponent(btc)
        const label = encodeURIComponent(labe)
        const msg = encodeURIComponent(ms)
        const userid = encodeURIComponent(userId)
        const pid = encodeURIComponent(id)
        const dollar = amoun
        //const qUrl = `https://chart.googleapis.com/chart?chs=225x225&chld=L|2&cht=qr&chl=bitcoin:1MoLoCh1srp6jjQgPmwSf5Be5PU98NJHgx?amount=${amount}%26label=${label}%26message=${msg}`
        const callback = `https://usermax.com/${userid}/${pid}/`
        const res = encodeURIComponent(callback)

        let countDownDate = new Date().getTime() + 15 * 60 * 1000;
        var x = setInterval(() => {

            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            let demo = document.getElementById("demo")
            // Output the result in an element with id="demo"
            if (demo) {
                demo.innerHTML = minutes + "m " + seconds + "s ";
            }
            // If the count down is over, write some text 
            if (distance < 0 & demo) {
                clearInterval(x);
                demo.innerHTML = "EXPIRED";
                this.setState({
                    pay: false
                })
            }
        }, 1000);




        const bAd = '16oLxM4v7WmuxBR7tChvwCMsQVsu63Q76V'
        const qUrl = `https://chart.googleapis.com/chart?chs=225x225&chld=L|2&cht=qr&chl=bitcoin:${bAd}?amount=${amount}&label=${label}%26message=${msg}`
        this.setState({
            url: qUrl,
            pay: true,
            bA: bAd,
            btc: btc,
            amount: amoun,
            loading: true

        }
        )
        this.realTym(amount, dollar, userid, pid, bAd)


        //For Generating new address
        /*
        
        const key = "#####################"
        
        const xub = "#################################3"
        
        const url = `https://api.blockchain.info/v2/receive?xpub=${xub}&callback=${res}&key=${key}`


        axios.get("https://www.blockonomics.co/api/new_address?reset=1", {
             headers: {
                 'Authorization': 'Bearer ' + apikey,
                 'Content-Type': 'application/json'
             }
         })
        axios.get(url)
            .then(res => {
                const bA = res.data.address
                const qUrl = `https://chart.googleapis.com/chart?chs=225x225&chld=L|2&cht=qr&chl=bitcoin:${bA}?amount=${amount}&label=${label}%26message=${msg}`
                console.log(res.data)
                if (res.data) {
                    this.setState({
                        url: qUrl,
                        pay: true,
                        bA: bA,
                        btc: btc,
                        amount: amoun

                    }
                    )
                    const data = { "Content-Type": "text/plain", "key": key, "addr": bA, "callback": "https://mystore.com?invoice_id=123", "onNotification": "DELETE", "op": "RECEIVE", "confs": 5 }

                    axios.defaults.headers = {
                        "Content-Type": "text/plain",
                    }
                    return axios.post('https://api.blockchain.info/v2/receive/balance_update', data)
                        .then(res => {
                            console.log(res.data)
                            console.log('seen')
                        })
                }
            }).catch(err =>
                console.log(err.msg)) */
    }

    postStatus(user_id, id, txid, amount) {
        const { token } = this.props
        const dollar = amount
        const user = {
            customer: user_id,
            product: id,
            amount: dollar,
            txid: txid,
            status: "Pending"
        }
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.post('/userApi/userpost-order/', user)
            .then(res => {
                console.log(res)
            }).catch(err =>
                console.log(err.msg))

    }
    updateOrder(txid) {
        const user = {
            status: "Approved"
        }
        const { token } = this.props
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.put(`/userApi/userupdate-order/?txid=${txid}`, user)
            .then(res => {
                console.log(res)
            }).catch(err =>
                console.log(err.msg))

    }

    DestroyOrder(txid) {

        axios.post(`/userApi/userdestroy-idOrder/?id=${txid}`)
            .then(res => {
                console.log(res)
            }).catch(err =>
                console.log(err.msg))

    }

    starterPay(user_id, id) {

        const amount = this.state.amountV
        const label = "usermax.com"
        const msg = "Silver Plan"
        const uid = user_id
        const pid = id
        axios.defaults.headers = {
            "Content-Type": "application/json",
        }
        axios.get(`https://blockchain.info/tobtc?currency=USD&value=${amount}`)
            .then(res => {
                const btc = res.data
                return this.payment(btc, label, msg, amount, uid, pid)

            }
            ).catch(err =>
                console.log(err.msg))
    }
    LitePay(user_id, id) {
        const amount = this.state.LiteValue
        const label = "usermax.com"
        const msg = "Bronze Plan"
        const uid = user_id
        const pid = id
        axios.defaults.headers = {
            "Content-Type": "application/json",
        }
        axios.get(`https://blockchain.info/tobtc?currency=USD&value=${amount}`)
            .then(res => {
                const btc = res.data
                return this.payment(btc, label, msg, amount, uid, pid)

            }
            ).catch(err =>
                console.log(err.msg))
    }
    ProPay = (user_id, id) => {
        const { pValue } = this.state
        console.log(pValue)
        const label = "usermax.com"
        const msg = "Diamond Plan"
        const uid = user_id
        const pid = id
        axios.defaults.headers = {
            "Content-Type": "application/json",
        }
        axios.get(`https://blockchain.info/tobtc?currency=USD&value=${pValue}`)
            .then(res => {
                const btc = res.data
                return this.payment(btc, label, msg, pValue, uid, pid)

            }
            ).catch(err =>
                console.log(err))
    }
    EntPay(user_id, id) {
        const { EntValue } = this.state
        console.log(EntValue, id)
        const uid = user_id
        const pid = id
        const label = "usermax.com"
        const msg = "Gold Plan"
        axios.get(`https://blockchain.info/tobtc?currency=USD&value=${EntValue}`)
            .then(res => {
                const btc = res.data
                return this.payment(btc, label, msg, EntValue, uid, pid)

            }
            ).catch(err =>
                console.log(err.msg))
    }
    componentDidMount() {
        this.props.getProduct();


        let slider1 = this.refs.slider1;
        let slider2 = this.refs.slider2;
        let slider3 = this.refs.slider3;
        let slider4 = this.refs.slider4;
        let lr = document.getElementById('liteAmount');
        let dr = document.getElementById('amount');
        let pr = document.getElementById('Proamount');
        let er = document.getElementById('EAmount');
        noUiSlider.create(slider1, {
            start: [80],
            connect: [true, false],
            step: 1,
            range: { min: 50, max: 99 }
        },
        );
        noUiSlider.create(slider2, {
            start: [120],
            connect: [true, false],
            step: 1,
            range: { min: 100, max: 150 }
        });
        noUiSlider.create(slider3, {
            start: [170],
            connect: [true, false],
            step: 1,
            range: { min: 150, max: 199 }
        });
        noUiSlider.create(slider4, {
            start: [250],
            connect: [true, false],
            step: 1,
            range: { min: 200, max: 1000000000000 }
        });

        slider1.noUiSlider.on('update', (values, handle) => {
            var value = values[handle];
            let xprofit = (value * (15 / 100)).toFixed(2)
            let profit = (value * (15 / 100)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            let aprofit = (xprofit * 12).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            this.setState({
                amountV: value,
                amount: value.replace(/\d(?=(\d{3})+\.)/g, '$&,'),
                profit: profit,
                aprofit: aprofit
            })
        });
        dr.addEventListener('change', function () {
            slider1.noUiSlider.set([this.value]);
        });

        slider2.noUiSlider.on('update', (values, handle) => {
            var value = values[handle];
            let xprofit = (value * (15 / 100)).toFixed(2)
            let profit = (value * (15 / 100)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            let aprofit = (xprofit * 12).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            this.setState({
                LiteValue: value,
                liteAmount: value.replace(/\d(?=(\d{3})+\.)/g, '$&,'),
                Lprofit: profit,
                lAprofit: aprofit
            })
        });
        lr.addEventListener('change', function () {
            slider2.noUiSlider.set([this.value]);
        });

        slider3.noUiSlider.on('update', (values, handle) => {
            var value = values[handle];
            let xprofit = (value * (15 / 100)).toFixed(2)
            let profit = (value * (15 / 100)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            let aprofit = (xprofit * 12).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            this.setState({
                pValue: value,
                Proamount: value.replace(/\d(?=(\d{3})+\.)/g, '$&,'),
                proProfit: profit,
                AProProfit: aprofit
            })
        });
        pr.addEventListener('change', function () {
            slider3.noUiSlider.set([this.value]);
        });

        slider4.noUiSlider.on('update', (values, handle) => {
            var value = values[handle];
            let xprofit = (value * (15 / 100)).toFixed(2)
            let profit = (value * (15 / 100)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            let aprofit = (xprofit * 12).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            this.setState({
                EntValue: value,
                EAmount: value.replace(/\d(?=(\d{3})+\.)/g, '$&,'),
                Eprofit: profit,
                EAprofit: aprofit
            })


        });
        er.addEventListener('change', function () {
            slider4.noUiSlider.set([this.value]);
        });


    }






    render() {
        const { data, user_id } = this.props;

        const { load, paid, received, bA, amount, profit, aprofit, lAprofit, Lprofit, liteAmount, proProfit, AProProfit, Proamount, EAmount, EAprofit, Eprofit, pay } = this.state;
        const sId = data[0]?.id
        const lid = data[1]?.id
        const pId = data[2]?.id
        const eId = data[3]?.id

        return (
            <>
                <div className="content">

                    <Row>

                        {pay === true ?
                            <Col md="12">
                                <Card>
                                    <CardHeader>

                                    </CardHeader>


                                    <CardBody>
                                        {paid || received === true ?
                                            <div>
                                                <Col style={{ textAlign: "center" }}>
                                                    Payment Recieved
                                                <br />
                                                    <img
                                                        alt="..."
                                                        width="200px"
                                                        height="200px"
                                                        src={require("assets/img/payR.png")}
                                                    /> <i className="tim-icons icon-check-2" style={{ color: "#22b1b1", fontSize: "30px" }} />
                                                    <br />
                                            Awaiting Confirmation
                                            <br />
                                                    {load === true && (<div className="loader loader-1">
                                                        <div className="loader-outter"></div>
                                                        <div className="loader-inner"></div>
                                                    </div>)}
                                                    {received ?
                                                        <div >
                                                            <i className="tim-icons icon-check-2" style={{ color: "#22b1b1", fontSize: "30px" }} />
                                                            <br />
                                    Payment Confirmed
                                    </div>
                                                        :
                                                        <div style={{ opacity: "5%" }}>
                                                            <i className="tim-icons icon-check-2" style={{ color: "#22b1b1", fontSize: "30px" }} />
                                                            <br />
                                            Payment Confirmed
                                            </div>
                                                    }
                                                </Col>
                                            </div>
                                            :
                                            <div>
                                                <Col style={{ textAlign: "center" }}>
                                                    <img
                                                        alt="..."
                                                        className="img-fluid"
                                                        src={this.state.url}

                                                    />
                                                </Col>

                                                <CardFooter style={{ textAlign: "center" }}>
                                                    <p><span style={{ collor: "#f17f2e" }}>scan the QRcode above</span></p>
                                                    <h5>Or Copy the Wallet address below to make Payment</h5>
                                                    <h3 style={{ color: "#2ef1e8" }}>{bA}</h3>
                                                    <small>Awaiting Payment</small>
                                                    <br />
                                                    <Col>
                                                        <div className="loader loader-1">
                                                            <div className="loader-outter"></div>
                                                            <div className="loader-inner"></div>
                                                        </div>
                                                        <p id="demo"></p>
                                                    </Col>
                                                    <small><span>Note: </span>Payment Below <span style={{ color: "#f17f2e" }}>  {this.state.btc}  </span> BTC will not be accepted</small>

                                                    <hr />
                                                    <small style={{ color: "#bbc9d4" }}>If you're on mobile device and you have a wallet, you can </small>
                                                    <Button href={`bitcoin:${bA}?amount=${this.state.btc}&label=usermax.com&message=Dip%20Lite%20Plan`}>Click Here to Pay</Button>
                                                </CardFooter>
                                            </div>
                                        }
                                    </CardBody>
                                </Card>
                            </Col>

                            :
                            <Col md="12">
                                <Card>
                                    <CardHeader>
                                        <h5 className="title">Plans</h5>
                                        <p className="category">
                                            Go for Max {" "}

                                        </p>
                                    </CardHeader>
                                    <CardBody className="all-icons">

                                        <Row>
                                            <Col
                                                className="font-icon-list "
                                                lg="3"
                                                md="3"
                                                sm="3"
                                            >
                                                <div className="font-icon-detail">

                                                    <i className="tim-icons icon-money-coins" style={{ color: "rgb(197 221 230)" }} />
                                                    <p><small style={{ color: "#4cbae4" }}>Silver</small></p>
                                                    <hr />

                                                    <Row>
                                                        <Col md="6">
                                                            <small>Min</small><h4>$50</h4>
                                                        </Col>
                                                        <Col md="6">
                                                            <small>Max</small><h4>$99</h4>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <h5 style={{ color: "cyan" }}> % <small> </small>   </h5>
                                                        </Col>

                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <Label for="amount"><h5 style={{ color: "#525f7f" }}> ${amount}</h5></Label>
                                                            <InputGroup style={{ paddingLeft: "40px", paddingRight: "40px" }} className={this.state.focused}>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>
                                                                        <i className="tim-icons icon-pencil" />
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input
                                                                    type="number"
                                                                    max={50}
                                                                    min={99}
                                                                    placeholder={amount}
                                                                    ref="amount"
                                                                    id="amount"
                                                                    onInput={this.handleChange}

                                                                    onFocus={this.onFocus}
                                                                    onBlur={this.onBlur}
                                                                />
                                                            </InputGroup>

                                                        </Col>

                                                    </Row>
                                                    <Row>
                                                        <Col style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                                                            <div className="slider slider-info mb-3" ref="slider1" id="rangesliderPP" />
                                                        </Col>
                                                    </Row>
                                                    <hr />
                                                    <Row>
                                                        <Col md="6">
                                                            <small>Monthly Profit</small>
                                                            <h5>${profit}</h5>

                                                        </Col>
                                                        <Col md="6">
                                                            <small>Annual Profit</small>
                                                            <h5>${aprofit}</h5>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                                                            <hr />
                                                            <span>Pay ${amount}</span>
                                                            <Button
                                                                className="btn-simple btn-icon btn-round float-right"
                                                                color="primary"
                                                                type="submit"
                                                                onClick={e =>
                                                                    this.starterPay(user_id, sId)}
                                                            >
                                                                <i className="tim-icons icon-send" />
                                                            </Button>

                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                            <Col
                                                className="font-icon-list "
                                                lg="3"
                                                md="3"
                                                sm="3"
                                            >
                                                <div className="font-icon-detail">
                                                    <i className="tim-icons icon-money-coins" style={{ color: "rgb(197 221 230)" }} />
                                                    <p><small style={{ color: "#4cbae4" }} >Bronze</small ></p>
                                                    <hr />
                                                    <Row>
                                                        <Col md="6">
                                                            <small>Min</small><h4>$100</h4>
                                                        </Col>
                                                        <Col md="6">
                                                            <small>Max</small><h4>$150</h4>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <h5 style={{ color: "cyan" }}> % <small> Return</small>   </h5>
                                                        </Col>

                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <Label for="liteAmount"><h5 style={{ color: "#525f7f" }}> ${liteAmount}</h5></Label>
                                                            <InputGroup style={{ paddingLeft: "40px", paddingRight: "40px" }} className={classnames({
                                                                "input-group-focus": this.state.lfocused
                                                            })}>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>
                                                                        <i className="tim-icons icon-pencil" />
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input
                                                                    type="number"
                                                                    max={100}
                                                                    min={150}
                                                                    placeholder={liteAmount}
                                                                    ref="liteAmount"
                                                                    id="liteAmount"
                                                                    onInput={this.handleChange}

                                                                    onFocus={e => this.setState({ lfocused: true })}
                                                                    onBlur={e => this.setState({ lfocused: false })}
                                                                />
                                                            </InputGroup>

                                                        </Col>

                                                    </Row>
                                                    <Row>
                                                        <Col style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                                                            <div className="slider slider-secondary mb-3" ref="slider2" id="slider2" />
                                                        </Col>
                                                    </Row>
                                                    <hr />
                                                    <Row>
                                                        <Col md="6">
                                                            <small>Monthly Profit</small>
                                                            <h5>${Lprofit}</h5>

                                                        </Col>
                                                        <Col md="6">
                                                            <small>Annual Profit</small>
                                                            <h5>${lAprofit}</h5>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                                                            <hr />
                                                            <span>Pay ${liteAmount}</span>
                                                            <Button
                                                                className="btn-simple btn-icon btn-round float-right"
                                                                color="primary"
                                                                type="submit"
                                                                onClick={e =>
                                                                    this.LitePay(user_id, lid)}
                                                            >
                                                                <i className="tim-icons icon-send" />
                                                            </Button>

                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>

                                            <Col
                                                className="font-icon-list "
                                                lg="3"
                                                md="3"
                                                sm="3"
                                            >
                                                <div className="font-icon-detail">

                                                    <i className="tim-icons icon-money-coins" style={{ color: "rgb(197 221 230)" }} />
                                                    <p><small style={{ color: "#4cbae4" }}>Diamond</small></p>
                                                    <hr />

                                                    <Row>
                                                        <Col md="6">
                                                            <small>Min</small><h4>$150</h4>
                                                        </Col>
                                                        <Col md="6">
                                                            <small>Max</small><h4>$200</h4>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <h5 style={{ color: "cyan" }}> % <small> Return</small>   </h5>
                                                        </Col>

                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <Label for="Proamount"><h5 style={{ color: "#525f7f" }}> ${Proamount}</h5></Label>
                                                            <InputGroup style={{ paddingLeft: "40px", paddingRight: "40px" }} className={classnames({
                                                                "input-group-focus": this.state.Pfocused
                                                            })}>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>
                                                                        <i className="tim-icons icon-pencil" />
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input
                                                                    type="number"
                                                                    max={150}
                                                                    min={200}
                                                                    placeholder={Proamount}
                                                                    ref="Proamount"
                                                                    id="Proamount"
                                                                    onInput={this.handleChange}

                                                                    onFocus={e => this.setState({
                                                                        Pfocused: true
                                                                    })}
                                                                    onBlur={e => this.setState({
                                                                        Pfocused: false
                                                                    })}
                                                                />
                                                            </InputGroup>

                                                        </Col>

                                                    </Row>
                                                    <Row>
                                                        <Col style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                                                            <div className="slider slider-info mb-3" ref="slider3" id="slider3" />
                                                        </Col>
                                                    </Row>
                                                    <hr />
                                                    <Row>
                                                        <Col md="6">
                                                            <small>Monthly Profit</small>
                                                            <h5>${proProfit}</h5>

                                                        </Col>
                                                        <Col md="6">
                                                            <small>Annual Profit</small>
                                                            <h5>${AProProfit}</h5>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                                                            <hr />
                                                            <span>Pay ${Proamount}</span>
                                                            <Button
                                                                className="btn-simple btn-icon btn-round float-right"
                                                                color="primary"
                                                                type="submit"
                                                                onClick={e =>
                                                                    this.ProPay(user_id, pId)}
                                                            >
                                                                <i className="tim-icons icon-send" />
                                                            </Button>

                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                            <Col
                                                className="font-icon-list "
                                                lg="3"
                                                md="3"
                                                sm="3"
                                            >
                                                <div className="font-icon-detail">
                                                    <i className="tim-icons icon-money-coins" style={{ color: "rgb(197 221 230)" }} />
                                                    <p><small style={{ color: "#4cbae4" }} >Gold</small ></p>
                                                    <hr />
                                                    <Row>
                                                        <Col md="6">
                                                            <small>Min</small><h4>$200</h4>
                                                        </Col>
                                                        <Col md="6">
                                                            <small>Max</small><h4>$ oo</h4>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <h5 style={{ color: "cyan" }}> % <small> Return</small>   </h5>
                                                        </Col>

                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <Label for="EAmount"><h5 style={{ color: "#525f7f" }}> ${EAmount}</h5></Label>
                                                            <InputGroup style={{ paddingLeft: "40px", paddingRight: "40px" }} className={classnames({
                                                                "input-group-focus": this.state.Efocused
                                                            })}>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>
                                                                        <i className="tim-icons icon-pencil" />
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input
                                                                    type="number"
                                                                    max={250}
                                                                    min={100000}
                                                                    placeholder={EAmount}
                                                                    ref="EAmount"
                                                                    id="EAmount"
                                                                    onInput={this.handleChange}

                                                                    onFocus={e => this.setState({ Efocused: true })}
                                                                    onBlur={e => this.setState({ Efocused: false })}
                                                                />
                                                            </InputGroup>

                                                        </Col>

                                                    </Row>
                                                    <Row>
                                                        <Col style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                                                            <div className="slider slider-secondary mb-3" ref="slider4" id="slider4" />
                                                        </Col>
                                                    </Row>
                                                    <hr />
                                                    <Row>
                                                        <Col md="6">
                                                            <small>Monthly Profit</small>
                                                            <h5>${Eprofit}</h5>

                                                        </Col>
                                                        <Col md="6">
                                                            <small>Annual Profit</small>
                                                            <h5>${EAprofit}</h5>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                                                            <hr />
                                                            <span>Pay ${EAmount}</span>
                                                            <Button
                                                                className="btn-simple btn-icon btn-round float-right"
                                                                color="primary"
                                                                type="submit"
                                                                onClick={e =>
                                                                    this.EntPay(user_id, eId)}
                                                            >
                                                                <i className="tim-icons icon-send" />
                                                            </Button>

                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>

                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        }
                    </Row>

                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: state.products.products,
        loading: state.loading,
        user_id: state.auth.userId,
        token: state.auth.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProduct: () => dispatch(actions.getProduct())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
