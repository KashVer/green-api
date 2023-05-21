import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { UserContext } from "../context";

const ModalAuth = () => {
  const { idInstance, setIdInstance, apiTokenInstance, setApiTokenInstance } =
    useContext(UserContext);

  const [isVisible, setIsVisible] = useState(
    !(Boolean(idInstance) && Boolean(apiTokenInstance)),
  );

  const login = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.green-api.com/waInstance${idInstance}/GetSettings/${apiTokenInstance}`,
      )
      .then(() => {
        setIsVisible(false);
        localStorage.setItem(
          "green-api",
          JSON.stringify({ idInstance, apiTokenInstance }),
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      {isVisible && (
        <>
          <div className="modal show bg-light d-block">
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>Авторизация</Modal.Title>
              </Modal.Header>
              <Form onSubmit={login}>
                <Modal.Body className="d-flex flex-column">
                  <Form.Group className="mb-4">
                    <Form.Label>Введите idInstance</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Введите idInstance"
                      required
                      value={idInstance}
                      onChange={(e) => setIdInstance(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Введите apiTokenInstance</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Введите apiTokenInstance"
                      required
                      value={apiTokenInstance}
                      onChange={(e) => setApiTokenInstance(e.target.value)}
                    />
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer className="justify-content-start">
                  <Button variant="primary" type="submit">
                    Войти
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Dialog>
          </div>
        </>
      )}
    </>
  );
};

export default ModalAuth;
