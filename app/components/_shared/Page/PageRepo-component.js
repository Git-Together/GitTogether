import React, { Component, PropTypes } from 'react';
import './PageRepo.scss';
import List from '../List/List-component';
import ActiveItem from '../ActiveItem/ActiveItem-component';
import {tree} from 'd3-state-visualizer';
import { findDOMNode } from 'react-dom';
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



export default class PageRepo extends Component {
  constructor (props) {
    super(props);
    // this.state = {
    //   list: this.props.list || []
    // }
    // this.filter = this.filter.bind(this);
  }

  static propTypes = {

  };

  componentDidMount() {
      var self = this.props;
      //Call to visualize tree logic
      // let visual = changeObjectArrayToKeys(this.props.repos);
      let testObject = changeObjectTreeToKey(this.props.list);
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
          self.changeActiveFileAsync(null, '/' + filePath);
        }
      });
      this.renderChart();
    }

  componentWillMount(){
  }

  componentWillReceiveProps(nextProps) {
    let visual = changeObjectTreeToKey(nextProps.list);
    this.renderChart(visual);
  }

  render() {
    return (
      <div className="PageRepo">
      </div>
    )
  }
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
