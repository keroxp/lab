import { key, KeyboardLayout, unwrapLayout } from "../key";
import {
  usCapsKey,
  usDelKey,
  usReturnKey,
  usRow5,
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
function _key(l: string, r: string) {
  return key({
    labels: {nw:{text:l}, se: {text: r}}
  });
}

const Row2 = [
  usTabKey(),
  ["Q"],
  _key("W", "ᚹ"),
  _key("E", "ᛖ"),
  _key("R", "ᚱ"),
  _key("T", "ᛏ"),
  ["Y"],
  _key("U", "ᚢ"),
  _key("I", "ᛁ"),
  _key("O", "ᛟ"),
  _key("P", "ᛈ"),
  ["[", "{"],
  ["]", "}"],
  ["|", "\\"],
];
const Row3 = [
  usCapsKey(),
  _key("A", "ᚨ"),
  _key("S", "ᛊ"),
  _key("D", "ᛞ"),
  _key("F", "ᚠ"),
  _key("G", "ᚷ"),
  _key("H", "ᚺ"),
  _key("J", "ᛃ"),
  _key("K", "ᚲ"),
  _key("L", "ᛚ"),
  [":", ";"],
  ['"', "'"],
  usReturnKey(),
];
const Row4 = [
  usShiftKey("L"),
  _key("Z", "ᛉ"),
  _key("X", "ᚦ"),
  _key("C", "ᛜ"),
  _key("V", "ᛇ"),
  _key("B", "ᛒ"),
  _key("N", "ᚾ"),
  _key("M", "ᛗ"),
  ["<", ","],
  [">", "."],
  ["?", "/"],
  usShiftKey("R"),
];

export const QwertyRuneLayout: KeyboardLayout = {
  name: "Runic-US",
  fontFace: "NotoSansRunic",
  rows: unwrapLayout([Row1, Row2, Row3, Row4, usRow5()]),
};
