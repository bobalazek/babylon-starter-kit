import * as React from "react";
import * as ReactDOM from "react-dom";

export class ChatComponent extends React.Component<ChatProps, ChatState>  {
    
    constructor(props) {
        super(props);

        this.state = {
            messages: props.messages || [],
            inputValue: props.inputValue || '',
            showMessages: props.showMessages || false,
            showInput: props.showInput || false,
        };

        this.onUpdateMessages = this.onUpdateMessages.bind(this);
        this.onHandleKeyPress = this.onHandleKeyPress.bind(this);
    }

    componentDidMount() {
        window.addEventListener('chat:messages', this.onUpdateMessages);
    }

    componentWillUnmount() {
        window.removeEventListener('chat:messages', this.onUpdateMessages);
    }

    onUpdateMessages(event) {
        this.setState((prevState) => {
            return {
                messages: [
                    ...prevState.messages,
                    event.detail.messages
                ],
            };
        });
    }

    onHandleKeyPress(event) {
        if (event.key === 'Enter') {
            window.dispatchEvent(new CustomEvent('chat:messages:new', {
                detail: {
                    text: this.state.inputValue,
                },
            }));

            this.setState({ inputValue: '' });
        }
    }

    render() {
        return React.createElement(
            'div',
            {
                id: 'chat-wrapper',
            },
            React.createElement(
                'ul',
                {
                    id: 'chat',
                    className: this.state.showMessages ? '' : 'hidden',
                },
                this.state.messages.map(message => React.createElement(
                    ChatMessageComponent,
                    {
                        key: message.id,
                        message: message,
                    }
                ))
            ),
            React.createElement(
                'div', {
                    id: 'chat-input-wrapper',
                    className: this.state.showInput ? '' : 'hidden',
                },
                React.createElement('input', {
                    id: 'chat-input',
                    value: this.state.inputValue,
                    onChange: (event) => {
                        this.setState({ inputValue: event.target.value });
                    },
                    onKeyPress: this.onHandleKeyPress,
                })
            )
        );
    }

}

export class ChatMessageComponent extends React.Component<ChatMessageProps, ChatMessageState>  {
    
    constructor(props) {
        super(props);

        this.state = {
            message: {
                id: props.message.id,
                sender: props.message.sender,
                text: props.message.text,
            },
        };
    }

    render() {
        return React.createElement(
            'li',
            {
                className: 'chat-message',
            },
            React.createElement(
                'b',
                {
                    className: 'chat-message--sender',
                },
                this.state.message.sender
            ),
            React.createElement(
                'span',
                {
                    className: 'chat-message--text',
                },
                this.state.message.text
            )
        );
    }
    
}

/********** Interfaces **********/

interface ChatMessage { id: string, sender: string, text: string }

interface ChatProps {}
interface ChatState {
    messages: Array<ChatMessage>,
    inputValue: string,
    showMessages: boolean,
    showInput: boolean
}

interface ChatMessageProps {}
interface ChatMessageState { message: ChatMessage }
