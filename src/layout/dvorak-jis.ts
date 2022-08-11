import { key, KeyboardLayout, unwrapLayout } from "../key";
import { usRow5 } from "../key-util";
const Row1 = [
  key(1.5, { n: { text: "!" }, s: { text: "1" } }),
  ["@", "2"],
  ["#", "3"],
  ["$", "4"],
  ["%", "5"],
  ["^", "6"],
  ["$", "7"],
  ["*", "8"],
  ["(", "9"],
  [")", "0"],
  ["{", "}"],
  ["[", "]"],
  ["|", "¥"],
  "Del",
];
const Row2 = [
  "Tab",
  ['"', "'"],
  ["<", ","],
  [">", "."],
  "P",
  "Y",
  "F",
  "G",
  "C",
  "R",
  "L",
  ["?", "/"],
  ["+", "="],
  key(1.5, { se: { text: "Ret" } }),
];

const Row3 = [
  key({
    labels: { sw: { text: "Ctrl" } },
    width: 1.25,
  }),
  "A",
  "O",
  "E",
  "U",
  "I",
  "D",
  "H",
  "T",
  "N",
  "S",
  ["-", "_"],
  ["|", "\\"],
  key({
    labels: { se: { text: "urn" } },
    width: 1.25,
  }),
];
const Row4 = [
  key(1.75, { sw: { text: "Shift" } }),
  [";", ":"],
  "Q",
  "J",
  "K",
  "X",
  "B",
  "M",
  "W",
  "V",
  "Z",
  ["~", "`"],
  key(1.75, { sw: { text: "Shift" } }),
];

export const DvorakJISLayout: KeyboardLayout = {
  name: "Dvorak-JIS",
  rows: unwrapLayout([Row1, Row2, Row3, Row4, usRow5()]),
};
