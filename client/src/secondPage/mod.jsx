import React from "react";
import PropTypes from "prop-types";

const style1 = {
  width: 70,
  borderWidth: "0px",
  backgroundColor: "rgb(84,169,139)",
  color: "white"
};
const style2 = {
  width: 70,
  borderWidth: "0px",
  backgroundColor: "rgb(120,206,179)",
  color: "white"
};

export default class Mod extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    if (this.props.name === "firstMajor") {
      this.state = { style: style1 };
    } else {
      this.state = { style: style2 };
    }
    this.showInfo = this.showInfo.bind(this);
  }

  componentWillMount() {
    const address = `../data/modules/${this.props.code}.json`;
    fetch(address)
      .then(res => res.json())
      .then(data => {
        const {
          moduleTitle,
          moduleCredit,
          prerequisite,
          moduleDescription
        } = data;
        this.setState({
          code: this.props.id,
          title: moduleTitle,
          mc: moduleCredit,
          pre: prerequisite,
          info: moduleDescription
        });
      });
  }

  render() {
    return (
      <button
        id={this.props.id}
        key={this.props.code}
        title={this.props.title}
        mc={this.state.mc}
        className="btn btn-sm"
        style={this.state.style}
        onClick={this.showInfo}
      >
        {this.props.code}
      </button>
    );
  }

  showInfo() {
    const { code, mc, pre, info } = this.state;
    document.getElementById("ModuleCode").innerText = code;
    document.getElementById("ModuleCredits").innerText = mc;
    document.getElementById("ModulePrerequisite").innerText = pre;
    document.getElementById("ModuleDescription").innerText = info;
  }
}

Mod.propTypes = {
  id: PropTypes.string,
  code: PropTypes.string,
  title: PropTypes.string
};
