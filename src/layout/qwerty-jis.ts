import { KeyboardDef, KeyLayout } from "../key";

const Row1 = [
  new KeyLayout({
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
  ["Del"],
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
  new KeyLayout({
    labels: [{ text: "Ret", dir: "se" }],
    width: 1.5
  })
];
const Row3 = [
  new KeyLayout({
    labels: [{ text: "Ctrl", dir: "sw" }],
    width: 1.25 ,
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
  ["*", ":"],
  ["}", "]"],
  new KeyLayout({
    labels: [{ text: "urn", dir: "se" }],
    width: 1.25
  })
];
const Row4 = [
  new KeyLayout({
    labels: [{ text: "Shift", dir: "sw" }],
    width: 1.75,
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
    width: 1.75,
  }),
];

const Row5 = [
  ["Caps"],
  ["Opt"],
  new KeyLayout({
    labels: [{ text: "Cmd", dir: "se" }],
    width: 1.25,
  }),
  new KeyLayout({
    labels: [{ text: "英数", dir: "se" }],
    width: 1.25,
  }),
  new KeyLayout({
    labels: [{ text: "Space", dir: "se" }],
    width: 3.5
  }),
  new KeyLayout({
    labels: [{ text: "かな", dir: "se" }],
    width: 1.25,
  }),
  new KeyLayout({
    labels: [{ text: "cmd", dir: "se" }],
    width: 1.25
  }),
  ["Fn"],
  ["←"],
  new KeyLayout({
    labels: [
      { text: "↑", dir: "n" },
      { text: "↓", dir: "s" },
    ],
  }),
  ["→"],
];

export const QwertyJISLayout: KeyboardDef = {
  name: "Qwerty-JIS",
  rows: [Row1, Row2, Row3, Row4, Row5],
};
