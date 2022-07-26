import { key, KeyboardLayout, label, unwrapLayout } from "../key";

const Row1 = [
  key({
    labels: [
      { text: "!", dir: "n" },
      { text: "1", dir: "s" },
    ],
    width: 1.5,
  }),
  ['"', "2"],
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
  "Del",
];
const Row2 = [
  "Tab",
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  ["`", "@"],
  ["{", "["],
  key({
    labels: [{ text: "Ret", dir: "se" }],
    width: 1.5,
  }),
];
const Row3 = [
  key({
    labels: [{ text: "Ctrl", dir: "sw" }],
    width: 1.25,
  }),
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  ["+", ";"],
  ["*", ":"],
  ["}", "]"],
  key({
    labels: [{ text: "urn", dir: "se" }],
    width: 1.25,
  }),
];
const Row4 = [
  key({
    labels: [{ text: "Shift", dir: "sw" }],
    width: 1.75,
  }),
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  ["<", ","],
  [">", "."],
  ["?", "/"],
  "_",
  key({
    labels: [{ text: "Shift", dir: "se" }],
    width: 1.75,
  }),
];

const Row5 = [
  key(1, label(["Caps", "sw"])),
  key(1, label(["Opt", "sw"])),
  key({
    labels: [{ text: "Cmd", dir: "se" }],
    width: 1.25,
  }),
  key({
    labels: [{ text: "英数", dir: "se" }],
    width: 1.25,
  }),
  key({
    labels: [{ text: "Space", dir: "se" }],
    width: 3.5,
  }),
  key({
    labels: [{ text: "かな", dir: "se" }],
    width: 1.25,
  }),
  key({
    labels: [{ text: "cmd", dir: "se" }],
    width: 1.25,
  }),
  key(1,label(["Fn","se"])),
  "←",
  key({
    labels: [
      { text: "↑", dir: "n" },
      { text: "↓", dir: "s" },
    ],
  }),
  "→",
];

export const QwertyJISLayout: KeyboardLayout = {
  name: "Qwerty-JIS",
  rows: unwrapLayout([Row1, Row2, Row3, Row4, Row5]),
};
