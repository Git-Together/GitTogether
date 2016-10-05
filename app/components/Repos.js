import React, {Component, PropTypes} from 'react';
import styles from './Repos.scss';
import IndividualRepo from './individualRepo.js';
import IndividualActiveRepo from './individualActiveRepo.js';
import {tree} from 'd3-state-visualizer';
import { findDOMNode } from 'react-dom';
import sampleJson from '../../test/sampleApiPayload.json'
import d3tooltip from 'd3tooltip';

export default class Repos extends Component {
  constructor(props) {
    super(props)

    //FOR TESTING PURPOSES ONLY--
    this.data = sampleJson;

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
    return array.filter(e => e.id === this.props.repos.activeRepo)
  }


  componentDidMount() {
    console.log(this.props.repos.repos);
    console.log('PROPS', this.props);
    var self = this.props;
    let testObject = changeObjectTreeToKey(sampleJson.tree);
    console.log('Test Object', changeObjectTreeToKey(sampleJson.tree));

    



    //Render chart.
    this.renderChart = tree(findDOMNode(this), {
      // state: {repos: this.props.repos.repos},
      state: testObject,//CURRENTLY USING TEST OBJECT
      id: 'repoTree',
      size: 1000,
      aspectRatio: 0.5,
      isSorted: false,
      widthBetweenNodesCoeff: 1.5,
      heightBetweenNodesCoeff: 2,
      style: { border: '1px solid blue' },
      tooltipOptions: { offset: { left: 100, top: 100 }, indentationSize: 2 },
      rootKeyName: '/',
      onClickText: function(){
        //Change Active file & go to active component
        let nodeSelf = this.__data__;
        let fileName = [];
        while(nodeSelf.parent){
          fileName.unshift(nodeSelf.name);
          nodeSelf = nodeSelf.parent;
        }
        let filePath = fileName.join('/');
        self.changeActiveFileAsync('/' + filePath);
      }
    });
    this.renderChart();

    

  }

  componentWillReceiveProps(nextProps) {
    console.log('next props', nextProps);
    let visual = changeObjectArrayToKeys(nextProps.repos.repos);
    this.renderChart(visual);
  }




  render() {
    console.log(this.props)
    return (
      <div />
    )
  };
}

//Helper function to change github api 'tree' from array tree
let changeObjectTreeToKey = function (array) {
  let rtnObj = {}
  array.forEach(element => {
    var strArray = element.path.split('/');
    return addObjectIntoKey(strArray, rtnObj);
  });
  return rtnObj;
}

//Add into an Object
let addObjectIntoKey = function(strArray, obj){
  if(strArray.length === 1){
      if(strArray[0].type === "blob") return obj[strArray[0]] = 'file';
      else return obj[strArray[0]] = {};
  }
  let newObj = obj[strArray[0]];
  strArray.shift();
  return addObjectIntoKey(strArray, newObj);
}
