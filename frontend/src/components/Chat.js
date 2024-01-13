import "react-chat-elements/dist/main.css";
import { MessageList, Input, Button } from "react-chat-elements";
import React, { Component } from 'react';
import "../App.css";


const currentDate = () => {
    return new Date(Date.now());
}

class Chat extends Component {
    constructor(props) {
        super(props);
        const messages = this.props.messages ? this.props.messages : [];
        const userName = this.props.userName ? this.props.userName : "";

        this.state = {
            messages: messages,
            userName: userName,
        };

        this.chatInputRef = React.createRef();
    }

    setMessageList = (msgList) => {
        this.setState({ messages: msgList });
    }

    createMessage = (msgText, sender, userName, type = "text") => {
        const position = (userName === sender) ? "right" : "left";

        const msg = {
            type: type,
            text: msgText,
            title: sender,
            position: position,
            className: "no-scrollbar",
        };

        return msg;
    }

    addMessage = (message) => {
        this.setState(prevState => ({
            messages: [...prevState.messages, message]
        }));
    }

    clearChatInput = () => {
        this.setState({ chatInput: "" });
        this.chatInputRef.current.value = "";
    }

    onSendMessageClick = () => {
        const msgText = this.chatInputRef.current.value.trim();
        const { userName } = this.state;

        if (msgText.length === 0) {
            return;
        }

        const msg = {
            type: "text",
            title: userName,
            text: msgText,
        };

        this.clearChatInput();

        if (this.props.onSendMessage) {
            this.props.onSendMessage(msg);
        }
    }

    handleKeyDown = (event) => {
        if (event.ctrlKey && event.key === "Enter") {
            this.onSendMessageClick();
        }
    }

    render() {
        return (
            <div className="chat-container-inner">
                <div className="chat-messages-container">
                    <MessageList
                        className='message-list'
                        lockable={true}
                        toBottomHeight={'100%'}
                        dataSource={this.state.messages}
                    />
                </div>
                <div className="chat-input">
                    <Input
                        referance={this.chatInputRef}
                        placeholder="Написать сообщение..."
                        multiline={true}
                        autoHeight={false}
                        onKeyDown={this.handleKeyDown}
                        rightButtons={
                            <Button
                                text={"Отправить"}
                                onClick={this.onSendMessageClick}
                                title="Send"
                            />
                        }
                    />
                </div>
            </div>
        )
    }
}

export default Chat;

