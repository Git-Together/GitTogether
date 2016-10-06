import React, {Component, PropTypes} from 'react';
import styles from './Chat.scss';
import IndividualMessage from './individualMessage.js';


export default class Chat extends Component {
  constructor(props){
    super(props)
    this.state = {
      inputValue: ''
    };
    // this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(e) {
    this.setState({inputValue: e.target.value});
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.postMessage(this.state.inputValue, 1, 1);
  }

  display (array) {
    return array.map(
         e => {
           return (
            <div key={e.id}>
              <IndividualMessage {...e} key="e.id" />
            </div>
                  )
              }
         )
  }

  static propTypes = {};
  render() {
    return (
      <div className={styles.container}>
        {this.display(this.props.chat.messages)}
        <div>
          <form onSubmit={this.handleSubmit}>
            <input className={styles.messageInput} value={this.state.inputValue} onChange={this.handleChange} />
            <button className='btn btn-default' type="Submit">Send</button>
          </form>
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  chat: React.PropTypes.any
};
