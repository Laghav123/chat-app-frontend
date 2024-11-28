import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [userName, setUserName] = useState();
  const navigate = useNavigate();
  const onSubmit = (e) =>{
    e.preventDefault();
    navigate("/ChatRoom", {state:{ userName: userName }});
  }
  return (
    <div className="landing-page">
      <div className="landing-page-background"></div>
      <div className="landing-page-content">
        <Container fluid>
          <Row>
            <Col>
              <h1 className="landing-page-title">Anonymity Matters</h1>
              <Form onSubmit={onSubmit}>
                <Form.Group className="landing-page-form">
                  <Form.Control
                    type="text"
                    placeholder="What should everyone call you?"
                    className="form-control-lg"
                    required
                    onChange={(e)=>setUserName(e.target.value)}
                  />
                  <Button
                    variant="primary"
                    type="submit"
                    className="btn-lg ms-2"
                  >
                    Enter
                  </Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default LandingPage;
