const allModule = {
  "AY2013/2014": [],
  "AY2014/2015": [],
  "AY2015/2016": [],
  "AY2016/2017": ["Data Science and Analytics"],
  "AY2017/2018": ["Data Science and Analytics"],
  "AY2018/2019": ["Data Science and Analytics"]
};
export default function test(a, b) {
  if (!(a in allModule)) {
      console.log("adyear not in");
    return false;
  } else if (allModule[a].findIndex(x=>(x===b))<0) {
      console.log("major not in");
      console.log(allModule[a]);
    return false;
  }
  return true;
}
