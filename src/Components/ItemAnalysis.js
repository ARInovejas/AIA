/* eslint-disable */
import React, { Component, useState } from 'react';
import {Link} from 'react-router-dom';
import { CSVLink } from 'react-csv';
import './css/ItemAnalysis.css';

var autoBind = require('auto-bind');
//initialize arrays
var item_freq = []
var nswgrs = []
var rank_arr = []
for (var i = 0; i < 50; i++) {
  item_freq.push(0)
  nswgrs.push(0)
  rank_arr.push(null)
}
nswgrs.push(0)

var headers = [
  { label: 'Subject', key: 'subject' },
  { label: 'Year and Section', key: 'section' },
  { label: 'Total Number of Students', key: 'total_num_of_students' },
  { label: 'Item Number', key: 'item_num' },
  { label: 'Frequency of Error', key: 'item_froe' },
  { label: 'Rank', key: 'foe_rank' },
  { label: 'Raw Score', key: 'rawscore' },
  { label: 'Number of Students who got the Raw Score', key: 'ns_rawscore' },
  { label: 'Product (Raw Score x Number of Students who got the Raw Score)', key: 'prod' },
  { label: 'Mean', key: 'mean' },
  { label: 'Students above mean', key: 'students_above_mean' },
  { label: 'Students equals mean', key: 'students_equals_mean' },
  { label: 'Students below mean', key: 'students_below_mean' }
]

var data = [];
class ItemAnalysis extends Component{
  constructor(props){
    super(props)
    this.state = {
      user: "",
      subject: "",
      filename: "Untitled",
      total_rawscore: 0,
      total_num_of_students: 0,
      number_of_items: 10,
      mean: 0,
      students_above_mean: 0,
      students_equals_mean: 0,
      students_below_mean: 0,
      section: "",
      item_foe: item_freq.slice(),
      num_of_studs_rawscore: nswgrs.slice(),
      product: nswgrs.slice(),
      rank: rank_arr.slice()
    }
    autoBind(this);
  }

  filenameHandler(e){
    this.setState({filename: e.target.value}, this.arrangeData);
    
  }

  sectionHandler(e){
    this.setState({section: e.target.value}, this.arrangeData);
    
  }

  subjectHandler(e){
    this.setState({subject: e.target.value}, this.arrangeData);
    
  }

  numitemsHandler(e) {
    var val = parseInt(e.target.value);
    this.setState({number_of_items: val});
    item_freq = [];
    nswgrs = [];
    rank_arr = [];
    for (var i = 0; i < val; i++) {
      item_freq.push(0)
      nswgrs.push(0)
      rank_arr.push(null)
    }
    nswgrs.push(0);

    this.setState({
      item_foe: item_freq.slice(),
      num_of_studs_rawscore: nswgrs.slice()(),
      product: nswgrs.slice(),
      rank: rank_arr.slice()
    }, this.arrangeData);
    
  }

  itemHandler(e) {
    var val = parseInt(e.target.value);
    var foe = this.state.item_foe;
    foe[e.target.id] = val;
    this.setState({item_foe: foe});
    
    var rankarray = this.updateRank(foe);
    this.setState({rank: rankarray}, this.arrangeData);
  }

  updateRank(foe){
    var rankarray = this.state.rank;
    var rank_checker;
    var newfoe = foe.slice();
    var highest_foes = newfoe.sort((a,b) => b-a).slice(0,10);
    if(highest_foes[0] != 0){
      for (let i = 0; i < foe.length; i++) {
        const element = foe[i];
        if(highest_foes.includes(element) && element != 0){          
          rank_checker = highest_foes.indexOf(element) + 1;
          if(rank_checker == 1){
            rank_checker = "1st";
          }else if(rank_checker == 2){
            rank_checker = "2nd";
          }else if(rank_checker == 3){
            rank_checker = "3rd";
          }else{
            rank_checker = rank_checker.toString().concat("th");
          }
          rankarray[i] = rank_checker;
        }else{
          rankarray[i] = null;
        }
      }
    }

    return rankarray;
  }

  totalHandler(e) {
    this.setState({total_num_of_students: parseInt(e.target.value)});

    var meanval = this.computeMean(e.target.value);

    this.setState({mean: meanval}, () => {this.updateStudents(Math.round(meanval))});
  }

  scoreHandler(e) {
    var val = parseInt(e.target.value);
    var stdnts = this.state.num_of_studs_rawscore;
    var prod = this.state.product;
    stdnts[e.target.id] = val;
    prod[e.target.id] = e.target.id * val;
    
    var total = this.state.total_num_of_students;
    var meanval = this.computeMean(total);
    
    this.setState({
      num_of_studs_rawscore: stdnts,
      product: prod,
      mean: meanval
    }, () => {this.updateStudents(Math.round(meanval))});
    
  }

  computeMean(total){
    var prod = this.state.product;
    var sum = 0;
    for (let i = 0; i < prod.length; i++) {
      sum += prod[i];
    }
    this.setState({total_rawscore: sum});
    var meanval = sum/total;

    return meanval;
  }

