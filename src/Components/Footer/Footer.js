import React from "react";
import AuthService from "../../services/auth.service";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Footer({ user, setUser }) {
  let navigate = useNavigate();

  const navigateToAdmin = () => {
    AuthService.logout();
    navigate("/admin");
  };

  const logOut = () => {
    AuthService.logout();
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <div className="d-flex justify-content-center position-fixed bottom-0 w-100">
        <Button
          variant="info"
          className="m-2"
          onClick={() => {
            navigateToAdmin();
          }}
        >
          ADMIN
        </Button>
        <Button
          variant="danger"
          className="m-2"
          onClick={() => {
            logOut();
          }}
        >
          LOGOUT
        </Button>
      </div>
    </>
  );
}
