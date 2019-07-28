var storage = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  delete(key) {
    localStorage.removeItem(key);
  },

  storeYM(year, major) {
    let value = {
      s1: [],
      s3: [],
      s5: [],
      s7: [],
      s9: [],
      s11: [],
      s13: [],
      s15: [],
      s1button: 0,
      s3button: 0,
      s5button: 0,
      s7button: 0,
      s9button: 0,
      s11button: 0,
      s13button: 0,
      s15button: 0,
      SideBarContainer: [],
      SearchBarContainer: [],
      dust: [],
      totalmc: 0
    };
    if (!([year, major] in localStorage)) {
      this.set([year, major], value);
      return true;
    }
    return false;
  },

  getYM(year, major) {
    return this.get([year, major]);
  },

  init(year, major, list) {
    let all = this.getYM(year, major);
    all["SideBarContainer"] = list;
    this.set([year, major], all);
  },

  getYMCol(year, major, colid) {
    return this.getYM(year, major)[colid];
  },

  dndChange(year, major, fromid, toid, mod, color, mc) {
    let from = this.getYM(year, major)[fromid];
    let temp = null;
    let index = 0;
    let all = this.getYM(year, major);
    for (let i of from) {
      if (mod !== i[0]) {
        index++;
      } else {
        temp = from[index];
        from.splice(index, 1);
        break;
      }
    }
    all[fromid] = from;
    if (all[`${fromid}button`] !== undefined) {
      let frommc = all[`${fromid}button`];
      frommc -= mc;
      all[`${fromid}button`] = frommc;
    }
    if (toid !== "dust") {
      let to = this.getYM(year, major)[toid];
      if (toid === "SearchBarContainer") {
        color = "rgb(120,206,179)";
      } else if (toid === "SideBarContainer") {
        color = "rgb(84,169,139)";
      }
      if (to.length === 0) {
        to = [[temp[0], color, temp[2]]];
      } else {
        to.push([temp[0], color, temp[2]]);
      }
      all[toid] = to;
      if (all[`${toid}button`] !== undefined) {
        let tomc = all[`${toid}button`];
        tomc += mc;
        all[`${toid}button`] = tomc;
      }
    }
    this.set([year, major], all);
  },

  dndChangeColor(year, major, id, mod, color) {
    let newcolor = this.getYM(year, major)[id];
    let index = 0;
    for (let i of newcolor) {
      if (mod !== i[0]) {
        index++;
      } else {
        newcolor[index][1] = color;
        break;
      }
    }
    let all = this.getYM(year, major);
    all[id] = newcolor;
    this.set([year, major], all);
  },

  addNewMod(year, major, mod) {
    let searchbar = this.getYMCol(year, major, "SearchBarContainer");
    if (searchbar.length === 0) {
      searchbar = [[mod, "rgb(120,206,179)", "additional"]];
    } else {
      searchbar.push([mod, "rgb(120,206,179)", "additional"]);
    }
    let all = this.getYM(year, major);
    all["SearchBarContainer"] = searchbar;
    this.set([year, major], all);
  },

  deleteMod(year, major, id, mod) {
    let bar = this.getYM(year, major)[id];
    let index = 0;
    let temp = null;
    for (let i of bar) {
      if (mod !== i[0]) {
        index++;
      } else {
        temp = bar[index];
        bar.splice(index, 1);
        break;
      }
    }
    let all = this.getYM(year, major);
    all[id] = bar;
    if (all["dust"] === []) {
      all["dust"] = [temp];
    } else {
      all["dust"].push(temp);
    }
    this.set([year, major], all);
  },

  exist(year, major, mod){
    let dust=this.getYMCol(year, major, "dust");
    let count = 0;
    console.log(mod);
    console.log(dust);
    for (let i of dust){
      if (i[0]===mod){count++}
    }
    if (count===0){return 0}
    return count
  },

  addNewCol(year, major, id) {
    let all = this.getYM(year, major);
    all[id] = [];
    all[`${id}button`] = 0;
    this.set([year, major], all);
  },

  removeCol(year, major, id) {
    let all = this.getYM(year, major);
    delete all[id];
    delete all[`${id}button`];
    this.set([year, major], all);
  },

  changeTotalMc(year, major, mc) {
    let m = this.getYMCol(year, major, "totalmc");
    m += mc;
    let all = this.getYM(year, major);
    all["totalmc"] = m;
    this.set([year, major], all);
  },

  changeMc(year, major, id, mc) {
    let m = this.getYMCol(year, major, id);
    m += mc;
    let all = this.getYM(year, major);
    all[id] = m;
    this.set([year, major], all);
  }
};
export default storage;
