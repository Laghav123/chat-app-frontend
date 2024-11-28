import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './ChatRoom.css';
import WelcomeMessage from '../shared/Button/Welcome Message/WelcomeMessage';
import { useLocation } from 'react-router-dom';

const ChatRoom = () => {
    // Dummy messages data
    const [messages, setMessages] = useState([
        { id: 1, sender: 'User1', text: 'Hello there!' },
        { id: 2, sender: 'User2', text: 'Hi! How are you?' },
        { id: 3, sender: 'User1', text: 'I am good, thank you!' },
        { id: 1, sender: 'User1', text: 'Hello there!' },
        { id: 2, sender: 'User2', text: 'Hi! How are you?' },
        { id: 3, sender: 'User1', text: 'I am good, thank you!' },
        { id: 1, sender: 'User1', text: 'Hello there!' },
        { id: 2, sender: 'User2', text: 'Hi! How are you?' },
        { id: 3, sender: 'User1', text: 'I am good, thank you!' },
        { id: 1, sender: 'User1', text: 'Hello there!' },
        { id: 2, sender: 'User2', text: 'Hi! How are you?' },
        { id: 3, sender: 'User1', text: 'I am good, thank you!' },
        { id: 1, sender: 'User1', text: 'Hello there!' },
        { id: 2, sender: 'User2', text: 'Hi! How are you?' },
        { id: 3, sender: 'User1', text: 'I am good, thank you!' },
        { id: 1, sender: 'User1', text: 'Hello there!' },
        { id: 2, sender: 'User2', text: 'Hi! How are you?' },
        { id: 3, sender: 'User1', text: 'I am good, thank you!' },
        { id: 1, sender: 'User1', text: 'Hello there!' },
        { id: 2, sender: 'User2', text: 'Hi! How are you?' },
        { id: 3, sender: 'User1', text: 'I am good, thank you!' },
        { id: 1, sender: 'User1', text: 'Hello there!' },
        { id: 2, sender: 'User2', text: 'Hi! How are you?' },
        { id: 3, sender: 'User1', text: 'I am good, thank you!' },
    ]);

    const [newMessage, setNewMessage] = useState('');
    const location = useLocation();
    const { userName } = location.state || {};
    const msgBoxRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            const newMsg = { id: messages.length + 1, sender: 'You', text: newMessage };
            setMessages([...messages, newMsg]);
            setNewMessage('');
        }
    };
    
    const scrollBottom = () => {
        if(msgBoxRef.current){
            msgBoxRef.current.scrollTop = msgBoxRef.current.scrollHeight;
        }
    }

    useEffect(()=>{
        scrollBottom();
    }, [messages])

    return (
        <>
        <WelcomeMessage userName={userName}/>
        <Container fluid className="chat-room">
            <Row>
                <Col>
                    <div className="messages-box" ref={msgBoxRef}>
                        {messages.map((msg) => (
                            <div key={msg.id} className={`message ${msg.sender === 'You' ? 'own-message' : ''}`}>
                                <strong>{msg.sender}: </strong>
                                <span>{msg.text}</span>
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form className="message-input-form" onSubmit={handleSubmit}>
                        <Form.Control
                            type="text"
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
