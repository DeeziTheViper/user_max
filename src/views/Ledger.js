
import React, { useState, useEffect } from "react";
// react plugin used to create google maps
import { useSelector } from "react-redux";

import axios from "axios";

// reactstrap components
import { TabContent, TabPane, Nav, Table, NavItem, NavLink, Card, CardHeader, CardBody, Row, Col, CardTitle, } from "reactstrap";
import classnames from 'classnames';




const Ledger = () => {
    const token = useSelector(state => state.auth.token);
    const [activeTab, setActiveTab] = useState('1');
    const [pending, setPending] = useState([]);
    const [approved, setApproved] = useState([])
    const [earnings, setEarn] = useState([])
    const username = useSelector(state => state.auth.username);
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }


    useEffect(() => {
        if (token !== undefined && token !== null) {


            axios.get(`/userApi/userhistory?username=${username}`)
                .then(res => {
                    for (const x of res.data) {
                        for (const y of x.history.reverse()) {
                            setEarn(earn => [...earn, y])
                        }
                    }
                }).catch(err =>
                    console.log(err))

            axios.get(`/userApi/userwithdrawals/?username=${username}`)
                .then(res => {
                    for (const x of res.data) {
                        if (x.status === "Pending") {
                            setPending(pending => [...pending, x])
                        }
                        if (x.status === "Approved") {
                            setApproved(approved => [...approved, x])
                        }
                    }

                })



        }
    }, [token, username])


    return (

        <>
            <div className="content">
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <CardTitle></CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '1' })}
                                            onClick={() => { toggle('1'); }}
                                        >
                                            <span style={{ cursor: "grab", color: "rgb(6 212 164)" }}>Earnings</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '2' })}
                                            onClick={() => { toggle('2'); }}
                                        >
                                            <span style={{ cursor: "grab", color: "chocolate" }}>Withdrawals</span>
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={activeTab}>
                                    <TabPane tabId="1">
                                        <Row>
                                            <Col>
                                                <CardBody style={{ backgroundColor: "#1e1e2f", paddingLeft: "10px", paddingRight: "10px" }}>
                                                    <Table className="tablesorter" responsive>
                                                        <thead className="text-primary">
                                                            <tr>

                                                                <th>ROI</th>
                                                                <th>Affiliate Commision</th>
                                                                <th>Date</th>
                                                                <th className="text-center">Cold Storage (Total Earnings)</th>
                                                                <hr />
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {earnings.map(item => {
                                                                return (
                                                                    <tr>

                                                                        <td><span style={{ color: "rgb(6 212 164)" }}>+{item.storage}</span></td>
                                                                        <td><span style={{ color: "rgb(6 212 164)" }}>+{item.referral_earning}</span></td>
                                                                        <td>{item.history_date}</td>
                                                                        <td className="text-center">{item.allStorage}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </Table>
                                                </CardBody>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <Row>
                                            <Col sm="6">
                                                <CardBody style={{ backgroundColor: "#1e1e2f", paddingLeft: "10px", paddingRight: "10px" }}>
                                                    <Table className="tablesorter" responsive>
                                                        <thead className="text-primary">
                                                            <tr>
                                                                <th>Status</th>
                                                                <th>Date</th>
                                                                <th className="text-center">Amount</th>
                                                                <hr />
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {pending.map(item => {
                                                                return (
                                                                    <tr>
                                                                        <td>{item.status}</td>
                                                                        <td>{item.date}</td>
                                                                        <td className="text-center">${item.amount.replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                                                    </tr>
                                                                )
                                                            })}

                                                        </tbody>
                                                    </Table>
                                                </CardBody>
                                            </Col>
                                            <Col sm="6">
                                                <CardBody style={{ backgroundColor: "#1e1e2f", paddingLeft: "10px", paddingRight: "10px" }}>
                                                    <Table className="tablesorter" responsive>
                                                        <thead className="text-primary">
                                                            <tr>
                                                                <th>Status</th>
                                                                <th>Date</th>
                                                                <th className="text-center">Amount</th>
                                                                <hr />
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {approved.map(item => {
                                                                return (
                                                                    <tr>
                                                                        <td>{item.status}</td>
                                                                        <td>{item.date}</td>
                                                                        <td className="text-center">${item.amount.replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </Table>
                                                </CardBody>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                </TabContent>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>

        </>
    );
}

export default Ledger;
