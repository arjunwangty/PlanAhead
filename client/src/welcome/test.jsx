const allModule = {
  "AY2014/2015": ["Computer Science"],
  "AY2015/2016": ["Computer Science"],
  "AY2016/2017": ["Data Science and Analytics", "Computer Science"],
  "AY2017/2018": ["Data Science and Analytics", "Computer Science"],
  "AY2018/2019": ["Data Science and Analytics", "Computer Science"],
  "AY2019/2020": ["Data Science and Analytics", "Computer Science"]
};
export default function test(a, b) {
  if (!(a in allModule)) {
    return false;
  } else if (allModule[a].findIndex(x => x === b) < 0) {
    return false;
  }
  return true;
}
