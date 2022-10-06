import React, { useState, useEffect } from 'react';


function ChatModal({raiseClick, matchId, senderId, recieverId, senderName, recieverName}) {
    const getMessagesURL = `http://localhost:9292/matches/messages/${matchId}`
    const createMessageURL = 'http://localhost:9292/messages/new'
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")

    console.log(senderName);
    
    useEffect(() => {
        // get messages
        fetch(getMessagesURL, {
            method: 'GET',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(r => r.json())
          .then(data => {
            setMessages(data);
          })

        //  get reciever name 
    }, [matchId])

    function renderMessageClass(MessageSenderId) {
        if(MessageSenderId === senderId) {
            return "sent-message"
        } else {
            return "recieved-message"
        }
    }

    function renderSenderName(messageSenderId) {
        if(messageSenderId === senderId) {
            return senderName
        } else {
            return recieverName
        }
    }

    function renderMessages() {
        return (
            messages.map(message => {
                return (
                    <div className='message-container'>
                        <div className='message'>
                            <div className={renderMessageClass(message.message_sender)}>
                                
                                <div>
                                    <span className='block bold'>{renderSenderName(message.message_sender)}</span>
                                    <span>{message.message}</span>
                                </div>

                            </div>
                        </div>
                    </div>

                )
        })
        )
    }

    function sendMessage() {
        const data = {
            match_id: matchId,
            sender_id: senderId,
            reciever_id: recieverId,
            message
        }

        fetch(createMessageURL, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(r => r.json())
        .then(data => {
            console.log(data);
            setMessages(messages => [...messages, data]);
        })
    }

    return (
        <div className="chat-container">
            <div className='chat-header'>
                <button className='mr-10' onClick={raiseClick}>back</button>
                <p>Chat with {recieverName}</p>

            </div>
            {renderMessages()}
            <div className="send-message-container">
                <input onChange={e => setMessage(e.target.value)} type="text" className="mr-10"/>
                <button className="pointer" onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default ChatModal;