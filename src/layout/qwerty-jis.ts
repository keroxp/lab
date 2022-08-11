import { key, KeyboardLayout, unwrapLayout } from "../key";

const Row1 = [
  key({
    labels: { n: { text: "!" }, s: { text: "1" } },
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
    labels: { se: { text: "Ret" } },
    width: 1.5,
  }),
];
const Row3 = [
  key({
    labels: { sw: { text: "Ctrl" } },
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
    labels: { se: { text: "urn" } },
    width: 1.25,
  }),
];
const Row4 = [
  key({
    labels: { sw: { text: "Shift" } },
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
    labels: { se: { text: "Shift" } },
    width: 1.75,
  }),
];

const Row5 = [
  key(1, { sw: { text: "Caps" } }),
  key(1, { sw: { text: "Opt" } }),
  key({
    labels: { se: { text: "Cmd" } },
    width: 1.25,
  }),
  key({
    labels: { se: { text: "英数" } },
    width: 1.25,
  }),
  key({
    labels: { se: { text: "Space" } },
    width: 3.5,
  }),
  key({
    labels: { sw: { text: "かな" } },
    width: 1.25,
  }),
  key({
    labels: { sw: { text: "cmd" } },
    width: 1.25,
  }),
  key(1, { se: { text: "Fn" } }),
  "←",
  key({
    labels: {
      n: { text: "↑" },
      w: { text: "↓" },
    },
  }),
  "→",
];

export const QwertyJISLayout: KeyboardLayout = {
  name: "Qwerty-JIS",
  rows: unwrapLayout([Row1, Row2, Row3, Row4, Row5]),
};
