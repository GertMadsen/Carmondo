import React, { Component } from "react"
import {
  HashRouter as Router,
  Route,
  Switch,
  NavLink,
  Link
} from 'react-router-dom'
import facade from "./apiFacade";

const NoMatch = () => (
  <h1> No Match </h1>
)


class RentCar extends Component {
  constructor(props) {
    super(props);
    this.state = { location: props.locValue, categori: props.catValue }

    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleChangeCategori = this.handleChangeCategori.bind(this);
  }


  handleChangeLocation(event) {
    this.setState({ location: event.target.value });
    this.props.setLocValue(event.target.value);
    if (event.target.value === "All") {
      this.props.setLocationURL("");
    } else {
      this.props.setLocationURL("?location=" + event.target.value);
    }
  }
  handleChangeCategori(event) {
    this.setState({ categori: event.target.value });
    this.props.setCatValue(event.target.value);
    if (event.target.value === "All") {
      this.props.setCategoryURL("");
    } else {
      this.props.setCategoryURL("?category=" + event.target.value);
    }
  }

  render() {
    return (
      <div>

        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4 well well-lg"> <h2>Welcome to CarMondo</h2></div>
          <div className="col-sm-4"></div>
        </div>

        <div className="row">
          <div className="col-sm-5"> </div>
          <div className="col-sm-3">
            <form>
              <div className="form group">
                <Link to="/showallcars" className="btn btn-success btn-lg">Show All Cars</Link>
              </div>
            </form>
          </div>
          <div className="col-sm-4"> </div>
        </div>

        <div className="form-group">
          &nbsp;
        </div>

        <div className="row">
          <div className="col-sm-4"> </div>
          <div className="col-sm-4">
            <form className="form-inline">
              <div className="form group">
                <label> Kategori: </label>
                <select className="form-control" value={this.state.categori} onChange={this.handleChangeCategori}>
                  <option value="All">Alle</option>
                  <option value="Mini">Mini</option>
                  <option value="Economy">Economy</option>
                  <option value="Fullsize">Fullsize</option>
                </select>
                <Link to="/showcatcars" className="btn btn-success">Show</Link>
              </div>
            </form>
          </div>
          <div className="col-sm-4"> </div>
        </div>

        <div className="form-group">
          &nbsp;
        </div>

        <div className="row">
          <div className="col-sm-4"> </div>
          <div className="col-sm-4">
            <form className="form-inline">
              <div className="form group">
                <label> Lokation: </label>
                <select className="form-control" value={this.state.location} onChange={this.handleChangeLocation}>
                  <option value="All">Alle</option>
                  <option value="Cph Airport">CPH Airport</option>
                  <option value="Aarhus City">Aarhus City</option>
                  <option value="Naestved">Næstved</option>
                </select>
                <Link to="/showloccars" className="btn btn-success">Show</Link>
              </div>
            </form>
          </div>
          <div className="col-sm-4"> </div>
        </div>

      </div>
    )
  }
}

class ShowCars extends Component {
  constructor(props) {
    super(props);
    this.state = { fetchURL: props.fetchURL, dataFromServer: { cars: [] } };
    this.props.setReturnURL(props.match.url);
  }
  componentDidMount() {
    facade.fetchCars(this.state.fetchURL).then(res => this.setState({ dataFromServer: res }));
  }
  render() {
    var cars = this.state.dataFromServer.cars;
    var linkTable = cars.map((car) => {
      return (
        <tr key={car.regno}>
          <td>{car.make}</td>
          <td>{car.model}</td>
          <td>{car.category}</td>
          <td>{car.location}</td>
          <td>{car.priceperday}</td>
          <td><Link to={`details/${car.regno}`} className="btn btn-success">Show Details</Link></td>
          <td><Link to={`bookinginfo/${car.regno}`} className="btn btn-success">Book</Link></td>
        </tr>
      )
    });
    return (
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <div className="well well-sm"> <h3> List of Cars</h3> </div>
          <table className="table" key="tableList">
            <tbody>
              <tr>
                <th scope="col">Make</th>
                <th scope="col">Model</th>
                <th scope="col">Category</th>
                <th scope="col">Location</th>
                <th scope="col">PricePerDay</th>
                <th scope="col">Details</th>
                <th scope="col">Booking</th>
              </tr>
              {linkTable}
            </tbody>
          </table>
          <br />

          <Link to="/" className="btn btn-success">Back</Link>

        </div>
        <div className="col-sm-2"></div>
      </div>

    )
  }
}

class CarDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { fetchURL: props.fetchURL, dataFromServer: {}, regno: props.match.params.regno };
  }
  componentDidMount() {
    facade.fetchSingleCar(this.state.regno).then(res => this.setState({ dataFromServer: res }));
  }
  render() {
    var car = this.state.dataFromServer;

    return (
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <div className="well well-sm"> <h3> Car Details</h3> </div>
          <img src={car.logo} width="100px" height="100px" alt="" />
          <h2>{car.company}</h2>

          <table className="table" key="tableList">
            <tbody>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Make</th>
                <th scope="col">Model</th>
                <th scope="col">Year</th>
                <th scope="col">Regno</th>
                <th scope="col">Seats</th>
                <th scope="col">Doors</th>
                <th scope="col">Gear</th>
                <th scope="col">Aircondition</th>
                <th scope="col">Location</th>
                <th scope="col">PricePerDay</th>
                <th scope="col">Booking</th>
              </tr>
              <tr key={car.regno}>
                <td>{car.category}</td>
                <td>{car.model}</td>
                <td>{car.make}</td>
                <td>{car.year}</td>
                <td>{car.regno}</td>
                <td>{car.seats}</td>
                <td>{car.doors}</td>
                <td>{car.gear}</td>
                <td>{"" + car.aircondition}</td>
                <td>{car.location}</td>
                <td>{car.priceperday}</td>
                <td><Link to={`/bookinginfo/${car.regno}`} className="btn btn-success">Book</Link></td>
              </tr>
            </tbody>
          </table>

          <img src={car.picture} width="30%" height="30%" alt="" />

          <br /><br />

          <Link to={this.props.returnURL} className="btn btn-success">Back</Link>

        </div>
        <div className="col-sm-2"></div>
      </div>

    )
  }
}

class BookingInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { fetchURL: props.fetchURL, dataFromServer: {}, regno: props.match.params.regno };
  }
  componentDidMount() {
    facade.fetchSingleCar(this.state.regno).then(res => this.setState({ dataFromServer: res }));
  }
  render() {
    var car = this.state.dataFromServer;

    return (
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <div className="well well-sm"> <h3> Booking info</h3> </div>

          <img src={car.picture} width="30%" height="30%" alt="" />
          <br /><br />
          <p>You want to rent a <b>{car.make} {car.model}</b> from the location <b>{car.location}</b> </p>
          <p>In the period from <b>04/05/2018</b> to <b>06/05/2018</b>. </p>

          <Link to={`/bookinginfo/${car.regno}`} className="btn btn-success">Continue</Link>
          <br /><br />

          <Link to={this.props.returnURL} className="btn btn-success">Back</Link>

        </div>
        <div className="col-sm-2"></div>
      </div>

    )
  }
}


class Header extends Component {
  render() {
    return (
      <div>
        <Router>
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand">CarMondo</a>
              </div>
              <ul className="nav navbar-nav">
                <li><NavLink exact to="/">Rent Car</NavLink></li>
                {/* {this.state.userroles === "user" && <li><NavLink to="/userdata">UserData</NavLink></li>}
                {this.state.userroles === "admin" && <li><NavLink to="/admindata">AdminData</NavLink></li>} */}
                {/* <li><NavLink to="/swapi">Swapi</NavLink></li> */}
              </ul>
              <ul className="nav navbar-nav navbar-right">
                {/* <li><button onClick={this.props.logout} class='btn btn-link'> <span class="glyphicon glyphicon-log-out"></span> Logout</button></li> */}
              </ul>
            </div>
          </nav>
        </Router>
        <div>
          <span>
            {/* <div class="well well-sm"><h4> Logged in as : {this.state.username}</h4></div> */}
          </span>
        </div>
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false, locationURL: "", categoryURL: "", locValue: "", catValue: "", returnURL: "" }
  }

  setLocationURL = (url) => {
    this.setState({ locationURL: url });
  }
  setCategoryURL = (url) => {
    this.setState({ categoryURL: url });
  }
  setLocValue = (value) => {
    this.setState({ locValue: value });
  }
  setCatValue = (value) => {
    this.setState({ catValue: value });
  }
  setReturnURL = (url) => {
    this.setState({ returnURL: url });
  }


  render() {
    return (
      <div>
        <div>
          <Header />

          <Router>
            <Switch>
              <Route exact path="/" render={(props) => <RentCar catValue={this.state.catValue} setCatValue={this.setCatValue} locValue={this.state.locValue} setLocValue={this.setLocValue} setCategoryURL={this.setCategoryURL} setLocationURL={this.setLocationURL} {...props} />} />
              <Route path="/showallcars" render={(props) => <ShowCars setReturnURL={this.setReturnURL} fetchURL="" {...props} />} />
              <Route path="/showloccars" render={(props) => <ShowCars setReturnURL={this.setReturnURL} fetchURL={this.state.locationURL} {...props} />} />
              <Route path="/showcatcars" render={(props) => <ShowCars setReturnURL={this.setReturnURL} fetchURL={this.state.categoryURL} {...props} />} />
              <Route path="/details/:regno" render={(props) => <CarDetails setReturnURL={this.setReturnURL} returnURL={this.state.returnURL} {...props} />} />
              <Route path="/bookinginfo/:regno" render={(props) => <BookingInfo returnURL={this.state.returnURL} {...props} />} />

              {/* <Route path="/swapi" render={() => <FetchSwapi />} /> 
                  <Route path="/userdata" render={() => <UserData />} />
                  <Route path="/admindata" render={() => <UserData />} /> */}
              <Route component={NoMatch} />
            </Switch>
          </Router>
        </div>

        <div className="row">
          <br />
          <div className="col-md-5"></div>
          {/* {this.state.loginError &&
            <span><div class="col-md-2 alert alert-danger"> {this.state.loginError} </div></span> */}
          <div className="col-md-5"></div>
        </div>
      </div>
    )
  }
}

export default App;
