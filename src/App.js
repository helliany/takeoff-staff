import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
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
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/contacts" element={<ContactsPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Box>
      </Provider>
    </Router>
  );
}

export default App;
