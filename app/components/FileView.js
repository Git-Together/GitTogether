import React, {Component, PropTypes} from 'react';
import styles from './FileView.scss';
import IndividualFile from './individualFile.js';
import IndividualActiveFile from './individualActiveFile.js';

export default class FileView extends Component {
  constructor(props){
    super(props)
  }
  static propTypes = {};

  display (array) {

    return array.map(
        e => {
          return (
            <div key={e.id}>
              <IndividualFile
                fileName={e.fileName}
                id={e.id}
                lastUpdated={e.lastUpdated}
                changeActiveFile={this.props.changeActiveFile.bind(this,e.id)}
               />
            </div>
         )}
    )
  };

  activeFile (array) {
    return array.filter(e=>e.fileName === this.props.activeFile)[0] || array[0]
  }

  render() {
    return (
      <div className={[styles.container, 'purple'].join(' ')}>
        {this.display(this.props.files)}
        <IndividualActiveFile
          file={this.activeFile(this.props.files)}
        />

      </div>
    )
  };
}
