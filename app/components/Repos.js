import React, {Component, PropTypes} from 'react';
import styles from './Repos.scss';
import IndividualRepo from './individualRepo.js';
import IndividualActiveRepo from './individualActiveRepo.js';
import {tree} from 'd3-state-visualizer';
import { findDOMNode } from 'react-dom';

export default class Repos extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {};
  display(array) {

    return array.map(
      e => {
        console.log("e", e)
        return (
          <div key={e.id}>
            <IndividualRepo
              name={e.name}
              id={e.id}
              />
          </div>
        )
      }
    )
  };

  activeRepo(array) {
    return array.filter(e => e.id === this.props.repos.activeRepo)[0]
  }


  componentDidMount() {
    console.log(this.props.repos.repos);

    //Helper function to change from list of arrays to keys to display on tree
    let changeObjectArrayToKeys = function (array) {
      let rtnObj = {}
      array = array.forEach(element => {
        let arrayObj;
        if (Array.isArray(element.repos)) arrayObj = changeObjectArrayToKeys(element.repos);
        let newObj = {}
        newObj[element.type] = element.type;
        rtnObj[element.name] = newObj;
        if(arrayObj) rtnObj[element.name].repos = arrayObj;
      });
      return rtnObj;
    }

    //Call to visualize tree logic
    let visual = changeObjectArrayToKeys(this.props.repos.repos);
    console.log('Visual Object', visual);
    
    //Render chart.
    this.renderChart = tree(findDOMNode(this), {
      // state: {repos: this.props.repos.repos},
      state: visual,
      id: 'repoTree',
      size: 1000,
      aspectRatio: 0.5,
      isSorted: false,
      widthBetweenNodesCoeff: 1.5,
      heightBetweenNodesCoeff: 2,
      style: { border: '1px solid black' },
      tooltipOptions: { offset: { left: 100, top: 100 }, indentationSize: 2 },
      rootKeyName: 'Head'
    });
    this.renderChart();
    }

  componentWillReceiveProps(nextProps) {
    this.renderChart(nextProps.tree || nextProps.state);
  }




  render() {
    console.log(this.props)
    return (
      // <div className={[styles.container, 'purple'].join(' ')}>
      //   {this.display(this.props.repos.repos)}
      //   <IndividualActiveRepo repo={this.activeRepo(this.props.repos.repos)}/>
      // </div>
      <div />
    )
  };
}

