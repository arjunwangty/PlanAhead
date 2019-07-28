import React from "react";
import PropTypes from "prop-types";

export default class Mod extends React.Component {
  constructor(props) {
    super(props);
    this.showInfo = this.showInfo.bind(this);
    this.state = {};
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
          moduleDescription,
          parsedPrerequisite
        } = data;
        let p = parsedPrerequisite;
        if (parsedPrerequisite === "nil") {
          p = JSON.stringify({});
        } else {
          p = JSON.stringify(parsedPrerequisite);
        }
        const style = {
          width: "100%",
          height: "100%",
          borderWidth: "0px",
          borderRadius: "4px",
          margin: "0",
          backgroundColor: this.props.color,
          color: "white",
          textAlign: "center",
          fontSize: "13px"
        };
        this.setState({
          code: this.props.id,
          title: moduleTitle,
          mc: moduleCredit,
          pre: prerequisite,
          info: moduleDescription,
          parsedpre: p,
          style: style
        });
      });
  }

  render() {
    const { code, title, mc, style, parsedpre } = this.state;
    return (
      <button
        id={code}
        key={code}
        title={title}
        mc={mc}
        className="btn btn-sm"
        style={style}
        onClick={this.showInfo}
        parsedpre={parsedpre}
        name={this.props.name}
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
