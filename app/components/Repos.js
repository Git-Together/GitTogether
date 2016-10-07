import React, {Component, PropTypes} from 'react';
import styles from './Repos.scss';
import IndividualRepo from './individualRepo.js';
import IndividualActiveRepo from './individualActiveRepo.js';
import {tree} from 'd3-state-visualizer';
import { findDOMNode } from 'react-dom';
import sampleJson from '../../test/sampleApiPayload.json'
import d3tooltip from 'd3tooltip';

const DOMNode = document.getElementById('repoTree');
const root = d3.select(DOMNode);
const vis = root.append('svg');

let options = {
  offset: {left: 30, top: 10}
};

vis.selectAll('circle').data("someData").enter()
  .append('circle')
  .attr('r', 10)
  .call(
    d3tooltip(d3, 'tooltipClassName', options)
      .text((d, i) => toStringOrHtml(d))
      .attr({ 'class': 'anotherClassName' })
      .style({ 'min-width': '50px', 'border-radius': '5px' })
  )
  .on({
    mouseover(d, i) {
      d3.select(this).style({
        fill: 'skyblue'
      });
    },
    mouseout(d, i) {
      d3.select(this).style({
        fill: 'black'
      });
    }
  });



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
    return array.filter(e =>  e.id === this.props.repos.activeRepo)
  }


  componentDidMount() {
    var self = this.props;
    //Call to visualize tree logic
    // let visual = changeObjectArrayToKeys(this.props.repos);
    let testObject = changeObjectTreeToKey(this.props.repos);
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
        console.log('FilePath', filePath);
        self.changeActiveFileAsync(null, '/' + filePath);
      }
    });
    this.renderChart();



  }

  componentWillReceiveProps(nextProps) {
    let visual = changeObjectTreeToKey(nextProps.repos);
    this.renderChart(visual);
  }




  render() {
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
  console.log("THis is the return obj for individualFile.js", rtnObj)
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
