import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Analytics from "./components/Analytics";
import Statistics from "./components/Statistics";
import "./App.scss";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Footer from "./components/Footer";
import getTransactions from "./api/getTransactions";
import getAlerts from "./api/getAlerts";
import {
  progressBarFetch,
  setOriginalFetch,
  ProgressBar,
} from "react-fetch-progressbar";

/*Переопределение параметров для ProgressBar*/
setOriginalFetch(window.fetch);
window.fetch = progressBarFetch;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      alerts_datestamp: [],
      transactions_current_datetime: [],
    };
  }

  async componentDidMount() {
    /*Запрос для alerts*/
    this.setState({
      isLoaded: true,
      alerts_datestamp: await getAlerts(),
    });
    /*Запрос для transactions с учетом alerts*/
    let reducer = [];
    this.state.alerts_datestamp.forEach((item) => {
      getTransactions(item.alertId).then((data) => {
        reducer = reducer.concat(data);
        this.setState({
          transactions_current_datetime: reducer,
        });
      });
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Header />
          <main className="main">
            <ProgressBar />
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
                  error={this.state.error}
                  isLoaded={this.state.isLoaded}
                  alerts_datestamp={this.state.alerts_datestamp}
                  chartsInfo={this.state.transactions_current_datetime}
                />
              </Route>
            </Switch>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
