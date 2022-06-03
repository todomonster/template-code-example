import { useState, useEffect, useRef } from "react";
import {
  Alert,
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  ButtonToolbar,
  Breadcrumb,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const url = "https://picsum.photos/200/100";

const BootstrapTest = () => {
  return (
    <Container className="App">
      <Navbar bg="light" expand="sm">
        <Navbar.Brand href="#home">React-Bootstrap測試中</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">首頁</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline="hyo">
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <ButtonToolbar>
        <Button> Default </Button>
        <Button variant="primary"> Primary </Button>
        <Button variant="success"> Success </Button>
        <Button variant="info"> Info </Button>
        <Button variant="warning"> Warning </Button>
        <Button variant="danger"> Danger </Button>
        <Button variant="link"> Link </Button>
      </ButtonToolbar>
      <Alert variant="warning">Alert</Alert>

      <ButtonToolbar>
        <Button variant="btn btn-default btn-circle">
          hyo
          <i className="fa fa-check"></i>
        </Button>
        <Button variant="btn btn-primary btn-circle">
          <i className="fa fa-list"></i>
        </Button>
        <Button variant="btn btn-success btn-circle">
          <i className="fa fa-link"></i>
        </Button>
        <Button variant="btn btn-info btn-circle">
          <i className="fa fa-check"></i>
        </Button>
        <Button variant="btn btn-warning btn-circle">
          <i className="fa fa-times"></i>
        </Button>
        <Button variant="btn btn-danger btn-circle">
          <i className="fa fa-heart"></i>
        </Button>
      </ButtonToolbar>
      <Breadcrumb>
        <Breadcrumb.Item active>hyo1</Breadcrumb.Item>
        <Breadcrumb.Item>hyo2</Breadcrumb.Item>
        <Breadcrumb.Item>hyo3</Breadcrumb.Item>
      </Breadcrumb>
      <hr />
      <LoadingButton />
      <hr />
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" scr={url} />
        <Card.Body>
          <Card.Title>為什麼沒照片R</Card.Title>
        </Card.Body>
      </Card>
      <hr />
      <Form>
        <Form.Group>
          <Form.Label>email</Form.Label>
          <Form.Control type="email" />
          <Form.Control type="password" />
          <Form.Text className="text-muted">email</Form.Text>
        </Form.Group>
      </Form>
      <hr />
      <Row>
        <Col sm={6}>sm=6</Col>
        <Col sm={3}>sm=3</Col>
        <Col sm={3}>sm=3</Col>
      </Row>
      <hr />
      <Button variant='testGreen'>TEST</Button>
    </Container>
  );
};

function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

function LoadingButton() {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);

  return (
    <Button
      variant="primary"
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}
    >
      {isLoading ? "Loading…" : "Click to load"}
    </Button>
  );
}

export default BootstrapTest;
