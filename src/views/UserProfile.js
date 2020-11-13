
import React from "react";
import { connect } from "react-redux"

import axios from "axios";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Label,
} from "reactstrap";




class UserProfile extends React.Component {

  state = {
    email: "",
    wallet: "",
    first_name: "",
    last_name: "",
    country: "",
    address: "",
    zip_code: "",
    city: "",
    new_password1: "",
    new_password2: "",
    old_password: "",
    errors: {}

  };



  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  };


  handleWallet = e => {
    this.setState({ walletFocus: false })
    let WAValidator = require('wallet-address-validator');

    let { wallet } = this.state;
    let errors = {};
    let formIsValid = true;
    wallet.split(' ').join('');

    if (!wallet) {
      formIsValid = false;
      errors["wallet"] = "Cannot be empty";
    }


    let valid = WAValidator.validate(wallet, 'BTC');
    if (!valid) {
      formIsValid = false
      errors["wallet"] = "Invalid Bitcoin wallet address";
    }

    this.setState({ errors: errors });
    return formIsValid;

    // This will log 'This is a valid address' to the console.
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

  handleOldPass = e => {
    this.setState({ passwordFocus: false })
    let { old_password } = this.state;
    let errors = {};
    let formIsValid = true;
    if (!old_password) {
      formIsValid = false;
      errors["old_password"] = "Input Password"
    }

    if (typeof old_password !== "undefined") {
      if (!old_password.match(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/)) {
        formIsValid = false;
        errors["old_password"] = "Password must contain at least one letter,number, and be longer than six charaters.";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  handlePass = e => {
    this.setState({ passwordFocus: false })
    let { new_password1 } = this.state;
    let errors = {};
    let formIsValid = true;
    if (!new_password1) {
      formIsValid = false;
      errors["new_password1"] = "Input Password"
    }

    if (typeof new_password1 !== "undefined") {
      if (!new_password1.match(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/)) {
        formIsValid = false;
        errors["new_password1"] = "Password must contain at least one letter,number, and be longer than six charaters.";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  confirmpassword = e => {
    this.setState({ password2Focus: false })
    let { new_password1, new_password2 } = this.state;
    let errors = {};
    let formIsValid = true;

    if (!new_password2.match(new_password1)) {
      formIsValid = false
      errors["new_password2"] = "Passwords do not match"
    }
    this.setState({ errors: errors });
    return formIsValid;
  }

  checkform() {
    let { email, wallet } = this.state;
    let errors = {};
    let formIsValid = true;
    let WAValidator = require('wallet-address-validator');


    let valid = WAValidator.validate(wallet, 'BTC');

    if (!wallet) {
      formIsValid = false;
      errors["wallet"] = "Cannot be empty";
    }

    if (!valid) {
      formIsValid = false
      errors["wallet"] = "Invalid Bitcoin wallet address";
    }

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

  checkPass() {
    let { new_password1, new_password2, old_password } = this.state;
    let errors = {};
    let formIsValid = true;

    if (!old_password) {
      formIsValid = false;
      errors["old_password"] = "Input Password"
    }

    if (typeof old_password !== "undefined") {
      if (!old_password.match(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/)) {
        formIsValid = false;
        errors["old_password"] = "Password must contain at least one letter,number, and be longer than six charaters.";
      }
    }



    if (!new_password1) {
      formIsValid = false;
      errors["new_password1"] = "Input Password"
    }

    if (typeof new_password1 !== "undefined") {
      if (!new_password1.match(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/)) {
        formIsValid = false;
        errors["new_password1"] = "Password must contain at least one letter,number, and be longer than six charaters.";
      }
    }

    if (!new_password2.match(new_password1)) {
      formIsValid = false
      errors["new_password2"] = "Passwords do not match"
    }

    this.setState({ errors: errors });
    return formIsValid;
  }


  updateUser(user_id, token, email,
    wallet,
    first_name,
    last_name,
    country,
    address,
    zip_code,
    city) {

    const user = {
      email,
      btc_wallet: wallet,
      first_name,
      last_name,
      country,
      address,
      zip_code,
      city
    }
    axios.default.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    }
    axios.put(`/rest-auth/update-profile/${user_id}/`, user)
      .then(res => {
        if (res.data.btc_wallet === wallet) {
          const update = {
            email: res.data.email,
            wallet: res.data.btc_wallet,
            first_name: res.data.first_name,
            last_name: res.data.last_name,
            address: res.data.address,
            city: res.data.city,
            country: res.data.country,
            zip_code: res.data.zip_code,
          }
          localStorage.setItem("detail", JSON.stringify(update));

          this.setState({
            detail: "Updated",
            email: res.data.email,
            wallet: res.data.btc_wallet,
            first_name: res.data.first_name,
            last_name: res.data.last_name,
            address: res.data.address,
            city: res.data.city,
            country: res.data.country,
            zip_code: res.data.zip_code,
          })
        }
      }
      ).catch(err => {
        console.log(err.msg)
      })
  }

  handleSubmit = e => {
    e.preventDefault();
    const { email,
      wallet,
      first_name,
      last_name,
      country,
      address,
      zip_code,
      city } = this.state;

    const { user_id, token } = this.props
    if (this.checkform()) {
      this.updateUser(user_id, token, email,
        wallet,
        first_name,
        last_name,
        country,
        address,
        zip_code,
        city);
      if (email !== this.props.email) {
        this.setState({
          detail: "Confirm New Email.. check your mail"
        })
      }
    } else {
      this.checkform();
    }

  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("detail"));

    const { email, wallet, first_name,
      last_name,
      country,
      address,
      zip_code,
      city } = this.props;


    user ?
      this.setState({
        email: user.email,
        wallet: user.wallet,
        first_name: user.first_name,
        last_name: user.last_name,
        country: user.country,
        address: user.address,
        zip_code: user.zip_code,
        city: user.city,
      })
      :
      this.setState({
        email: email,
        wallet: wallet,
        first_name: first_name,
        last_name: last_name,
        country: country,
        address: address,
        zip_code: zip_code,
        city: city,
      })
  }

  render() {
    const { username } = this.props
    const {
      email, wallet,
      first_name,
      last_name,
      country,
      address,
      zip_code,
      city,
      new_password1,
      new_password2,
      old_password, detail } = this.state

    return (
      <>
        <div className="content">
          {detail ?
            <div className="alert alert-success" role="alert">
              {detail}
            </div>
            :
            null
          }
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Edit Profile</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>

                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>Company (disabled)</label>
                          <Input
                            defaultValue="UserMax"
                            disabled
                            placeholder="Company"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="3">
                        <FormGroup>
                          <label>Name (disabled)</label>
                          <Input
                            defaultValue={username}
                            disabled
                            placeholder="Username"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup className={this.state.errors["email"] ? "has-danger" :
                          "input-group-focus"}>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <Input
                            type="email"
                            name="email"
                            onChange={this.handleChange}
                            value={email}
                            placeholder={
                              this.state.errors["email"] ?
                                this.state.errors['email']
                                :
                                "email"
                            }
                            onFocus={e =>
                              this.setState({ emailFocus: true })
                            }
                            onBlur={this.handleEmail
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                            placeholder="First Name"
                            type="text"
                            onChange={this.handleChange}
                            name="first_name"

                            value={
                              this.props.first_name === null ?
                                first_name
                                :
                                this.props.first_name
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Last Name</label>
                          <Input
                            onChange={this.handleChange}
                            name="last_name"
                            value={this.props.last_name === null ?
                              last_name
                              :
                              this.props.last_name
                            }
                            placeholder="Last Name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Address</label>
                          <Input
                            onChange={this.handleChange}
                            name="address"
                            value={this.props.address === null ?
                              address
                              :
                              this.props.address
                            }
                            placeholder="Home Address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>City</label>
                          <Input
                            onChange={this.handleChange}
                            name="city"
                            value={city}
                            placeholder="City"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <label>Country</label>
                          <Input
                            onChange={this.handleChange}
                            name="country"
                            value={country}
                            placeholder="Country"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label>Postal Code</label>
                          <Input
                            onChange={this.handleChange}
                            name="zip_code"
                            value={this.props.address === null ?
                              zip_code
                              :
                              this.props.zip_code
                            }
                            placeholder="ZIP Code"
                            type="number" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="8">
                        <Label for="error" className="control-label">{this.state.errors["wallet"]}</Label>
                        <FormGroup className={this.state.errors["wallet"] ? "has-danger" :
                          "input-group-focus"}
                        >
                          <label>Wallet Address</label>
                          <Input
                            onChange={this.handleChange}
                            value={
                              wallet
                            }
                            name="wallet"
                            placeholder={
                              this.state.errors["wallet"] ?
                                this.state.errors["wallet"]
                                :
                                "Your BTC wallet address"
                            }


                            type="text"
                            onFocus={e =>
                              this.setState({ walletFocus: true })
                            }
                            onBlur={this.handleWallet
                            }
                          />

                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <hr></hr>
                        <Button className="btn-fill" color="primary" type="submit" onClick={this.handleSubmit}>
                          Save
                      </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="px-md-1" md="6">
                        <Label for="error" className="control-label">{this.state.errors["new_password1"]}</Label>
                        <FormGroup className={this.state.errors["new_password1"] ? "has-danger" :
                          "input-group-focus"}
                        >
                          <label>New Password</label>
                          <Input
                            onChange={this.handleChange}
                            value={new_password1}
                            name="new_password1"
                            type="password"
                            onFocus={e =>
                              this.setState({ passwordFocus: true })
                            }
                            onBlur={
                              this.handlePass
                            }
                            placeholder="New Password"

                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <Label for="error" className="control-label">{this.state.errors["new_password2"]}</Label>
                        <FormGroup className={this.state.errors["new_password2"] ? "has-danger" :
                          "input-group-focus"}
                        >
                          <label>Confirm New Password</label>
                          <Input
                            onChange={this.handleChange}
                            name="new_password2"
                            value={new_password2}
                            placeholder={
                              this.state.errors["new_password2"] ?
                                this.state.errors["new_password2"]
                                :
                                "Confirm New Password"
                            }
                            onBlur={
                              this.confirmpassword
                            }
                            type="password" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Old Password</label>
                          <Input
                            onChange={this.handleChange}
                            name="old_password"
                            value={old_password}
                            placeholder="Old Password"
                            type="password"
                            onBlur={
                              this.handleOldPass
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="6">
                        <Button className="btn-fill" color="secondary" type="submit">
                          Change
                      </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>

                </CardFooter>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />




                  </div>

                </CardBody>
                <CardFooter>
                  <div className="button-container">

                  </div>
                </CardFooter>
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
    user_id: state.auth.userId,
    token: state.auth.token,
    email: state.auth.email,
    username: state.auth.username,
    wallet: state.auth.btc_wallet,
    first_name: state.auth.first_name,
    last_name: state.auth.last_name,
    country: state.auth.country,
    address: state.auth.address,
    zip_code: state.auth.zip_code,
    city: state.auth.city,
  }
}

export default connect(mapStateToProps)(UserProfile);
