import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
//import { Col, Container, Row } from "react-bootstrap";
import Admin from "./components/Admin/Admin";
import NewWeeks from "./components/Admin/NewWeeks";
import { UserAuthContextProvider } from "./services/UserAuthContext";
import ProtectedRoute from "./services/ProtectedRoute";

function App() {
  return (
    <div className="App">
      {/* <Container> */}
        <UserAuthContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            <Route path="/new" element={<ProtectedRoute><NewWeeks /></ProtectedRoute>} />
          </Routes>
        </UserAuthContextProvider>
      {/* </Container> */}
    </div>
  );
}

export default App;
