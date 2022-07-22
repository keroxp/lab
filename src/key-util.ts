import { kDefaultMargin, kDefaultWidth, KeyLayout } from "./key";

export function usDelKey(width = kDefaultWidth, margin = kDefaultMargin) {
  return new KeyLayout({
    labels: [{ text: "Delete", dir: "se" }],
    width: width * 1.5 + margin,
  });
}
export function usTabKey(width = kDefaultWidth, margin = kDefaultMargin) {
  return new KeyLayout({
    labels: [{ text: "Tab", dir: "sw" }],
    width: width * 1.5 + margin,
  });
}
export function usCapsKey(width = kDefaultWidth, margin = kDefaultMargin) {
  return new KeyLayout({
    labels: [{ text: "Caps", dir: "sw" }],
    width: width * 1.75 + margin,
  });
}
export function usReturnKey(width = kDefaultWidth, margin = kDefaultMargin) {
  return new KeyLayout({
    labels: [{ text: "Return", dir: "se" }],
    width: width * 1.75 + margin,
  });
}
export function usShiftKey(
  type: "L" | "R",
  width = kDefaultWidth,
  margin = kDefaultMargin
) {
  return new KeyLayout({
    labels: [{ text: "Shift", dir: type === "L" ? "sw" : "se" }],
    width: width * 2.25 + margin * 2,
  });
}
