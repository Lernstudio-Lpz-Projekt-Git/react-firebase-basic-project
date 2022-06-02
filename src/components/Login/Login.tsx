import React, { FC } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import { Link } from 'react-router-dom';
import styles from "./Login.module.scss";

interface LoginProps {}

const Login: FC<LoginProps> = () => (
  <div className={styles.Login}>
    <header className={styles.HomeHeader}>
      <h2>LOGIN - Zum Firebase Back-End</h2>
    </header>
    <Form className={styles.loginForm}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Benutzername/E-Mail</Form.Label>
        <Form.Control type="email" placeholder="Email" />
        <Form.Text className="text-muted">
          Wir werden Ihre E-Mail niemals an Dritte weitergeben.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="success" type="submit">
        <Link className={styles.submitBtn} to="/Admin">Anmelden</Link>
      </Button>
    </Form>
    <Link className={styles.homeBtn} to="/">Startseite</Link>
  </div>
);

export default Login;
