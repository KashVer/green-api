import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { UserContext, ActiveChatIdContext, MessagesContext } from "../context";

const MessagesInput = () => {
  const [sentMessage, setSentMessage] = useState("");
  const { idInstance, apiTokenInstance } = useContext(UserContext);
  const { activeChatId } = useContext(ActiveChatIdContext);
  const { setMessages } = useContext(MessagesContext);

  const sendMessage = (e) => {
    e.preventDefault();
    axios
      .post(
        `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
        { chatId: activeChatId.chatId, message: sentMessage },
      )
      .then((response) => {
        console.log(response);
        if (response.data.idMessage) {
          setMessages((prev) => [...prev, { sender: "me", text: sentMessage }]);
          setSentMessage("");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <InputGroup className="mt-4">
        <Form.Control
          type="text"
          placeholder="Введите сообщение"
          value={sentMessage}
          onChange={(e) => setSentMessage(e.target.value)}
        />
        <Button variant="outline-secondary" onClick={sendMessage}>
          Отправить
        </Button>
      </InputGroup>
    </>
  );
};

export default MessagesInput;
