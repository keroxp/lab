import { kDefaultMargin, kDefaultWidth, KeyboardDef, KeyLayout } from "../key";
import {
  usCapsKey,
  usDelKey,
  usReturnKey,
  usShiftKey,
  usTabKey
} from "../key-util";

const Row1 = [
  new KeyLayout({
    labels: [
      { text: "!", dir: "n" }, { text: "1", dir: "s" },
    ],
    width: 1.5*kDefaultWidth +kDefaultMargin
  }),
  ["\"", "2"],
  ["#", "3"],
  ["$", "4"],
  ["%", "5"],
  ["&", "6"],
  ["'", "7"],
  ["(", "8"],
  [")", "9"],
  [" ", "0"],
  ["=", "-"],
  ["~", "^"],
  ["|", "¥"],
  ["Del"]
];
const Row2 = [
  ["Tab"],
  ["Q"],
  ["W"],
  ["E"],
  ["R"],
  ["T"],
  ["Y"],
  ["U"],
  ["I"],
  ["O"],
  ["P"],
  ["`", "@"],
  ["{", "["],
];
const Row3 = [
  new KeyLayout({
    labels: [{ text: "Ctrl", dir: "sw" }],
    width: 1.25*kDefaultWidth+kDefaultMargin
  }),
  ["A"],
  ["S"],
  ["D"],
  ["F"],
  ["G"],
  ["H"],
  ["J"],
  ["K"],
  ["L"],
  ["+", ";"],
  ['*', ":"],
  ['}', "]"],
];
const Row4 = [
  new KeyLayout({
    labels: [{ text: "Shift", dir: "sw" }],
    width: 1.75*kDefaultWidth+kDefaultMargin*2
  }),
  ["Z"],
  ["X"],
  ["C"],
  ["V"],
  ["B"],
  ["N"],
  ["M"],
  ["<", ","],
  [">", "."],
  ["?", "/"],
  ["_"],
  new KeyLayout({
    labels: [{ text: "Shift", dir: "se" }],
    width: 1.75*kDefaultWidth+kDefaultMargin*2
  }),
];

export const QwertyJISLayout: KeyboardDef = {
  name: "Qwerty-JIS",
  rows:[Row1, Row2, Row3, Row4]
};
