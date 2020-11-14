
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// nodejs library that concatenates classes

// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import * as actions from "../store/actions/orders";
import * as statactions from "../store/actions/stats";
import * as chart from "../store/actions/chart";


import axios from "axios";
import moment from 'moment';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Table,
  Row,
  Col, InputGroup, Button, Input, Tooltip
} from "reactstrap";




function Dashboard() {
  const dispatch = useDispatch()

  const [ryu, setryu] = React.useState();

  let myInput = React.useRef()
  var test = React.useRef()

  const [btcBalance, setBtcBalance] = React.useState();
  const [withdrawn, setWithdrawn] = React.useState();
  const [balance, setBalance] = React.useState();
  const [loading, setLoad] = React.useState(true);
  const [tEarn, setTearn] = React.useState(true);
  const [dload, setDload] = React.useState(true);

  const [earns, setEarns] = React.useState([]);
  const [months, setMonths] = React.useState([]);

  const [wday, setWday] = React.useState([]);
  const [wamount, setWamount] = React.useState([]);
  const [status, setStatus] = React.useState([]);

  const [Mdate, setMdate] = React.useState([]);
  const [Mcount, setMcount] = React.useState([]);
  const [pData, setPdata] = React.useState([]);
  const [pMonths, setPmonths] = React.useState([]);
  const [number, setNumber] = React.useState([]);

  const username = useSelector(state => state.auth.username)
  const token = useSelector(state => state.auth.token)


  const orders = useSelector(state => state.orders.orders)
  const lastLogin = useSelector(state => state.auth.lastLogin)
  const activeP = useSelector(state => state.auth.activeP)
  const wallet = useSelector(state => state.auth.btc_wallet)
  const hash = useSelector(state => state.auth.hash)

  const btc = useSelector(state => state.stats.btc)
  const roic = useSelector(state => state.stats.roic)
  const totalE = useSelector(state => state.stats.totalE)
  const refE = useSelector(state => state.stats.refE)
  const refLink = useSelector(state => state.auth.refLink)
  const activeA = useSelector(state => state.auth.activeA)
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const [xcopy, setCopy] = React.useState("Copy to clipboard");
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const [price, setPrice] = React.useState(null)



  axios.defaults.headers = {
    "Content-Type": "application/json",
  }
  axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then(res => {

      const rate = res.data.bpi.USD.rate
      setPrice(rate)

    })
  const getMarketData = () => {



    axios.get('https://api.blockchain.info/charts/n-transactions?timespan=5days&cors=true')
      .then(res => {

        for (const x of res.data.values) {
          var p = x.y
          setMcount(e => [...e, parseInt(p / 500)])

          var d = new Date(x.x * 1000)
          var c = moment(d).format('MMM Do ')
          setMdate(e => [...e, c])

        }
        setLoad(false)
      })
  }


  const getChart = () => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    }
    axios.get(`/userApi/userhistory?username=${username}`)
      .then(res => {

        for (const x of res.data) {
          if (x.history) {
            for (const y of x.history.slice(Math.max(x.history.length - 6, 0)).reverse()) {

              setEarns(earn => [...earn, parseInt(y.allStorage)])
              setMonths(earn => [...earn, y.date_day]);
            }

          }
        }
        setTearn(false)
      })


    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    }
    axios.get(`/userApi/userwithdrawals/?username=${username}`)
      .then(res => {

        for (const x of res.data.slice(Math.max(res.data.length - 4, 0))) {
          setWday(earn => [...earn, x.string_d])
          setWamount(earn => [...earn, x.amount])
          setStatus(earn => [...earn, x.status])

        }

      })

    axios.get(`/userApi/usercompleted-kits?username=${username}`)
      .then(res => {
        if (res.data.history) {
          for (const x of res.data) {

            for (const y of x.history.reverse()) {
              setNumber(e => [...e, y.number])
            }
          }
        }
      })
  }





  const copy = e => {



    var copyText = document.getElementById("myInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");


    setCopy("Copied: " + copyText.value)
    setTooltipOpen(true)

    setTimeout(() => { setCopy("Copy to clipboard") }, 3000)


  }


  const orderCheck = () => {

    if (!Array.isArray(orders) || !orders.length) {
      setryu(false)
    } else {
      setryu(true)
    }

  }

  React.useEffect(() => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
    }
    axios.get('https://api.blockchain.info/charts/market-price?timespan=4days&cors=true')
      .then(res => {
        for (const x of res.data.values) {
          var p = x.y
          setPdata(e => [...e, parseInt(p)])
          var d = new Date(x.x * 1000)
          var c = moment(d).format('MMM Do ')
          setPmonths(e => [...e, c])
        }
        setLoad(false)
      })

    getMarketData()
    if (token !== undefined && token !== null)

      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    axios.get('/rest-auth/user/')
      .then(res => {
        setWithdrawn(res.data.totalWithdrawn)
        setBalance(res.data.account_balance)
        axios.defaults.headers = {
          "Content-Type": "application/json",
        }
        return axios.get(`https://blockchain.info/tobtc?currency=USD&value=${res.data.account_balance}`)
          .then(res => {
            const btc = res.data;
            setBtcBalance(btc)
          })
      })
    dispatch(actions.getOrder(username, token))
    dispatch(statactions.getStat(username, token))
    dispatch(chart.getChart(username, token))

    orderCheck()
    getChart()



  }, [token, username])



  let totalB = 0
  if (balance & totalE) {
    totalB = parseFloat(balance) + parseFloat(totalE)

  }
  else if (balance & !totalE) {
    totalB = balance

  }

  let chartExample3 = {
    data: canvas => {
      let ctx = canvas.getContext("2d");

      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
      gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
      gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

      return {
        labels: wday,
        datasets: [
          {
            label: "Amount: $",
            fill: true,
            backgroundColor: gradientStroke,
            hoverBackgroundColor: gradientStroke,
            borderColor: "#d048b6",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: wamount,
          }
        ]
      };
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(225,78,202,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 120,
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(225,78,202,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ]
      }
    }
  };

  const chartExample4 = {
    data: canvas => {
      let ctx = canvas.getContext("2d");

      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, "rgba(66,134,121,0.15)");
      gradientStroke.addColorStop(0.4, "rgba(66,134,121,0.0)"); //green colors
      gradientStroke.addColorStop(0, "rgba(66,134,121,0)"); //green colors

      return {
        labels: Mdate,
        datasets: [
          {
            label: "Confirmed Transactions ",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#00d6b4",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#00d6b4",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#00d6b4",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: Mcount
          }
        ]
      };
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: 50,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(0,242,195,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ]
      }
    }
  };





  let chart1_2_options = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest"
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.0)",
            zeroLineColor: "transparent"
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }
      ],
      xAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.1)",
            zeroLineColor: "transparent"
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }
      ]
    }
  };

  let chart2_2_options = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 14,
      xPadding: 12,
      mode: "nearest",
      intersect: 1000,
      position: "nearest"
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.0)",
            zeroLineColor: "transparent"
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }
      ],
      xAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.1)",
            zeroLineColor: "transparent"
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }
      ]
    }
  };

  let chartExample1 = {
    data1: canvas => {
      let ctx = canvas.getContext("2d");

      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
      gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
      gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

      return {
        labels: pMonths,
        datasets: [
          {
            label: "Average USD market price across major bitcoin exchanges",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#1f8ef1",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#1f8ef1",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#1f8ef1",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: pData
          }
        ]
      };
    },
    data2: canvas => {
      let ctx = canvas.getContext("2d");

      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
      gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
      gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

      return {
        labels: [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC"
        ],
        datasets: [
          {
            label: "Return On Investment(ROI)",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#1f8ef1",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#1f8ef1",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#1f8ef1",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: [0, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120]
          }
        ]
      };
    },
    data3: canvas => {
      let ctx = canvas.getContext("2d");

      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
      gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
      gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

      return {
        labels: [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC"
        ],
        datasets: [
          {
            label: "My First dataset",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#1f8ef1",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#1f8ef1",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#1f8ef1",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
          }
        ]
      };
    },
    options: chart1_2_options
  };




  let chartExample2 = {
    data: canvas => {
      let ctx = canvas.getContext("2d");

      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
      gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
      gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

      return {
        labels: months,
        datasets: [
          {
            label: "Earned",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#1f8ef1",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#1f8ef1",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#1f8ef1",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: earns
          }
        ]
      };
    },
    options: chart1_2_options
  };

  return (
    <>
      <div className="content">

        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>

                  <Col className="text-left" >
                    <h5 className="card-category">Average BTC USD Market Chart<small>{"  "}(last 5days)</small></h5>
                    <CardTitle tag="h2">Performance</CardTitle>
                  </Col>

                </Row>
              </CardHeader>
              <CardBody>
                {loading === true ?
                  <Row>
                    <Col className="text-center" sm="12">
                      <div className="loader loader-1" style={{ color: "#282c58" }}>
                        <div className="loader-outter" style={{ color: "#282c58" }}></div>
                        <div className="loader-inner" style={{ color: "#282c58" }}></div>
                      </div>
                    </Col>
                  </Row>
                  :
                  <div className="chart-area">
                    <Line
                      data={chartExample1.data1}
                      options={chartExample2.options}
                    />
                  </div>
                }
              </CardBody>
            </Card>
          </Col>
          <div className="col-md-6 col-lg-3">
            <div className="card-stats card">
              <div className="card-body">
                <div className="row">
                  <div className="col-4">
                    <div style={{
                      background: "#ff8d72",
                      backgroundImage: "linear-gradient(to bottom left,#ff8d72,#ff6491,#ff8d72)",
                      backgroundSize: "210% 210%",
                      backgroundPosition: "100% 0",
                      height: "50px", width: "50px", borderRadius: "50%"
                    }}>
                      <i className="tim-icons icon-bank" style={{ color: "#fff", fontSize: "1.7em", padding: "14px 13px" }} />
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="numbers">
                      <p className="card-category">Funded</p>
                      <CardTitle tag="h3">
                        {" "}
                        <span style={{ color: "#e6dfdf" }}>${balance && (balance.replace(/\d(?=(\d{3})+\.)/g, '$&,'))}</span>
                      </CardTitle>


                      <h5 className="card-title" style={{ color: "rgb(109, 123, 152)" }}>{btcBalance} <span style={{ color: "#525f7f" }}>฿</span> </h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <hr />

                {balance ?
                  <div className="stats">
                    <Link
                      to="/user/cart"
                    >
                      <i className="tim-icons icon-spaceship" style={{ color: "#00d3d2" }} /> <span style={{ color: "#00d3d2" }}>Upgrade</span>


                    </Link>
                  </div>
                  :
                  <div className="stats">

                    <i className="tim-icons icon-spaceship" /> Upgrade

                    </div>
                }

              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card-stats card">
              <div className="card-body">
                <div className="row">
                  <div className="col-5">
                    <div style={{
                      background: "#00f2c3",
                      backgroundImage: "linear-gradient(to bottom left,#00f2c3,#0098f0,#00f2c3)",
                      backgroundSize: "210% 210%",
                      backgroundPosition: "100% 0",
                      height: "50px", width: "50px", borderRadius: "50%"
                    }}>
                      <i className="tim-icons icon-shape-star" style={{ color: "#fff", fontSize: "1.7em", padding: "14px 13px" }} />
                    </div>
                  </div>
                  <div className="col-7">
                    <div className="numbers">
                      <p className="card-category">Net Profit</p>
                      <h3 className="card-title"><span style={{ color: "#e6dfdf" }}>${roic && (roic.replace(/\d(?=(\d{3})+\.)/g, '$&,'))}</span></h3>
                      <h5 className="card-title" style={{ color: "rgb(109, 123, 152)" }}>{btc} <span style={{ color: "#525f7f" }}>฿</span> </h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <hr />
                {roic ?
                  <div className="stats">
                    <Link
                      to="/user/compound"
                    >
                      <i className="tim-icons icon-sound-wave" style={{ color: "#00d3d2" }} /> <span style={{ color: "#00d3d2" }}>Compound</span>
                    </Link>
                  </div>
                  :
                  <div className="stats">
                    <i className="tim-icons icon-sound-wave" /> Compound
                  </div>
                }
              </div>
            </div>
          </div>


          <div className="col-md-6 col-lg-3">
            <div className="card-stats card">
              <div className="card-body">
                <div className="row">
                  <div className="col-5">
                    <div style={{
                      background: "#fd5d93",
                      backgroundImage: "linear-gradient(to bottom left,#fd5d93,#ec250d,#fd5d93)",
                      backgroundSize: "210% 210%",
                      backgroundPosition: "100% 0",
                      height: "50px", width: "50px", borderRadius: "50%"
                    }}>
                      <i className="tim-icons icon-molecule-40" style={{ color: "#fff", fontSize: "1.7em", padding: "14px 13px" }} />
                    </div>
                  </div>
                  <div className="col-7">
                    <div className="numbers">
                      <p className="card-category">Active Package</p>
                      <h3 className="card-title"><span style={{ color: "#e6dfdf" }}>{activeP ? activeP : 0}</span></h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <hr />
                <div className="stats">
                  <i className="tim-icons icon-watch-time" />Total Balance: ${totalB ? totalB : 0}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card-stats card">
              <div className="card-body">
                <div className="row">
                  <div className="col-5">
                    <div style={{
                      background: "#e14eca",
                      backgroundImage: "linear-gradient(to bottom left,#e14eca,#ba54f5,#e14eca)",
                      backgroundSize: "210% 210%",
                      backgroundPosition: "100% 0",

                      height: "50px", width: "50px", borderRadius: "50%"
                    }}>
                      <i className="tim-icons icon-single-02" style={{ color: "#fff", fontSize: "1.7em", padding: "14px 13px" }} />
                    </div>
                  </div>
                  <div className="col-7">
                    <div className="numbers">
                      <p className="card-category">Referrals</p>
                      <hr />
                      <h3 className="card-title"><span style={{ color: "#e6dfdf" }}>{activeA ? activeA : 0}</span></h3>
                      <hr></hr>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div className="stats">
                  <i className="tim-icons icon-trophy" />Earnings: ${refE && (refE.replace(/\d(?=(\d{3})+\.)/g, '$&,'))}
                </div>
              </div>
            </div>
          </div>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Total Earnings</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" />{" "}
                    ${totalE && (totalE.replace(/\d(?=(\d{3})+\.)/g, '$&,'))}
                </CardTitle>
              </CardHeader>
              <CardBody>
                {tEarn ?
                  <Row>
                    <Col className="text-center" sm="12">
                      <div className="loader loader-1">
                        <div className="loader-outter"></div>
                        <div className="loader-inner"></div>
                      </div>
                    </Col>
                  </Row>
                  :
                  <div className="chart-area">
                    <Line
                      data={chartExample2.data}
                      options={chartExample2.options}
                    />
                  </div>
                }
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Withdrawn</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                  {withdrawn && (withdrawn.replace(/\d(?=(\d{3})+\.)/g, '$&,'))}€
                  </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={chartExample3.data}
                    options={chartExample3.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category"> Bitcoin transactions.<small>(Last 5 days)</small></h5>
                <CardTitle tag="h4" >
                  <i className="tim-icons icon-send text-success" /> {number ? number : 0} Completed Packages
                  </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample4.data}
                    options={chartExample4.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="6" md="12">
            <Card>
              <CardHeader>
                <h3 className="card-category">Recent Transactions</h3>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Package</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th className="text-center">Amount</th>
                      <hr />
                    </tr>
                  </thead>
                  <tbody>

                    {orders ?
                      orders.slice(Math.max(orders.length - 6, 0)).map(item => {
                        return (
                          <tr>
                            <td >{item.product}</td>
                            <td >{item.status}</td>
                            <td >{item.date}</td>
                            <td className="text-center">${item.amount}</td>
                          </tr>
                        )
                      })
                      :
                      <tr>
                        <td >No Transactions</td>
                      </tr>
                    }
                  </tbody>
                </Table>

                <small></small>

              </CardBody>
            </Card>
          </Col>

          <Col lg="6" md="12">
            <Card className="card-tasks">
              <CardHeader>
                <h6 className="title d-inline">Last Activity(5)</h6>
                <p className="card-category d-inline"> today</p>
                <UncontrolledDropdown>
                  <DropdownToggle
                    caret
                    className="btn-icon"
                    color="link"
                    data-toggle="dropdown"
                    type="button"
                  >
                    <i className="tim-icons icon-settings-gear-63" />
                  </DropdownToggle>
                  <DropdownMenu aria-labelledby="dropdownMenuLink" right>
                    <DropdownItem
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      Action
                      </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      Another action
                      </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      Something else
                      </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </CardHeader>
              <CardBody>
                <div className="table-full-width table-responsive">
                  <div>
                  </div>
                  <Table>
                    <tbody>
                      <tr>

                        <td>
                          <p className="title">Link</p>
                          <InputGroup>
                            <Input type="text"
                              value={refLink}
                              placeholder={refLink}
                              id="myInput" />
                            <Button onClick={e => copy()} id="TooltipExample"  >Copy</Button>

                            <Tooltip placement="top" isOpen={tooltipOpen} target="TooltipExample" id="myTooltip" toggle={toggle}>
                              {xcopy}
                            </Tooltip>
                          </InputGroup>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="title">User ID</p>
                          <p className="text-muted">
                            <i className="tim-icons icon-key-25" style={{ color: "#435d7f" }} />      {hash}
                          </p>

                        </td>
                      </tr>

                      <tr>
                        <td>
                          <p className="title">Wallet Address</p>
                          <p className="text-muted">
                            <i className="tim-icons icon-wallet-43" style={{ color: "#435d7f" }} />      {wallet}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="title">Last Login</p>
                          <p className="text-muted stats">
                            <i className="tim-icons icon-watch-time" style={{ color: "#435d7f" }} />           {lastLogin}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>

        </Row>

      </div>
    </>
  );
}

export default Dashboard;
