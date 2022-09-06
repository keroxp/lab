// import { DvorakJPSakuraTable } from "./dvorak-jp-sakura";
// import { RomanConverter } from "./roman";
const { roma2hiragana } = require("./chaim-roman");
const fs = require("fs");
const entries = fs
  .readFileSync("chaimdict.txt")
  .toString()
  .split("\n")
  .filter((i) => !i.startsWith("#") && !!i)
  .map((ln) => ln.split("\t"));

// const conv = new RomanConverter(DvorakJPSakuraTable);

const yomi = entries.map((e,i) => {
  const [roman,...rest] = e;
  return [i+1,roma2hiragana(roman)||roman,...rest];
});

const result = new Map()
for (const [id,...rest] of yomi) {
  const key = rest.join('')
  result.set(key, [id,...rest])
}

console.log(Array.from(result.values())
  .filter(i => !i[1].match('んん'))
  .map(i => i.join('\t')).join('\n'))