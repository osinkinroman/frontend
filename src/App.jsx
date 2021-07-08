import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Analytics from "./components/Analytics";
import Statistics from "./components/Statistics";
import "./App.scss";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Footer from "./components/Footer";
import "./example.json";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      alerts_datestamp: [],
      transactions_current_datetime: [],
      chartsInfo: [],
    };
  }

  componentDidMount() {
    const data = require("./example.json");
    const stats = require("./statistics.json");
    this.setState({
      isLoaded: true,
      alerts_datestamp: data.alerts_datestamp,
      transactions_current_datetime: data.transactions_current_datetime,
      chartsInfo: stats.transactions_current_datetime,
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Header />
          <main className="main">
            <Switch>
              <Redirect from="/" to="/home" exact />
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/analytics">
                <Analytics
                  error={this.state.error}
                  isLoaded={this.state.isLoaded}
                  alerts_datestamp={this.state.alerts_datestamp}
                  transactions_current_datetime={
                    this.state.transactions_current_datetime
                  }
                />
              </Route>
              <Route path="/statistics">
                <Statistics
                  alerts_datestamp={this.state.alerts_datestamp}
                  chartsInfo={this.state.chartsInfo}
                />
              </Route>
            </Switch>
          </main>
        </div>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
