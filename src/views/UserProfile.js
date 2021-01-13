
import React from "react";
import { useSelector } from "react-redux"

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




const UserProfile = () => {
  const user_id = useSelector(state => state.auth.userId)
  const username = useSelector(state => state.auth.username)
  const token = useSelector(state => state.auth.token)

  const [oldemail, setOldEmail] = React.useState(null)
  let [email, setEmail] = React.useState("")
  let [wallet, setWallet] = React.useState("")
  let [first_name, setFirst_name] = React.useState("")
  let [last_name, setLast_name] = React.useState("")
  let [country, setCountry] = React.useState("")
  let [address, setAddress] = React.useState("")
  let [zip_code, setZip_code] = React.useState("")
  let [city, setCity] = React.useState("")
  let [new_password1, setNew_password1] = React.useState("")
  let [new_password2, setNew_password2] = React.useState("")
  let [old_password, setOld_password] = React.useState("")
  const [errors, setErrors] = React.useState("")
  const [detail, setDetail] = React.useState("")
  const [load, setLoad] = React.useState(false)
  const [passload, setPLoad] = React.useState(false)



  const [walletFocus, setwalletFocus] = React.useState("")
  const [emailFocus, setemailFocus] = React.useState("")
  const [passwordFocus, setpasswordFocus] = React.useState("")
  const [password2Focus, setpassword2Focus] = React.useState("")
  const [oldpasswordFocus, setoldpasswordFocus] = React.useState("")





  const handleWallet = e => {
    setwalletFocus(false)

    let WAValidator = require('wallet-address-validator');

    let errors = {};
    let formIsValid = true;
    if (wallet) {
      wallet.split(' ').join('');

      let valid = WAValidator.validate(wallet, 'BTC');
      if (!valid) {
        formIsValid = false
        errors["wallet"] = "Invalid Bitcoin wallet address";
      }

      setErrors(errors)
      return formIsValid;
    }
    // This will log 'This is a valid address' to the console.
  }

  const handleEmail = e => {
    setemailFocus(false)

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
    setErrors(errors)
    return formIsValid;
  }

  const handleOldPass = e => {
    setoldpasswordFocus(false)
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

    setErrors(errors)
    return formIsValid;
  }

  const handlePass = e => {
    setpasswordFocus(false)
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

    setErrors(errors)
    return formIsValid;
  }

  const confirmpassword = e => {
    setpassword2Focus(false)
    let formIsValid = true;

    if (!new_password2.match(new_password1)) {
      formIsValid = false
      errors["new_password2"] = "Passwords do not match"
    }
    setErrors(errors)
    return formIsValid;
  }

  const checkform = () => {
    let formIsValid = true;
    let WAValidator = require('wallet-address-validator');

    if (wallet) {

      let valid = WAValidator.validate(wallet, 'BTC');
      if (!valid) {
        formIsValid = false
        errors["wallet"] = "Invalid Bitcoin wallet address";
      }
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

    setErrors(errors)
    return formIsValid;
  }

  const checkPass = () => {

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

    setErrors(errors)
    return formIsValid;
  }




  const handleSubmit = e => {
    e.preventDefault()
    setLoad(true)
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
    if (checkform()) {

      axios.default.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
      axios.put(`/rest-auth/update-profile/${user_id}/`, user)
        .then(res => {

          setDetail('Updated')
          const userE = JSON.parse(localStorage.getItem("detail"));
          if (userE) {

            {
              email === userE.email ?
                setDetail('Updated')
                :
                setDetail("Updated. Confirm New Email.. check your mail")
            }
            setLoad(false)
          }
          setLoad(false)
        }

        ).catch(err => {
          console.log(err)
          setLoad(false)
        })



    } else {
      checkform();
      setLoad(false)
    }

  }

  const handlePassChange = e => {
    e.preventDefault()
    setPLoad(true)
    const pass = {
      new_password1: new_password1,
      new_password2: new_password2,
      old_password: old_password
    }
    if (checkPass()) {
      axios.default.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
      axios.post('/rest-auth/password/change/', pass)
        .then(res => {
          console.log(res)
          setDetail(res.data.detail)
        })
      setPLoad(false)
    } else {
      checkPass();
      setPLoad(false)
    }
  }

  React.useEffect(() => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    }
    axios.get('/rest-auth/user/')
      .then(res => {
        setEmail(res.data.email)
        setWallet(res.data.btc_wallet)
        setFirst_name(res.data.first_name)
        setLast_name(res.data.last_name)
        setCountry(res.data.country)
        setAddress(res.data.address)
        setZip_code(res.data.zip_code)
        setCity(res.data.city)
        const oldemail = {
          email: res.data.email
        }
        localStorage.setItem("detail", JSON.stringify(oldemail));


      }


      )
  }, [])

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
                          defaultValue="UserMax "
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
                      <FormGroup className={errors["email"] ? "has-danger" :
                        "input-group-focus"}>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                          </label>
                        <Input
                          type="email"
                          name="email"
                          onChange={e => setEmail(e.target.value)}
                          value={email}
                          placeholder={
                            errors["email"] ?
                              errors['email']
                              :
                              "email"
                          }
                          onFocus={e =>
                            setemailFocus(true)
                          }
                          onBlur={() => handleEmail()
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
                          onChange={e => setFirst_name(e.target.value)}
                          name="first_name"

                          value={first_name}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Last Name</label>
                        <Input
                          onChange={e => setLast_name(e.target.value)}
                          name="last_name"
                          value={last_name}
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
                          onChange={e => setAddress(e.target.value)}
                          name="address"
                          value={address}
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
                          onChange={e => setCity(e.target.value)}
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
                          onChange={e => setCountry(e.target.value)}
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
                          onChange={e => setZip_code(e.target.value)}
                          name="zip_code"
                          value={zip_code}
                          placeholder="ZIP Code"
                          type="number" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="8">
                      <Label for="error" className="control-label">{errors["wallet"]}</Label>
                      <FormGroup className={errors["wallet"] ? "has-danger" :
                        "input-group-focus"}
                      >
                        <label>Wallet Address</label>
                        <Input
                          onChange={e => setWallet(e.target.value)}
                          value={wallet}
                          name="wallet"
                          placeholder={
                            errors["wallet"] ?
                              errors["wallet"]
                              :
                              "Your BTC wallet address"
                          }


                          type="text"
                          onFocus={e => setwalletFocus(true)
                          }
                          onBlur={() => handleWallet()
                          }
                        />

                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <hr></hr>
                      {load === true ?
                        <div className="loader loader-1">
                          <div className="loader-outter"></div>
                          <div className="loader-inner"></div>
                        </div>
                        :
                        <Button className="btn-fill" color="primary" onClick={e => handleSubmit(e)}>
                          Save
                      </Button>
                      }
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-md-1" md="6">
                      <Label for="error" className="control-label">{errors["new_password1"]}</Label>
                      <FormGroup className={errors["new_password1"] ? "has-danger" :
                        "input-group-focus"}
                      >
                        <label>New Password</label>
                        <Input
                          onChange={e => setNew_password1(e.target.value)}
                          value={new_password1}
                          name="new_password1"
                          type="password"
                          onFocus={e => setpasswordFocus(true)
                          }
                          onBlur={
                            () => handlePass()
                          }
                          placeholder="New Password"

                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <Label for="error" className="control-label">{errors["new_password2"]}</Label>
                      <FormGroup className={errors["new_password2"] ? "has-danger" :
                        "input-group-focus"}
                      >
                        <label>Confirm New Password</label>
                        <Input
                          onChange={e => setNew_password2(e.target.value)}
                          name="new_password2"
                          value={new_password2}
                          placeholder={
                            errors["new_password2"] ?
                              errors["new_password2"]
                              :
                              "Confirm New Password"
                          }
                          onBlur={
                            () => confirmpassword()
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
                          onChange={e => setOld_password(e.target.value)}
                          name="old_password"
                          value={old_password}
                          placeholder="Old Password"
                          type="password"
                          onBlur={
                            () => handleOldPass()
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="6">
                      {passload === true ?
                        <div className="loader loader-1">
                          <div className="loader-outter"></div>
                          <div className="loader-inner"></div>
                        </div>
                        :
                        <Button className="btn-fill" color="secondary" onClick={() => handlePassChange()}>
                          Change
                      </Button>
                      }
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




export default UserProfile;
