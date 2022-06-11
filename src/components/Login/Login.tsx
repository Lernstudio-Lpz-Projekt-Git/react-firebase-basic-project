import "./Login.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { FC, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../services/UserAuthContext";

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getError, setError] = useState("");
  const { appLogIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const currUser = await appLogIn(getEmail, getPassword);
      console.log("App-Login:", currUser.uid)
      navigate("/admin");
    } catch (err:any) {
      setError(err.message);
    }
  };

  return (
    <div className="Login">
      <header className="HomeHeader">
        <h2>LOGIN - Zum Firebase Back-End</h2>
      </header>
      <div className="p-4 login-form loginbox">
        <h2 className="mb-3">Anmeldung Verwaltung</h2>
        {getError && (
          <Alert
            className="alert alert-danger error"
            role="alert"
            variant="danger"
          >
            {getError}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Benutzername/E-Mail</Form.Label>
            <Form.Control
              type="email"
              value={ getEmail }
              placeholder="Email-Adresse"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="success" type="submit">
              Anmelden
            </Button>
          </div>
        </Form>
        <div className="homeBtn">
          <p>
            Login abbrechen: <Link to="/">Startseite</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
