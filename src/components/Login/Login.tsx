import React, { FC } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Login.scss";
import "bootstrap/dist/css/bootstrap.min.css";

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  return (
    <div className="Login">
      <header className="HomeHeader">
        <h2>LOGIN - Zum Firebase Back-End</h2>
      </header>
      <div className="p-4 login-form loginbox">
        <h2 className="mb-3">Anmeldung Verwaltung</h2>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Benutzername/E-Mail</Form.Label>
            <Form.Control type="email" placeholder="Email" />
            <Form.Text className="text-muted">
              Wir werden Ihre E-Mail nicht an Dritte weitergeben.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="success" type="button">
              <Link className="submitBtn" to="/Admin">
                Anmelden
              </Link>
            </Button>
          </div>
        </Form>
        <div className="homeBtn">
        Login abbrechen: {" "}
          <Link  to="/">
             Startseite
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
