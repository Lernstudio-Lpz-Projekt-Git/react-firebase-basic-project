import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import { Col, Container, Row } from "react-bootstrap";
import Admin from "./components/Admin/Admin";
import NewWeeks from './components/Admin/NewWeeks';

function App() {
  return (
    // <div className="App">
    //   <Home />
    //   <Login />
    // </div>
    <Container>
      {/* <Row>
        <Col> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/new" element={<NewWeeks />} />
      </Routes>
      {/* </Col>
    </Row> */}
    </Container>
  );
}

export default App;
