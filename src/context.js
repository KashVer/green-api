import React, { useState } from "react";
const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const greenApiCredentialsString = localStorage.getItem("green-api");
  const greenApiCredentials = JSON.parse(greenApiCredentialsString || "{}");

  const [idInstance, setIdInstance] = useState(greenApiCredentials.idInstance);
  const [apiTokenInstance, setApiTokenInstance] = useState(
    greenApiCredentials.apiTokenInstance,
  );
  return (
    <UserContext.Provider
      value={{
        idInstance,
        setIdInstance,
        apiTokenInstance,
        setApiTokenInstance,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const ActiveChatIdContext = React.createContext();

const ActiveChatIdProvider = ({ children }) => {
  const [activeChatId, setActiveChatId] = useState({ phone: "", chatId: "" });
  const handleOnSetActiveChatId = (phone) => {
    const formattedPhone = phone.replace(/[^0-9]+/g, "");
    setActiveChatId({ phone, chatId: `${formattedPhone}@c.us` });
  };
  return (
    <ActiveChatIdContext.Provider
      value={{
        activeChatId,
        setActiveChatId: handleOnSetActiveChatId,
      }}
    >
      {children}
    </ActiveChatIdContext.Provider>
  );
};

const MessagesContext = React.createContext();

const MessagesContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  return (
    <MessagesContext.Provider
      value={{
        messages,
        setMessages,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export {
  UserContext,
  UserProvider,
  ActiveChatIdContext,
  ActiveChatIdProvider,
  MessagesContext,
  MessagesContextProvider,
};
