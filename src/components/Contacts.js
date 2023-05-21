import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { ActiveChatIdContext } from "../context";
import InputMask from "react-input-mask";

const Contacts = () => {
  const [phone, setPhone] = useState("");
  const { activeChatId, setActiveChatId } = useContext(ActiveChatIdContext);

  const handleOnWriteClick = () => {
    setActiveChatId(phone);
    setPhone("");
  };

  return (
    <>
      <InputGroup className="mt-4">
        <InputMask
          placeholder="+7 (999) 1234567"
          mask={"+\\7 (999) 9999999"}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        >
          {(inputProps) => <Form.Control {...inputProps} type="tel" />}
        </InputMask>
        <Button variant="outline-secondary" onClick={handleOnWriteClick}>
          Написать
        </Button>
      </InputGroup>
      <p className="mt-3">{activeChatId.phone}</p>
    </>
  );
};

export default Contacts;
