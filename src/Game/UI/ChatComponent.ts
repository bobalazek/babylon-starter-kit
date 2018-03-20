import * as React from "react";
import * as ReactDOM from "react-dom";

export class ChatComponent extends React.Component<ChatComponentProps, ChatComponentState> {

    hideMessagesTimeout; // holds the timeout callback
    hideMessagesDelay: number = 10000; // how long should the messages stay visible after we update the messages?
    
    constructor(props) {
        super(props);

        this.state = {
            messages: props.messages || [],
            inputValue: props.inputValue || '',
            showMessages: props.showMessages || false,
            showInput: props.showInput || false,
        };

        this.onMessagesUpdate = this.onMessagesUpdate.bind(this);
        this.onInputToggle = this.onInputToggle.bind(this);
        this.onHandleKeyPress = this.onHandleKeyPress.bind(this);
    }

    componentDidMount() {
        window.addEventListener('chat:messages:update', this.onMessagesUpdate);
        window.addEventListener('chat:input:toggle', this.onInputToggle);
    }

    componentWillUnmount() {
        window.removeEventListener('chat:messages:update', this.onMessagesUpdate);
        window.removeEventListener('chat:input:toggle', this.onInputToggle);
    }

    onMessagesUpdate(event) {
        this.setState((prevState) => {
            return {
                messages: [
                    ...prevState.messages,
                    event.detail.messages
                ],
            };
        });

        this.setState({ showMessages: true });

        clearTimeout(this.hideMessagesTimeout);

        this.hideMessagesTimeout = setTimeout(() => {
            this.setState({ showMessages: false });
        }, this.hideMessagesDelay);
    }

    onInputToggle(event) {
        this.setState({ showInput: !this.state.showInput });
        this.setState({ showMessages: this.state.showInput });
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
                'div',
                {
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

interface ChatComponentProps {}
interface ChatComponentState {
    messages: Array<ChatMessage>,
    inputValue: string,
    showMessages: boolean,
    showInput: boolean
}

interface ChatMessageProps {}
interface ChatMessageState { message: ChatMessage }
