import { KeyboardDef, KeyLayout } from "../key";
import {
  usCapsKey,
  usDelKey,
  usReturnKey,
  usRow5,
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
  ["-", "_"],
  ["+", "="],
  usDelKey(),
];
function key(l: string, r: string) {
  return new KeyLayout({
    labels: [
      { text: l, dir: "nw" },
      { text: r, dir: "se" },
    ],
  });
}

const Row2 = [
  usTabKey(),
  ["Q"],
  key("W","ᚹ"),
  key("E","ᛖ"),
  key("R", "ᚱ"),
  key("T", "ᛏ"),
  ["Y"],
  key("U", "ᚢ"),
  key("I", "ᛁ"),
  key("O","ᛟ"),
  key("P", "ᛈ"),
  ["[", "{"],
  ["]", "}"],
  ["|", "\\"],
];
const Row3 = [
  usCapsKey(),
  key("A","ᚨ"),
  key("S","ᛊ"),
  key("D","ᛞ"),
  key("F", "ᚠ"),
  key("G","ᚷ"),
  key("H","ᚺ"),
  key("J","ᛃ"),
  key("K","ᚲ"),
  key("L", "ᛚ"),
  [":", ";"],
  ['"', "'"],
  usReturnKey(),
];
const Row4 = [
  usShiftKey("L"),
  key("Z", "ᛉ"),
  key("X", "ᚦ"),
  key("C","ᛜ" ),
  key("V","ᛇ"),
  key("B","ᛒ"),
  key("N", "ᚾ"),
  key("M", "ᛗ"),
  ["<", ","],
  [">", "."],
  ["?", "/"],
  usShiftKey("R")
];

export const QwertyRuneLayout: KeyboardDef = {
  name: "Runic-US",
  fontFace: "NotoSansRunic",
  rows: [Row1, Row2, Row3, Row4, usRow5()],
};
