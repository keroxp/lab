import { key, KeyboardLayout, label, unwrapLayout } from "../key";
import { usRow5 } from "../key-util";
const Row1 = [
  key(1.5, label(["!", "n"], ["1", "s"])),
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
  key(1.5, label("Ret", "se")),
];

const Row3 = [
  key({
    labels: [{ text: "Ctrl", dir: "sw" }],
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
    labels: [{ text: "urn", dir: "se" }],
    width: 1.25,
  }),
];
const Row4 = [
  key(1.75, label("Shift", "sw")),
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
  key(1.75, label("Shift", "se")),
];

export const DvorakJISLayout: KeyboardLayout = {
  name: "Dvorak-JIS",
  rows: unwrapLayout([Row1, Row2, Row3, Row4, usRow5()]),
};
