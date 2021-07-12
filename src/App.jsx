import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Analytics from "./components/Analytics";
import Statistics from "./components/Statistics";
import "./App.scss";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Footer from "./components/Footer";
import "./alerts_datestamp.json";
import "./transactions_current_datetime.json";
import fetchTransactions from "./api/fetchTransactions";
import fetchAlerts from "./api/fetchAlerts";

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
    this.setState({
      isLoaded: true,
      alerts_datestamp: await fetchAlerts(),
    });
    let reducer = [];
    this.state.alerts_datestamp.map((item) => {
      fetchTransactions(item.alertId).then((data) => {
        reducer = reducer.concat(data);
        this.setState({
          transactions_current_datetime: reducer,
        });
      });
    });
  }

  render() {
    console.log(this.state.transactions_current_datetime);
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
