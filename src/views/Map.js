
import React from "react";
// react plugin used to create google maps
import { connect } from "react-redux";
import * as actions from "../store/actions/orders";
// reactstrap components
import { Card, CardHeader, CardBody, Row, Col, CardTitle, Table } from "reactstrap";




class Transaction extends React.Component {
  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getOrders(this.props.username, this.props.token);
    }
  }
  render() {
    const { orders } = this.props


    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">All Transactions</CardTitle>
                  Both Pending and Approved.
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Kit</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th className="text-center">Amount</th>
                        <hr />
                      </tr>
                    </thead>
                    <tbody>

                      {
                        orders.map(item => {
                          return (
                            <tr>
                              <td >{item.product}</td>
                              <td >{item.status}</td>
                              <td >{item.date}</td>
                              <td className="text-center">${item.amount}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>

        </div>

      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders.orders,
    username: state.auth.username,
    token: state.auth.token
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getOrders: (username, token) => dispatch(actions.getOrder(username, token)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
