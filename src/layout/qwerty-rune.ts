import { KeyboardDef } from "../key";
import {
  usCapsKey,
  usDelKey,
  usReturnKey,
  usShiftKey,
  usTabKey
} from "../key-util";

const Row1 = [
  ["~", "`"],
  ["!", "1"],
  ["@", "2"],
  ["#", "3"],
  ["$", "4"],
  ["%", "5"],
  ["^", "6"],
  ["$", "7"],
  ["*", "8"],
  ["(", "9"],
  [")", "0"],
  ["-", "_"],
  ["+", "="],
  usDelKey(),
];
const Row2 = [
  usTabKey(),
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
  ["[", "{"],
  ["]", "}"],
  ["|", "\\"],
];
const Row3 = [
  usCapsKey(),
  ["A"],
  ["S"],
  ["D"],
  ["F"],
  ["G"],
  ["H"],
  ["J"],
  ["K"],
  ["L"],
  [":", ";"],
  ['"', "'"],
  usReturnKey(),
];
const Row4 = [
  usShiftKey("L"),
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
  usShiftKey("R"),
];

export const QwertyRuneLayout: KeyboardDef = {
  name: "Runic-US",
  fontFace: 'NotoSansRunic',
  rows:[Row1, Row2, Row3, Row4]
};
