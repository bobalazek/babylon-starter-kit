import * as React from "react";
import * as ReactDOM from "react-dom";

export class ChatComponent extends React.Component<ChatProps, ChatState>  {
    
    constructor(props) {
        super(props);

        this.state = {
            messages: props.messages,
            isActive: true,
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange() {

    }

    render() {
        return React.createElement(
            'div',
            {
                id: 'chat-wrapper',
                className: this.state.isActive ? 'active' : '',
            },
            React.createElement(
                'ul',
                {
                    id: 'chat',
                },
                this.state.messages.map(message => React.createElement(
                    ChatMessageComponent,
                    { message: message }
                ))
            ),
            React.createElement('input', {
                id: 'chat-input',
            })
        );
    }

}

export class ChatMessageComponent extends React.Component<ChatMessageProps, ChatMessageState>  {
    
    constructor(props) {
        super(props);

        this.state = {
            message: {
                sender: props.message.sender,
                text: props.message.text,
            },
        };
    }

    render() {
        return React.createElement(
            'li',
            { className: 'chat-message' },
            React.createElement(
                'b',
                { className: 'chat-message--sender' },
                this.state.message.sender
            ),
            React.createElement(
                'span',
                { className: 'chat-message--text' },
                this.state.message.text
            )
        );
    }
    
}

/********** Interfaces **********/

interface ChatMessage { sender: string, text: string }

interface ChatProps {}
interface ChatState { messages: Array<ChatMessage>, isActive: boolean }

interface ChatMessageProps {}
interface ChatMessageState { message: ChatMessage }
