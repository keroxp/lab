// export const kDefaultWidth = 48;// 2*2*2*2*3
// export const kDefaultMargin = 5;
export type KeyCapDir = "c" | "s" | "w" | "e" | "n" | "ne" | "nw" | "se" | "sw";
export type KeyLabel = {
  text: string;
  dir: KeyCapDir;
};
export type KeyboardDef = {
  name: string,
  fontFace?: string,
  rows: KeyboardRow[]
}
export type KeyboardRow = (string[] | KeyLayout)[];
export class KeyLayout {
  width: number;
  labels: KeyLabel[];
  static fromKeyLabels(arr: string[]) {
    const v: KeyLabel[] = [];
    if (arr.length === 1) {
      v.push({ text: arr[0], dir: "c" });
    } else {
      const [a, b, c, d] = arr;
      if (a != null) v.push({ text: a, dir: "n" });
      if (b != null) v.push({ text: b, dir: "s" });
      if (c != null) v.push({ text: c, dir: "w" });
      if (d != null) v.push({ text: d, dir: "e" });
    }
    return new KeyLayout({ labels: v });
  }
  constructor({
    labels,
    width = 1,
  }: {
    labels: KeyLabel[];
    width?: number;
  }) {
    this.width = width;
    this.labels = labels;
  }
}
