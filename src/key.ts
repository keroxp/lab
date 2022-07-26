// export const kDefaultWidth = 48;// 2*2*2*2*3

// export const kDefaultMargin = 5;
export type KeyCapDir = "c" | "s" | "w" | "e" | "n" | "ne" | "nw" | "se" | "sw";
export type KeyLabel = {
  text: string;
  dir: KeyCapDir;
};

export interface KeyboardLayout {
  name: string;
  fontFace?: string;
  rows: KeyLayout[][];
}

export type KeybaordCol = string | string[] | KeyLayout;
export type KeyboardRow = KeybaordCol[];
export interface KeyLayout {
  width: number;
  labels: KeyLabel[];
}

export function key(key: string): KeyLayout;
export function key(width: number, ...arr: KeyLabel[]): KeyLayout;
export function key(width: number, arr: KeyLabel[]): KeyLayout;
export function key(layout: Partial<KeyLayout>): KeyLayout;
export function key(...args: any[]): KeyLayout {
  const result: KeyLayout = { width: 1, labels: [] };
  if (args.length === 1) {
    if (typeof args[0] === "string") {
      result.labels.push({ text: args[0], dir: "c" });
    } else {
      Object.assign(result, args[0]);
    }
  } else if (typeof args[0] === "number") {
    if (Array.isArray(args[1])) {
      result.width = args[0];
      result.labels = args[1];
    } else {
      result.width = args[0];
      result.labels = args.slice(1);
    }
  }
  return result;
}

export function label(...arr: [string, KeyCapDir][]): KeyLabel[];
export function label(arr: [string, KeyCapDir][]): KeyLabel[];
export function label(text: string, dir: KeyCapDir): KeyLabel[];
export function label(...args: any[]): KeyLabel[] {
  if (typeof args[0] === "string") {
    return [{ text: args[0], dir: args[1] }];
  } else {
    return args.map(([text, dir]) => ({ text, dir }));
  }
}

export function unwrapLayout(rows: KeybaordCol[][]) {
  return rows.map(unwrapRow);
}

export function unwrapRow(row: KeybaordCol[]): KeyLayout[] {
  return row.map(unwrapCol);
}

const dirs: KeyCapDir[] = ["n", "s", "w", "e"];
export function unwrapCol(col: KeybaordCol): KeyLayout {
  if (typeof col === "string") {
    return key(1.0, label([col, "c"]));
  } else if (Array.isArray(col)) {
    return key(
      1.0,
      label(...col.map((v, i): [string, KeyCapDir] => [v, dirs[i]]))
    );
  } else {
    return key(col);
  }
}
