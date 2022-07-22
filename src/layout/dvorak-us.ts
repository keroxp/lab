import { KeyboardDef } from "../key";
import {
  usCapsKey,
  usDelKey,
  usReturnKey,
  usShiftKey,
  usTabKey,
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
  ["{", "}"],
  ["[", "]"],
  usDelKey(),
];
const Row2 = [
  usTabKey(),
  ['"', "'"],
  ["<", ","],
  [">", "."],
  ["P"],
  ["Y"],
  ["F"],
  ["G"],
  ["C"],
  ["R"],
  ["L"],
  ["?", "/"],
  ["+", "="],
  ["|", "\\"],
];

const Row3 = [
  usCapsKey(),
  ["A"],
  ["O"],
  ["E"],
  ["U"],
  ["I"],
  ["D"],
  ["H"],
  ["T"],
  ["N"],
  ["S"],
  ["-", "_"],
  usReturnKey(),
];
const Row4 = [
  usShiftKey("L"),
  [";", ":"],
  ["Q"],
  ["J"],
  ["K"],
  ["X"],
  ["B"],
  ["M"],
  ["W"],
  ["V"],
  ["Z"],
  usShiftKey("R"),
];

export const DvorakUSLayout: KeyboardDef = {
  name: "Dvorak-US",
  rows: [Row1, Row2, Row3, Row4],
};
