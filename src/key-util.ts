import { key } from "./key";

export function usDelKey() {
  return key({
    labels: [{ text: "Delete", dir: "se" }],
    width: 1.5,
  });
}
export function usTabKey() {
  return key({
    labels: [{ text: "Tab", dir: "sw" }],
    width: 1.5,
  });
}
export function usCapsKey() {
  return key({
    labels: [{ text: "Caps", dir: "sw" }],
    width: 1.75,
  });
}
export function usReturnKey() {
  return key({
    labels: [{ text: "Return", dir: "se" }],
    width: 1.75,
  });
}
export function usShiftKey(type: "L" | "R") {
  return key({
    labels: [{ text: "Shift", dir: type === "L" ? "sw" : "se" }],
    width: 2.25,
  });
}

export function usRow5() {
  return [
    key({
      labels: [{ text: "Fn", dir: "sw" }],
    }),
    key({
      labels: [{ text: "Ctrl", dir: "sw" }],
    }),
    key({
      labels: [{ text: "Opt", dir: "sw" }],
    }),
    key({
      labels: [{ text: "Cmd", dir: "se" }],
      width: 1.25,
    }),
    key({
      labels: [{ text: "Space", dir: "se" }],
      width: 5,
    }),
    key({
      labels: [{ text: "cmd", dir: "se" }],
      width: 1.25,
    }),
    key({
      labels: [{ text: "Opt", dir: "se" }],
    }),
    ["←"],
    key({
      labels: [
        { text: "↑", dir: "n" },
        { text: "↓", dir: "s" },
      ],
    }),
    ["→"],
  ];
}
