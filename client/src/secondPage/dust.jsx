import React, { Component } from "react";
import Droppable from "../component/droppable";
import "../style/dust.less";


class Delete extends Component {
  render() {
      const {adyear, major} = this.props
    return (
      <div className="dust"> 
        <Droppable
          id="dustDroppable"
          style={{ height: "100px"}}
          isDroppable={true}
          adyear={adyear}
          major={major}
        >
          <div id="dust">delete</div>
        </Droppable>
      </div>
    );
  }
}

export default Delete;