  updateStudents(mean){
    var stdnts = this.state.num_of_studs_rawscore;

    this.setState({students_equals_mean: stdnts[mean]});

    var below = 0;
    var above = 0;

    for (let i = 0; i < stdnts.length; i++) {
      if(i < mean){
        below += stdnts[i];
      }
      if(i > mean){
        above += stdnts[i];
      }
    }

    this.setState({students_below_mean: below});
    this.setState({students_above_mean: above}, this.arrangeData);
  }


  createItems(){
    var table_d = []
    var num_items = this.state.number_of_items
    for (var i = 0; i < num_items; i++) {

      table_d.push( 
          <tr>
            <td >{i+1} </td>
            <td> <input type="number" key={i} id={i} defaultValue={0} onChange={this.itemHandler}></input> </td>
            <td>{this.state.rank[i]}</td>
            <td>{num_items-i} </td>
            <td> <input type="number" key={num_items-i} id={num_items-i} defaultValue={0} onChange={this.scoreHandler}></input> </td>
            <td>{this.state.product[num_items-i]} </td>
          </tr>
      )
    }
    table_d.push(
      <tr>
        <td ></td>
        <td></td>
        <td></td>
        <td>0</td>
        <td> <input type="number" key={0} id={0} defaultValue={0} onChange={this.scoreHandler}></input> </td>
        <td>{this.state.product[0]} </td>
      </tr>
      )
      table_d.push(
        <tr>
          <td ></td>
          <td></td>
          <td></td>
          <td>Total</td>
          <td></td>
          <td> {this.state.total_rawscore} </td>
        </tr>
        )
    return table_d;
    
  }

  arrangeData(){
    data = [this.state];
    var total = this.state.number_of_items;
    var item_froe1 = this.state.item_foe;
    var foe_rank1 = this.state.rank;
    var ns_rawscore1 = this.state.num_of_studs_rawscore;
    var prod1 = this.state.product;

    for (let i = 0; i < total; i++) {
      data.push(
        {
          item_num: i+1,
          item_froe: item_froe1[i],
          foe_rank: foe_rank1[i],
          rawscore: total-i,
          ns_rawscore: ns_rawscore1[total-i],
          prod: prod1[total-i]
        }
      )
    }
    data.push(
      {
        rawscore: 0,
        ns_rawscore: ns_rawscore1[0],
        prod: prod1[0]
      }
    );
    data.push(
      {
        rawscore: "Total",
        prod: this.state.total_rawscore
      }
    );
    console.dir(data);
    this.render();
  }

  render(){
    return(
      <div>
      <div class="feed"> 
        <Link to="/">Back</Link>
        <table class="bordered">
        <tbody>
        <tr>
        </tr>
        </tbody>
        </table>
        <div>
        {/*item analysis table (excel like)*/}
        <div id="edittables">
          <table>
          <tbody>
            <tr>
            <td> <input type="text" key={10140} id={10140} onChange={this.filenameHandler} placeholder={"Untitled"}></input> </td>
            </tr>
            <tr>
            <td ><b>Number of Items</b> <input type="number" key={10141} id={10141} onChange={this.numitemsHandler} default={10} placeholder={10}></input> </td>
              <td ><b>Total number of students</b> <input type="number" key={10141} id={10141} onChange={this.totalHandler}></input> </td>
              <td> <b>Year and Section</b> <input type="text" key={10142} id={10142} onChange={this.sectionHandler} placeholder={"Year and Section"}></input> </td>
              <td> <b>Subject </b><input type="text" key={10143} id={10143} onChange={this.subjectHandler} placeholder={"Subject"}></input> </td>
            </tr>
            <tr>
              <td id="stick"><b>Item Number</b></td>
              <td id="stick"><b>Frequency of Error</b></td>
              <td id="stick"><b>Rank</b></td>
              <td id="stick"><b>Raw Score</b></td>
              <td id="stick"><b>Number of Students who got the Raw Score</b></td>
              <td id="stick"><b>Product (Raw Score x Number of Students who got the Raw Score)</b></td>
              {/* Download button */}
              <td id="stick"> <CSVLink data={data} headers={headers} filename={this.state.filename +".csv"} onClick={this.arrangeData}>
              <b>Save File</b> </CSVLink> </td>
            </tr>
              {this.createItems()}
            <tr>
              <td ><b>Mean</b></td>
              <td>{this.state.mean}</td>
            </tr>
            <tr>
              <td ><b>Students above mean</b></td>
              <td>{this.state.students_above_mean}</td>
            </tr>
            <tr>
              <td ><b>Students equals mean (rounded off)</b></td>
              <td>{this.state.students_equals_mean}</td>
            </tr>
            <tr>
              <td ><b>Students below mean</b></td>
              <td>{this.state.students_below_mean}</td>
            </tr>
          </tbody>
          </table>
        </div>
        </div>
      </div>
      </div>
    )
  }
}

export default ItemAnalysis;