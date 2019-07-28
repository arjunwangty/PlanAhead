import React from "react";
import PropTypes from "prop-types";
import storage from "./storage";

export default class Draggable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { parent: this.props.parent };
  }

  render() {
    return (
      <div
        name={this.props.name}
        id={this.props.id}
        draggable="true"
        onDragStart={this.drag}
        onDragOver={this.noAllowDrop}
        onDragEnd={this.dragEnd}
        value={this.props.value}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0)",
          border: "0px",
          margin: "4px",
          width: 69,
          height: "25px",
          float: "left"
        }}
      >
        {this.props.children}
      </div>
    );
  }

  drag = e => {
    e.dataTransfer.setData("transfer", e.target.id);
    this.className = "";
  };

  noAllowDrop = e => {
    e.stopPropagation();
  };

  dragEnd = e => {
    const { adyear, major } = this.props;
    const draggableCode = this.props.id;
    const mod = document.getElementById(draggableCode).firstChild;
    const mc = parseInt(mod.getAttribute("mc"));
    const code = mod.getAttribute("id");
    const color = mod.style.backgroundColor;
    const initparent = this.state.parent;
    const p = ["SearchBarContainer", "SideBarContainer", "dust"];

    if (p.indexOf(initparent) < 0) {
      document.getElementById(`${initparent}button`).innerText -= mc;
    }

    const currentParent = document.getElementById(e.target.id).parentElement.id;
    if (p.indexOf(currentParent) < 0) {
      this.setState({
        parent: currentParent
      });
      document.getElementById(`${currentParent}button`).innerText =
        parseInt(document.getElementById(`${currentParent}button`).innerText) +
        mc;
    } else {
      this.setState({
        parent: currentParent
      });
    }
    if (p.indexOf(initparent) < 0 && p.indexOf(currentParent) >= 0) {
      document.getElementById("totalmc").innerText -= mc;
      storage.changeTotalMc(adyear, major, -mc);
      if (currentParent === "SearchBarContainer") {
        storage.dndChange(
          adyear,
          major,
          initparent,
          currentParent,
          code,
          "rgb(84,169,139)",
          mc
        );
      } else if (currentParent === "SideBarContainer") {
        storage.dndChange(
          adyear,
          major,
          initparent,
          currentParent,
          code,
          "rgb(120,206,179)",
          mc
        );
      } else {
        storage.dndChange(
          adyear,
          major,
          initparent,
          currentParent,
          code,
          "rgb(84,169,139)",
          mc
        );
      }
      this.checkPre(code, initparent);
    } else if (p.indexOf(initparent) >= 0 && p.indexOf(currentParent) < 0) {
      document.getElementById("totalmc").innerText =
        parseInt(document.getElementById("totalmc").innerText) + mc;
      storage.changeTotalMc(adyear, major, +mc);
      storage.dndChange(
        adyear,
        major,
        initparent,
        currentParent,
        code,
        color,
        mc
      );
      this.checkPre2(code, currentParent);
    } else if (
      p.indexOf(initparent) < 0 &&
      p.indexOf(currentParent) < 0 &&
      initparent !== currentParent
    ) {
      storage.dndChange(
        adyear,
        major,
        initparent,
        currentParent,
        code,
        color,
        mc
      );
      this.checkPre3(code, initparent, currentParent);
    }
  };

  checkPre(code, initparent) {
    //drag from planner to sidebar/searchbar
    const { adyear, major } = this.props;
    let name = document.getElementById(code).getAttribute("name");
    let originColor;
    if (name === "additional") {
      originColor = "rgb(120,206,179)";
    } else {
      originColor = "rgb(84,169,139)";
    }
    document.getElementById(code).style.backgroundColor = originColor;

    const number = parseInt(initparent.substring(1));
    let i = number + 1;
    while (i <= 20) {
      const colid = "s" + i;
      if (document.getElementById(colid) != null) {
        let children = document.getElementById(colid).children;
        if (children.length > 0) {
          for (let j = 0; j < children.length; j++) {
            let mod = children[j].firstChild;
            let prerequisite = JSON.parse(mod.getAttribute("parsedpre"));
            if (mod.style.backgroundColor !== "black") {
              if (" and " in prerequisite && code in prerequisite[" and "]) {
                mod.style.backgroundColor = "black";
                storage.dndChangeColor(adyear, major, colid, mod.id, "black");
                continue;
              } else if (" and " in prerequisite) {
                let pre = prerequisite[" and "];
                for (let p of pre) {
                  if (p[" or "] !== undefined) {
                    if (p[" or "].indexOf(code) < 0) {
                      continue;
                    } else {
                      let or = p[" or "];
                      let find = 0;
                      for (let h = 0; h++; h <= or.length) {
                        if (document.getElementById(or[h]) === null) {
                          continue;
                        }
                        let parent = document.getElementById(or[h])
                          .parentElement.parentElement.id;
                        if (
                          parent !== "SearchBarContainer" &&
                          parent !== "SideBarContainer" &&
                          parent !== "dust"
                        ) {
                          find++;
                        }
                        if (find > 0) {
                          break;
                        }
                      }
                      if (find === 0) {
                        mod.style.backgroundColor = "black";
                        storage.dndChangeColor(
                          adyear,
                          major,
                          colid,
                          mod.id,
                          "black"
                        );
                        break;
                      }
                    }
                  }
                }
              } else if (prerequisite[" or "] !== undefined) {
                let or = prerequisite[" or "];
                let find = 0;
                for (let h = 0; h++; h <= or.length) {
                  if (document.getElementById(or[h]) === null) {
                    continue;
                  }
                  let parent = document.getElementById(or[h]).parentElement
                    .parentElement.id;
                  if (
                    parent !== "SearchBarContainer" &&
                    parent !== "SideBarContainer" &&
                    parent !== "dust"
                  ) {
                    find++;
                  }
                  if (find > 0) {
                    break;
                  }
                }
                if (find === 0) {
                  mod.style.backgroundColor = "black";
                  storage.dndChangeColor(adyear, major, colid, mod.id, "black");
                  break;
                }
              }
            }
          }
        }
      }
      i++;
    }
  }

  checkPre2(code, currentParent) {
    //drag from sidebar/searchbar to planner
    //1.check for its own color
    const { adyear, major } = this.props;
    let currentcol = parseInt(currentParent.substring(1));
    let mod = document.getElementById(code);
    let prerequisite = JSON.parse(mod.getAttribute("parsedpre"));

    if (" and " in prerequisite) {
      let totalnoofmods = 0;
      let totalcounter = 0;
      //check for prerequisite[" and "]
      for (let p of prerequisite[" and "]) {
        //check for prerequisite[" and "][" or "]
        totalnoofmods++;
        if (p[" or "] !== undefined) {
          let or = p[" or "];
          let count = 0;
          for (let o of or) {
            if (document.getElementById(o) === null) {
              continue;
            }
            let oparent = document.getElementById(o).parentElement.parentElement
              .id;
            if (
              oparent !== "SearchBarContainer" &&
              oparent !== "SideBarContainer" &&
              oparent !== "dust"
            ) {
              let ocol = parseInt(oparent.substring(1));
              if (ocol < currentcol) {
                count++;
                break;
              }
            }
          }
          if (count > 0) {
            totalcounter++;
            continue;
          } //if there is at least one mod in "or" exists, check for other mod in "and"
          else {
            mod.style.backgroundColor = "black";
            storage.dndChangeColor(
              adyear,
              major,
              currentParent,
              mod.id,
              "black"
            );
            break;
          } //else color = black and break
          //check for normal code in prerequisite[" and "]
        } else {
          if (document.getElementById(p) === null) {
            mod.style.backgroundColor = "black";
            storage.dndChangeColor(
              adyear,
              major,
              currentParent,
              mod.id,
              "black"
            );
            break;
          }
          let oparent = document.getElementById(p).parentElement.parentElement
            .id;
          if (
            oparent !== "SearchBarContainer" &&
            oparent !== "SideBarContainer" &&
            oparent !== "dust"
          ) {
            let ocol = parseInt(oparent.substring(1));
            if (ocol < currentcol) {
              totalcounter++;
              continue;
            } // if p is in front of the mod, continue
            else {
              mod.style.backgroundColor = "black";
              storage.dndChangeColor(
                adyear,
                major,
                currentParent,
                mod.id,
                "black"
              );
              break;
            } //else color = black and stop checking
          } else {
            mod.style.backgroundColor = "black";
            storage.dndChangeColor(
              adyear,
              major,
              currentParent,
              mod.id,
              "black"
            );
            break;
          }
        }
      }
      if (totalnoofmods === totalcounter) {
        let name = mod.getAttribute("name");

        let originColor;
        if (name === "additional") {
          originColor = "rgb(120,206,179)";
        } else {
          originColor = "rgb(84,169,139)";
        }
        mod.style.backgroundColor = originColor;
        storage.dndChangeColor(
          adyear,
          major,
          currentParent,
          mod.id,
          originColor
        );
      }
    } else if (" or " in prerequisite) {
      //check for prerequisite[' or ']
      let count = 0;
      for (let o of prerequisite[" or "]) {
        if (document.getElementById(o) === null) {
          continue;
        }
        let oparent = document.getElementById(o).parentElement.parentElement.id;
        if (
          oparent !== "SearchBarContainer" &&
          oparent !== "SideBarContainer" &&
          oparent !== "dust"
        ) {
          let ocol = parseInt(oparent.substring(1));
          if (ocol < currentcol) {
            count++;
            break;
          }
        }
      }
      if (count === 0) {
        mod.style.backgroundColor = "black";
        storage.dndChangeColor(adyear, major, currentParent, mod.id, "black");
      }
    }
    //end of check for self

    //2. check for other mods behind this mod
    let i = currentcol + 1;
    while (i <= 20) {
      const colid = "s" + i;
      if (document.getElementById(colid) != null) {
        let children = document.getElementById(colid).children;
        if (children.length > 0) {
          //check for each child
          for (let j = 0; j < children.length; j++) {
            let othermod = children[j].firstChild;
            let otherprerequisite = JSON.parse(
              othermod.getAttribute("parsedpre")
            );
            //only check for those of black color
            if (othermod.style.backgroundColor === "black") {
              if (" and " in otherprerequisite) {
                //check for prerequisite[" and "]
                let totalnoofmods = 0;
                let totalcounter = 0;
                for (let p of otherprerequisite[" and "]) {
                  //check for prerequisite[" and "][" or "]
                  totalnoofmods++;
                  if (p[" or "] !== undefined) {
                    let or = p[" or "];
                    let count = 0;
                    for (let r of or) {
                      if (document.getElementById(r) === null) {
                        continue;
                      }
                      let rparent = document.getElementById(r).parentElement
                        .parentElement.id;
                      if (
                        rparent !== "SearchBarContainer" &&
                        rparent !== "SideBarContainer" &&
                        rparent !== "dust"
                      ) {
                        let ocol = parseInt(rparent.substring(1));
                        if (ocol < i) {
                          count++;
                          break;
                        }
                      }
                    }
                    if (count > 0) {
                      totalcounter++;
                      continue;
                    } //if there is at least one mod in "or" exists, check for other mod in "and"
                  } else {
                    if (document.getElementById(p) === null) {
                      break;
                    }
                    let rparent = document.getElementById(p).parentElement
                      .parentElement.id;
                    if (
                      rparent !== "SearchBarContainer" &&
                      rparent !== "SideBarContainer" &&
                      rparent !== "dust"
                    ) {
                      let ocol = parseInt(rparent.substring(1));
                      if (ocol < i) {
                        totalcounter++;
                        continue;
                      } // if p is in front of the mod, continue
                      else {
                        break;
                      } //else color = black and stop checking
                    } else {
                      break;
                    }
                  }
                }
                if (totalcounter === totalnoofmods) {
                  let name = othermod.getAttribute("name");
                  let originColor;
                  if (name === "additional") {
                    originColor = "rgb(120,206,179)";
                  } else {
                    originColor = "rgb(84,169,139)";
                  }
                  othermod.style.backgroundColor = originColor;
                  storage.dndChangeColor(
                    adyear,
                    major,
                    colid,
                    othermod.id,
                    originColor
                  );
                }
              } else if (otherprerequisite[" or "] !== undefined) {
                //check for prerequisite[' or ']
                let count = 0;
                for (let m of otherprerequisite[" or "]) {
                  if (document.getElementById(m) === null) {
                    continue;
                  }
                  let oparent = document.getElementById(m).parentElement
                    .parentElement.id;
                  if (
                    oparent !== "SearchBarContainer" &&
                    oparent !== "SideBarContainer" &&
                    oparent !== "dust"
                  ) {
                    let ocol = parseInt(oparent.substring(1));
                    if (ocol < i) {
                      count++;
                      break;
                    }
                  }
                }
                if (count > 0) {
                  let name = othermod.getAttribute("name");
                  let originColor;
                  if (name === "aditional") {
                    originColor = "rgb(120,206,179)";
                  } else {
                    originColor = "rgb(84,169,139)";
                  }
                  othermod.style.backgroundColor = originColor;
                  storage.dndChangeColor(
                    adyear,
                    major,
                    colid,
                    othermod.id,
                    originColor
                  );
                }
              }
            }
          }
        }
      }
      i++;
    }
  }

  checkPre3(code, initparent, currentParent) {
    //drag from 1 col to another col
    //1.update its own color if its color is black
    const { adyear, major } = this.props;
    let initcol = parseInt(initparent.substring(1));
    let currentcol = parseInt(currentParent.substring(1));
    let mod = document.getElementById(code);
    let prerequisite = JSON.parse(mod.getAttribute("parsedpre"));

    if (
      (mod.style.backgroundColor === "black" && currentcol > initcol) ||
      (mod.style.backgroundColor !== "black" && currentcol < initcol)
    ) {
      if (" and " in prerequisite) {
        //check for prerequisite[" and "]
        let totalnoofmods = 0;
        let totalcounter = 0;
        for (let p of prerequisite[" and "]) {
          //check for prerequisite[" and "][" or "]
          totalnoofmods++;
          if (p[" or "] !== undefined) {
            let or = p[" or "];
            let count = 0;
            for (let o of or) {
              if (document.getElementById(o) === null) {
                continue;
              }
              let oparent = document.getElementById(o).parentElement
                .parentElement.id;
              if (
                oparent !== "SearchBarContainer" &&
                oparent !== "SideBarContainer" &&
                oparent !== "dust"
              ) {
                let ocol = parseInt(oparent.substring(1));
                if (ocol < currentcol) {
                  count++;
                  break;
                }
              }
            }
            if (count > 0) {
              totalcounter++;
              continue;
            } //if there is at least one mod in "or" exists, check for other mod in "and"
            else {
              break;
            } //else color = black and break
            //check for normal code in prerequisite[" and "]
          } else {
            if (document.getElementById(p) === null) {
              break;
            }
            let oparent = document.getElementById(p).parentElement.parentElement
              .id;
            if (
              oparent !== "SearchBarContainer" &&
              oparent !== "SideBarContainer" &&
              oparent !== "dust"
            ) {
              let ocol = parseInt(oparent.substring(1));
              if (ocol < currentcol) {
                totalcounter++;
                continue;
              } // if p is in front of the mod, continue
              else {
                break;
              } //else color = black and stop checking
            } else {
              break;
            }
          }
        }
        if (totalcounter === totalnoofmods) {
          let name = mod.getAttribute("name");
          let originColor;
          if (name === "additional") {
            originColor = "rgb(120,206,179)";
          } else {
            originColor = "rgb(84,169,139)";
          }
          mod.style.backgroundColor = originColor;
          storage.dndChangeColor(
            adyear,
            major,
            currentParent,
            mod.id,
            originColor
          );
        }
      } else if (" or " in prerequisite) {
        //check for prerequisite[' or ']
        let count = 0;
        for (let o of prerequisite[" or "]) {
          if (document.getElementById(o) === null) {
            continue;
          }
          let oparent = document.getElementById(o).parentElement.parentElement
            .id;
          if (
            oparent !== "SearchBarContainer" &&
            oparent !== "SideBarContainer" &&
            oparent !== "dust"
          ) {
            let ocol = parseInt(oparent.substring(1));
            if (ocol < currentcol) {
              count++;
              break;
            }
          }
        }
        if (count === 0) {
          mod.style.backgroundColor = "black";
          storage.dndChangeColor(adyear, major, currentParent, mod.id, "black");
        } else {
          let name = mod.getAttribute("name");
          let originColor;
          if (name === "additional") {
            originColor = "rgb(120,206,179)";
          } else {
            originColor = "rgb(84,169,139)";
          }
          mod.style.backgroundColor = originColor;
          storage.dndChangeColor(
            adyear,
            major,
            currentParent,
            mod.id,
            originColor
          );
        }
      }
    }
    //end of check for self

    //2. check for other mods on col between init and current
    let i = Math.min(parseInt(initparent.substring(1)), currentcol);
    let end = Math.max(parseInt(initparent.substring(1)), currentcol);

    while (i <= end) {
      const colid = "s" + i;
      if (document.getElementById(colid) != null) {
        let children = document.getElementById(colid).children;
        if (children.length > 0) {
          //check for each child
          for (let j = 0; j < children.length; j++) {
            let othermod = children[j].firstChild;
            let otherprerequisite = JSON.parse(
              othermod.getAttribute("parsedpre")
            );
            let name = othermod.getAttribute("name");
            let originColor = "";
            if (name === "additional") {
              originColor = "rgb(120,206,179)";
            } else {
              originColor = "rgb(84,169,139)";
            }
            if (" and " in otherprerequisite) {
              let totalnoofmods = 0;
              let totalcounter = 0;
              //check for prerequisite[" and "]
              for (let p of otherprerequisite[" and "]) {
                //check for prerequisite[" and "][" or "]
                totalnoofmods++;
                if (p[" or "] !== undefined) {
                  let or = p[" or "];
                  let count = 0;
                  for (let r of or) {
                    if (document.getElementById(r) === null) {
                      continue;
                    }
                    let rparent = document.getElementById(r).parentElement
                      .parentElement.id;
                    if (
                      rparent !== "SearchBarContainer" &&
                      rparent !== "SideBarContainer" &&
                      rparent !== "dust"
                    ) {
                      let ocol = parseInt(rparent.substring(1));
                      if (ocol < i) {
                        count++;
                        break;
                      }
                    }
                  }
                  if (count > 0) {
                    totalcounter++;
                    continue;
                  } //if there is at least one mod in "or" exists, check for other mod in "and"
                  else {
                    othermod.style.backgroundColor = "black";
                    storage.dndChangeColor(
                      adyear,
                      major,
                      colid,
                      othermod.id,
                      "black"
                    );
                    break;
                  } //else color = black and break
                  //check for normal code in prerequisite[" and "]
                } else {
                  if (document.getElementById(p) === null) {
                    othermod.style.backgroundColor = "black";
                    storage.dndChangeColor(
                      adyear,
                      major,
                      colid,
                      othermod.id,
                      "black"
                    );
                    break;
                  }
                  let rparent = document.getElementById(p).parentElement
                    .parentElement.id;
                  if (
                    rparent !== "SearchBarContainer" &&
                    rparent !== "SideBarContainer" &&
                    rparent !== "dust"
                  ) {
                    let ocol = parseInt(rparent.substring(1));
                    if (ocol < i) {
                      totalcounter++;
                      continue;
                    } // if p is in front of the mod, continue
                    else {
                      othermod.style.backgroundColor = "black";
                      storage.dndChangeColor(
                        adyear,
                        major,
                        colid,
                        othermod.id,
                        "black"
                      );
                      break;
                    } //else color = black and stop checking
                  } else {
                    othermod.style.backgroundColor = "black";
                    storage.dndChangeColor(
                      adyear,
                      major,
                      colid,
                      othermod.id,
                      "black"
                    );
                    break;
                  }
                }
              }
              if (totalcounter === totalnoofmods) {
                othermod.style.backgroundColor = originColor;
                storage.dndChangeColor(
                  adyear,
                  major,
                  colid,
                  othermod.id,
                  originColor
                );
              }
            } else if (otherprerequisite[" or "] !== undefined) {
              //check for prerequisite[' or ']
              let count = 0;
              for (let m of otherprerequisite[" or "]) {
                if (document.getElementById(m) === null) {
                  continue;
                }
                let oparent = document.getElementById(m).parentElement
                  .parentElement.id;
                if (
                  oparent !== "SearchBarContainer" &&
                  oparent !== "SideBarContainer" &&
                  oparent !== "dust"
                ) {
                  let ocol = parseInt(oparent.substring(1));
                  if (ocol < i) {
                    count++;
                    break;
                  }
                }
              }
              if (count === 0) {
                othermod.style.backgroundColor = "black";
                storage.dndChangeColor(
                  adyear,
                  major,
                  colid,
                  othermod.id,
                  "black"
                );
              } else {
                othermod.style.backgroundColor = originColor;
                storage.dndChangeColor(
                  adyear,
                  major,
                  colid,
                  othermod.id,
                  originColor
                );
              }
            }
          }
        }
      }
      i++;
    }
  }
}

Draggable.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node
};
