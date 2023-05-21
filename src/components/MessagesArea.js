import axios from "axios";
import React, { useContext, useEffect, useRef } from "react";
import { UserContext, MessagesContext } from "../context";

const MessagesArea = () => {
  const { idInstance, apiTokenInstance } = useContext(UserContext);
  const { messages, setMessages } = useContext(MessagesContext);

  const receivingMessageTimer = useRef(null);

  const deleteNotification = (receiptId) => {
    axios.delete(
      `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`,
    );
  };

  const receiveNotification = () => {
    axios
      .get(
        `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`,
      )
      .then((res) => {
        if (res.data) {
          const receiptId = res.data.receiptId;
          const receivedMessage =
            res.data.body.messageData.textMessageData.textMessage;
          setMessages((prev) => [
            ...prev,
            { sender: "client", text: receivedMessage },
          ]);
          deleteNotification(receiptId);
        }
      });
  };

  useEffect(() => {
    if (
      !receivingMessageTimer.current &&
      Boolean(idInstance) &&
      Boolean(apiTokenInstance)
    ) {
      receivingMessageTimer.current = setInterval(receiveNotification, 5500);
    }
  }, [receivingMessageTimer, idInstance, apiTokenInstance]);

  return (
    <>
      {messages.map((message, index) => {
        return (
          <p
            key={`${message.text}${index}`}
            className={`${
              message.sender === "me" ? "align-self-end" : "align-self-start"
            }`}
          >
            {message.text}
          </p>
        );
      })}
    </>
  );
};

export default MessagesArea;
