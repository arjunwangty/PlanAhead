import React, { Component } from "react";
import Sem from "./sem";
import {message} from "antd";

class NPlanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      semesters: [
        { id: "s1", year: "Year 1", semester: "Semester 1" },
        { id: "s3", year: "Year 1", semester: "Semester 2" },
        { id: "s5", year: "Year 2", semester: "Semester 1" },
        { id: "s7", year: "Year 2", semester: "Semester 2" },
        { id: "s9", year: "Year 3", semester: "Semester 1" },
        { id: "s11", year: "Year 3", semester: "Semester 2" },
        { id: "s13", year: "Year 4", semester: "Semester 1" },
        { id: "s15", year: "Year 4", semester: "Semester 2" }
      ]
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleChoose = this.handleChoose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleAdd() {
    var semesters = this.state.semesters;
    if(semesters.filter((s)=>(s.id==='t')).length>0){return ;}
    this.setState(prevState =>
      prevState.semesters.push({
        id: "t",
        onChoose: this.handleChoose,
        semester: "Semester",
        onDelete: this.handleDelete
      })
    );
  }

  handleChoose(e) {
    const code = e;
    const exist = "s"+code;
    const semesters = this.state.semesters;
    if (code!=="17"&&semesters.filter((s)=>{return parseInt(s.id.substring(1))>parseInt(code)&&s.id!=='t'}).length===0){
      return ;
    }
    const index = "t";
    const ind = semesters.findIndex(x => x.id === index);
    semesters.splice(ind, 1);
    if (semesters.filter((s)=>(s.id===exist)).length>0){
      message.warning("exist", 3);
      return;
    }

    if (semesters.filter(x => x.id === "s" + code).length === 0) {
      if (code === "17") {
        semesters.push({
          id: "s17",
          year: "Year 5",
          semester: "Semester 1",
          onDelete: this.handleDelete
        });
        semesters.push({
          id: "s19",
          year: "Year 5",
          semester: "Semester 2",
          onDelete: this.handleDelete
        });
      } else {
        semesters.push({
          id: "s" + code,
          year: "Year " + (Math.floor((parseInt(code) - 1) / 4) + 1),
          semester: "Vacation " + (4 - (parseInt(code) % 4)) / 2,
          onDelete: this.handleDelete
        });
      }
    } else {
    }

    this.setState({
      semesters: semesters.sort(
        (a, b) =>
          Number(a.id.toString().substring(1)) -
          Number(b.id.toString().substring(1))
      )
    });
  }

  handleDelete(e) {
    const index = e.target.value;
    let sem = document.getElementById(index);
    let count = 0;
    while(sem.hasChildNodes()&&sem.lastChild.getAttribute('name')!==null){
      let lastChild = sem.lastChild;
      count+=parseInt(lastChild.firstChild.getAttribute("mc"));
      sem.removeChild(lastChild);
      if(lastChild.getAttribute('name')==='firstMajor'){
        document.getElementById('SideBarContainer').append(lastChild);
      }else if(lastChild.getAttribute('name')==='additional'){
        document.getElementById('SearchBarContainer').append(lastChild);
      }
    }
    document.getElementById('totalmc').innerText-=count;
    const ind = this.state.semesters.findIndex(x => x.id === index);
    this.setState({
      semester: this.state.semesters.splice(ind, 1)
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.semesters.map(sem => (
          <Sem
            id={sem.id}
            key={sem.id}
            year={sem.year}
            semester={sem.semester}
            onChoose={sem.onChoose}
            onDelete={sem.onDelete}
          />
        ))}
        <button
          className="btn btn-info"
          style={{
            height: "40px",
            width: "40px",
            border: "solid",
            color: "white",
            borderRadius: "50%",
            padding: "5px",
            textAlign: "center",
            display: "inline-block",
            fontSize: "20px",
            margin: "2px",
            paddingTop: "0px"
          }}
          onClick={this.handleAdd}
        >
          +
        </button>
      </React.Fragment>
    );
  }
}

export default NPlanner;
