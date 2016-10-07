import React, {Component, PropTypes} from 'react';
import styles from './FileView.scss';
import IndividualFile from './individualFile.js';
import IndividualActiveFile from './individualActiveFile.js';

export default class FileView extends Component {
  constructor(props){
    super(props)
    console.log("THIS IS PROPS FOR FILEVIEW: ", this.props)
  }
  static propTypes = {};

  display (array) {

    return array.map(
        e => {
          return (
            <div key={e.path}>
              <IndividualFile
                fileName={e.path}
                id={e.sha}
                changeActiveFile={this.props.changeActiveFile.bind(this, e.sha)}
                checkoutFile = {this.props.checkoutFile.bind(this, this.props.repo.activeRepo, e.path, this.props.auth.currentUser)}
               />
            </div>
         )}
    )
  };

  activeFile (array) {
    return array.filter(e=>e.sha === this.props.activeFile)[0] || array[0]
  }

  render() {
    return (
      <div className={[styles.container, 'purple'].join(' ')}>
        <div className={styles.fileList}>
         {this.display(this.props.files)}
        </div>
        <IndividualActiveFile
          file={this.activeFile(this.props.files)}
          addComment={this.props.addCommment}
          editComment={this.props.editComment}
          removeComment={this.props.removeComment}
        />

      </div>
    )
  };
}
