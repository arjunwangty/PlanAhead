import React, { Component } from "react";
import Sem from "./sem";
import { message } from "antd";
import storage from "../component/storage";
import "../style/planner.less";

class NPlanner extends Component {
  constructor(props) {
    super(props);
    const { adyear, major, init } = this.props;
    const all = storage.getYM(adyear, major);
    if (init) {
      this.state = {
        semesters: [
          ["s1", 0, []],
          ["s3", 0, []],
          ["s5", 0, []],
          ["s7", 0, []],
          ["s9", 0, []],
          ["s11", 0, []],
          ["s13", 0, []],
          ["s15", 0, []]
        ]
      };
    } else {
      let list = [];
      let i = 0;
      while (i < 20) {
        i++;
        if ("s" + i in all) {
          list.push([
            "s" + i,
            parseInt(storage.getYMCol(adyear, major, `${"s" + i}button`))
          , storage.getYMCol(adyear, major, `${"s" + i}`)]);
        }
      }
      this.state = { semesters: list };
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.handleChoose = this.handleChoose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.year=this.year.bind(this);
    this.semester=this.semester.bind(this);
  }
  render() {
    return (
      <div className="planner">
        {this.state.semesters.map(sem => (
          <Sem
            id={sem[0]}
            key={sem[0]}
            year={this.year(sem[0])}
            semester={this.semester(sem[0])}
            onChoose={this.handleChoose}
            onDelete={this.handleDelete}
            adyear={this.props.adyear}
            major={this.props.major}
            button={sem[1]}
            modules={sem[2]}
          />
        ))}
        <button className="plus" onClick={this.handleAdd}>
          +
        </button>
      </div>
    );
  }

  handleAdd() {
    const { adyear, major } = this.props;
    var semesters = this.state.semesters;
    if (semesters.filter(s => s[0] === "t").length > 0) {
      return;
    }
    this.setState(prevState => prevState.semesters.push(["t", 0, []]));
    storage.addNewCol(adyear, major, "t");
  }

  handleChoose(e) {
    const { adyear, major } = this.props;
    const code = e;
    const exist = "s" + code;
    const semesters = this.state.semesters;
    if (
      code === "19" &&
      semesters.filter(s => {
        return parseInt(s[0].substring(1)) === 17;
      }).length === 0
    ) {
      return;
    }
    if (
      code !== "17" &&
      code !== "19" &&
      semesters.filter(s => {
        return parseInt(s[0].substring(1)) > parseInt(code) && s[0] !== "t";
      }).length === 0
    ) {
      return;
    }
    const index = "t";
    const ind = semesters.findIndex(x => x[0] === index);
    semesters.splice(ind, 1);
    if (semesters.filter(s => s[0] === exist).length > 0) {
      message.warning("this semester already exists in your timetable", 5);
      return;
    }

    if (semesters.filter(x => x[0] === "s" + code).length === 0) {
      semesters.push(["s" + code, 0, []]);
      storage.addNewCol(adyear, major, "s" + code);
    }

    this.setState({
      semesters: semesters.sort(
        (a, b) =>
          Number(a[0].toString().substring(1)) -
          Number(b[0].toString().substring(1))
      )
    });
  }

  handleDelete(e) {
    const { adyear, major } = this.props;
    const index = e.target.value;
    let sem = document.getElementById(index);
    let count = 0;
    while (sem.hasChildNodes() && sem.lastChild.getAttribute("name") !== null) {
      let lastChild = sem.lastChild;
      count += parseInt(lastChild.firstChild.getAttribute("mc"));
      sem.removeChild(lastChild);
      if (lastChild.getAttribute("name") === "firstMajor") {
        document.getElementById("SideBarContainer").append(lastChild);
        storage.dndChange(
          adyear,
          major,
          index,
          "SideBarContainer",
          lastChild.firstChild.id,
          "rgb(84,169,139)"
        );
      } else if (lastChild.getAttribute("name") === "additional") {
        document.getElementById("SearchBarContainer").append(lastChild);
        storage.dndChange(
          adyear,
          major,
          index,
          "SearchBarContainer",
          lastChild.firstChild.id,
          "rgb(120,206,179)"
        );
      }
    }
    document.getElementById("totalmc").innerText -= count;
    storage.changeTotalMc(adyear, major, -count);
    const ind = this.state.semesters.findIndex(x => x[0] === index);
    this.setState({
      semester: this.state.semesters.splice(ind, 1)
    });
    storage.removeCol(adyear, major, index);
  }

  year = id => {
    const number = parseInt(id.substring(1));
    let year = number;
    if (year / 4 !== Math.floor(year / 4)) {
      year = Math.floor(year / 4) + 1;
    } else {
      year = year / 4;
    }
    return `Year ${year}`;
  };

  semester = id => {
    const number = parseInt(id.substring(1));
    if (number % 4 === 1) {
      return "Semester 1";
    } else if (number % 4 === 2) {
      return "Vacation 1";
    } else if (number % 4 === 3) {
      return "Semester 2";
    } else {
      return "Vacation 2";
    }
  };
}

export default NPlanner;
