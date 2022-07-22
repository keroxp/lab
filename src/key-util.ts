import { KeyLayout } from "./key";

export function usDelKey() {
  return new KeyLayout({
    labels: [{ text: "Delete", dir: "se" }],
    width: 1.5,
  });
}
export function usTabKey() {
  return new KeyLayout({
    labels: [{ text: "Tab", dir: "sw" }],
    width: 1.5,
  });
}
export function usCapsKey() {
  return new KeyLayout({
    labels: [{ text: "Caps", dir: "sw" }],
    width: 1.75,
  });
}
export function usReturnKey() {
  return new KeyLayout({
    labels: [{ text: "Return", dir: "se" }],
    width: 1.75,
  });
}
export function usShiftKey(type: "L" | "R") {
  return new KeyLayout({
    labels: [{ text: "Shift", dir: type === "L" ? "sw" : "se" }],
    width: 2.25,
  });
}

export function usRow5() {
  return [
    new KeyLayout({
      labels: [{ text: "Fn", dir: "sw" }],
    }),
    new KeyLayout({
      labels: [{ text: "Ctrl", dir: "sw" }],
    }),
    new KeyLayout({
      labels: [{ text: "Opt", dir: "sw" }],
    }),
    new KeyLayout({
      labels: [{ text: "Cmd", dir: "se" }],
      width: 1.25,
    }),
    new KeyLayout({
      labels: [{ text: "Space", dir: "se" }],
      width: 5,
    }),
    new KeyLayout({
      labels: [{ text: "cmd", dir: "se" }],
      width: 1.25,
    }),
    new KeyLayout({
      labels: [{text: "Opt", dir: "se"}]
    }),
    ["←"],
    new KeyLayout({
      labels: [
        { text: "↑", dir: "n" },
        { text: "↓", dir: "s" },
      ],
    }),
    ["→"],
  ];
}
