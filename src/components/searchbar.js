import React from "react";

class searchBar extends React.Component {
  state = {
    appid: "SECRET KEY",
    url: "https://api.openweathermap.org/data/2.5/weather",
    data: {},
    place:
      localStorage.getItem("place") !== null
        ? localStorage.getItem("place")
        : "",
    remember: false,
    recvdata: false,
  };

  componentDidMount() {
    var place = localStorage.getItem("place");

    if (place) {
      this.setState({ place: place });
      console.log(place);
      this.getData();
    }
  }

  getData = (event) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=${this.state.appid}&q=${this.state.place}&units=metric`;
    if (this.state.remember === true) {
      localStorage.setItem("place", this.state.place);
    }
    fetch(url)
      .then((respsonse) => respsonse.json())
      .then((data) => this.setState({ data: data, recvdata: true }));
  };

  handleChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    this.setState({ [event.target.name]: value });
  };

  presentdata() {
    if (this.state.recvdata) {
      if (this.state.data.cod !== "404") {
        var img =
          "http://openweathermap.org/img/wn/" +
          this.state.data.weather[0].icon +
          "@2x.png";
        return (
          <div className="weather-report">
            <h1>{this.state.data.name}</h1>
            <p>Main : {this.state.data.weather[0].main}</p>
            <p>Description : {this.state.data.weather[0].description}</p>
            <img src={img} className="weather-bg" alt="weather icon" />
            <h1>Main</h1>
            <p>Temp : {this.state.data.main.temp} °C</p>
            <p>Feels like : {this.state.data.main.feels_like} °C</p>
            <p>Country : {this.state.data.sys.country}</p>
          </div>
        );
      } else {
        return (
          <div className="weather-report">
            <h1>404! City not found</h1>
          </div>
        );
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="inputform">
          <div>
            <h1 className="main">
              Weather<span> React</span>
            </h1>
            <input
              type="text"
              name="place"
              value={this.state.place}
              placeholder="Enter a Place"
              onChange={this.handleChange}
            />
            <br />
            <label>
              <input
                type="checkbox"
                value={this.state.remember}
                name="remember"
                onChange={this.handleChange}
              />
              Remember my place
            </label>
            <button onClick={this.getData}>Submit</button>
          </div>
        </div>
        <div className="weather-container">{this.presentdata()}</div>
      </React.Fragment>
    );
  }
}

export default searchBar;
