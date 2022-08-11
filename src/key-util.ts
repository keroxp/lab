import { key } from "./key";

export function usDelKey() {
  return key({
    labels: { se: { text: "Delete" } },
    width: 1.5,
  });
}
export function usTabKey() {
  return key({
    labels: { sw: { text: "Tab" } },
    width: 1.5,
  });
}
export function usCapsKey() {
  return key({
    labels: { sw: { text: "Caps" } },
    width: 1.75,
  });
}
export function usReturnKey() {
  return key({
    labels: { se: { text: "Return" } },
    width: 1.75,
  });
}
export function usShiftKey(type: "L" | "R") {
  return key({
    labels: {
      [type === "L" ? "sw" : "se"]: { text: "Shift" },
    },
    width: 2.25,
  });
}

export function usRow5() {
  return [
    key({
      labels: { sw: { text: "Fn" } },
    }),
    key({
      labels: { se: { text: "Ctrl" } },
    }),
    key({
      labels: { se: { text: "Opt" } },
    }),
    key({
      labels: { se: { text: "Cmd" } },
      width: 1.25,
    }),
    key({
      labels: { se: { text: "Space" } },
      width: 5,
    }),
    key({
      labels: { sw: { text: "cmd" } },
      width: 1.25,
    }),
    key({
      labels: { sw: { text: "Opt" } },
    }),
    ["←"],
    key({
      labels: {
        n: { text: "↑" },
        s: { text: "↓" },
      },
    }),
    ["→"],
  ];
}
