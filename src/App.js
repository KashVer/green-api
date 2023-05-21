import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Contacts from "./components/Contacts";
import MessagesInput from "./components/MessagesInput";
import {
  ActiveChatIdProvider,
  MessagesContextProvider,
  UserProvider,
} from "./context";
import ModalAuth from "./components/ModalAuth";
import MessagesArea from "./components/MessagesArea";

function App() {
  return (
    <UserProvider>
      <ActiveChatIdProvider>
        <ModalAuth />
        <Container className="bg-light">
          <Row className="vh-100">
            <Col xs={5}>
              <Contacts />
            </Col>
            <Col className="d-flex justify-content-end flex-column pb-4">
              <MessagesContextProvider>
                <MessagesArea />
                <MessagesInput />
              </MessagesContextProvider>
            </Col>
          </Row>
        </Container>
      </ActiveChatIdProvider>
    </UserProvider>
  );
}

export default App;
