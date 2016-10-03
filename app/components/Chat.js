import React, {Component, PropTypes} from 'react';
import styles from './Chat.scss';

export default class Chat extends Component {
  constructor(props){
    super(props)
  }
  static propTypes = {};
  render() {
    return (
      <div>
        {this.props.chat.messages.map(e => (
          <div key={e.id}>
            {e.message}
            {e.userID}
            {e.id}
            {e.timeStamp.toString()}
          </div>
          ))}
      </div>
    );
  }
}

Chat.propTypes = {
  chat: React.PropTypes.any
};
