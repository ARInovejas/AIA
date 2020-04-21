/* eslint-disable */
import React, { Component } from 'react';
import { Table, Button, Input, MediaBox, Modal, Icon } from 'react-materialize';
import { Parallax } from 'react-parallax';
import url from '../hosturl';
import axios from 'axios';
import './css/ItemAnalysis.css';

var autoBind = require('auto-bind');

var item_freq = []
var nswgrs = []
for (var i = 0; i < 50; i++) {
  item_freq.push(0)
  nswgrs.push(0)
}
nswgrs.push(0)


class ItemAnalysis extends Component{
  constructor(props){
    super(props)
    this.state = {
      empno: "",
      email: "",
      fname: "",
      lname: "",
      position: "",
      department: "",
      year_level: "",
      itemanalysis_id: "",
      total_rawscore: 0,
      total_num_of_students: 49,
      number_of_items: 50,
      mean: 0,
      students_above_mean: 0,
      students_equals_mean: 0,
      students_below_mean: 0,
      section: "",
      item_foe: item_freq,
      num_of_studs_rawscore: nswgrs,
      product: nswgrs
    }
    autoBind(this);
  }

  itemHandler(e) {
    var foe = this.state.item_foe;
    foe[e.target.id] = e.target.value;
    this.setState({item_foe: foe});
  }

  scoreHandler(e) {
    var stdnts = this.state.num_of_studs_rawscore;
    var prod = this.state.product;
    stdnts[e.target.id] = e.target.value;
    prod[e.target.id] = e.target.id * e.target.value;

    //compute mean
    var sum = 0;
    var total = this.state.total_num_of_students;

    for (let i = 0; i < prod.length; i++) {
      sum += prod[i];
    }

    var meanval = sum/total;

    this.setState({num_of_studs_rawscore: stdnts});
    this.setState({product: prod});
    this.setState({mean: meanval});
  }


  createItems(){
    var table_d = []
    var num_items = this.state.number_of_items
    for (var i = 0; i < num_items; i++) {

      table_d.push( 
          <tr>
            <td id="stick">{i+1} </td>
            <td> <Input type="number" key={i} id={i} onChange={this.itemHandler}></Input> </td>
            <td>{/*insert rank of an item*/}</td>
            <td>{num_items-i} </td>
            <td> <Input type="number" key={num_items-i} id={num_items-i} onChange={this.scoreHandler}></Input> </td>
            <td>{this.state.product[num_items-i]} </td>
          </tr>
      )
    }
    table_d.push(
      <tr>
        <td id="stick"></td>
        <td></td>
        <td></td>
        <td>0</td>
        <td> <Input type="number" key={0} id={0} onChange={this.scoreHandler}></Input> </td>
        <td>{this.state.product[0]} </td>
      </tr>)
    return table_d;
    
  }

  render(){
    return(
      <div> 

        <Table class="bordered">
        <tbody>
        <tr>
        </tr>
        </tbody>
        </Table>
        <div>
        {/*item analysis table (excel like)*/}
        <div id="editTables">
          <Table>
          <tbody>
            <tr>
              <td id="stick"><b>Item Number</b></td>
              <td id="stick"><b>Frequency of Error</b></td>
              <td id="stick"><b>Rank</b></td>
              <td id="stick"><b>Raw Score</b></td>
              <td id="stick"><b>Number of Students who got the Raw Score</b></td>
              <td id="stick"><b>Product (Raw Score x Number of Students who got the Raw Score)</b></td>
            </tr>
              {this.createItems()}
            <tr>
              <td id="stick"><b>Mean</b></td>
              <td>{this.state.mean}</td>
            </tr>
          </tbody>
          </Table>
        </div>
        </div>
      </div>
    )
  }
}

export default ItemAnalysis;