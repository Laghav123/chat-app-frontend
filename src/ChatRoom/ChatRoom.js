import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './ChatRoom.css';
import WelcomeMessage from '../shared/Welcome Message/WelcomeMessage';
import { useLocation, useNavigate } from 'react-router-dom';

const ChatRoom = () => {
    // Dummy messages data
    const [messages, setMessages] = useState([]);
    let ws = useRef(null);

    const [newMessage, setNewMessage] = useState('');
    const location = useLocation();
    const { userName } = location.state || {};
    const msgBoxRef = useRef(null);
    const initialized = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(initialized.current) return;
        initialized.current = true;
        
        // connecting to server and establishing WebSockets events
        const params = new URLSearchParams({ userName: userName });
        ws.current = new WebSocket(`wss://anonymous-chat-app-95aeb15099d7.herokuapp.com/chatroom?${params.toString()}`);

        ws.current.onopen = () => {
            console.log("WebSocket connection established.");
        };

        ws.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        ws.current.onerror = (error) => {
            console.error("WebSocket error: ", error);
            navigate("/");
        };

        ws.current.onclose = () => {
            console.log("WebSocket connection closed.");
            alert("The connection was closed. Redirecting to the home page.");
            navigate("/");
        };

        return () => {
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                ws.current.close();
            }
        };
    }, [userName, navigate]);


    const handleSendMsg = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            const newMsg = { from: userName, content: newMessage };
            if(ws?.current && ws.current.readyState === WebSocket.OPEN){
                ws.current.send(JSON.stringify(newMsg));
            }
        }
        setNewMessage('');
    };

    const scrollBottom = () => {
        if (msgBoxRef.current) {
            msgBoxRef.current.scrollTop = msgBoxRef.current.scrollHeight;
        }
    }

    useEffect(() => {
        scrollBottom();
    }, [messages])

    return (
        <>
            <WelcomeMessage userName={userName} />
            <Container fluid className="chat-room">
                <Row>
                    <Col>
                        <div className="messages-box" ref={msgBoxRef}>
                            {messages.map((msg) => (
                                <div key={msg.id} className={`message ${msg.from === userName ? 'own-message' : ''}`}>
                                    <strong>{msg.from}: </strong>
                                    <span>{msg.content}</span>
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form className="message-input-form" onSubmit={handleSendMsg}>
                            <Form.Control
                                type="content"
                                placeholder="Type your message here..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="message-input"
                            />
                            <Button variant="primary" className="send-button" type='submit'>
                                Send
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ChatRoom;
