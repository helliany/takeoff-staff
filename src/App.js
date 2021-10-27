import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/reduxStore";
import Header from "./components/Header/Header";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import HomePage from "./components/HomePage/HomePage";
import ContactsPage from "./components/ContactsPage/ContactsPage";
import LoginPage from "./components/LoginPage/LoginPage";
import {Box} from "@material-ui/core";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <Header />
          <Switch>
            <Route exact path="/"><HomePage /></Route>
            <Route exact path="/contacts"><ContactsPage /></Route>
            <Route exact path="/login"><LoginPage /></Route>
            <Route path="*"><ErrorPage /></Route>
          </Switch>
        </Box>
      </Provider>
    </Router>
  );
}

export default App;
