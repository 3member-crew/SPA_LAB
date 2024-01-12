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

        this.state = {
            messages: messages,
        };

        this.chatInputRef = React.createRef();
    }

    setMessageList = (msgList) => {
        this.setState({ messages: msgList });
    }

    createMessage = (msgText, sender, type = "text") => {
        const msg = {
            type: type,
            text: msgText,
            title: sender,
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
        const msgId = 0;
        const msgDate = undefined; // currentDate()
        const msgText = this.chatInputRef.current.value.trim();
        const username = "user N";
        const userIsSender = true;
        const msgPosition = userIsSender ? "right" : "left";

        if (msgText.length === 0) {
            return;
        }

        const msg = {
            position: msgPosition,
            type: "text",
            title: username,
            text: msgText,
            date: msgDate,
            className: "no-scrollbar",
        };

        // this.addMessage(msg); // это добавляет сообщение в msgList только для конкретного компонента чата
        this.clearChatInput();

        if (this.props.onSendMessage) {
            this.props.onSendMessage(msg);
        }
    }

    onUserConnect = () => {
        const msgId = 0;
        const msgDate = currentDate();
        const username = "user 1";

        const msg = {
            type: "system",
            text: `${username} - зашел в комнату`,
            date: msgDate,
        };

        // this.addMessage(msg);

        if (this.props.onSendMessage) {
            this.props.onSendMessage(msg);
        }
    }

    onUserDisconnect = () => {
        const msgId = 0;
        const msgDate = currentDate();
        const username = "user 1";

        const msg = {
            type: "system",
            date: msgDate,
            text: `${username} - вышел из комнаты`,
        };

        // this.addMessage(msg);

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

