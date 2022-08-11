// export const kDefaultWidth = 48;// 2*2*2*2*3

// export const kDefaultMargin = 5;
export type KeyCapDir = "c" | "s" | "w" | "e" | "n" | "ne" | "nw" | "se" | "sw";
export type KeyLabel = {
  text: string;
};

export interface KeyboardLayout {
  name: string;
  fontFace?: string;
  rows: KeyLayout[][];
}

export type KeybaordCol = string | string[] | KeyLayout;
export type KeyboardRow = KeybaordCol[];
export type KeyLabelMap = {
  [p in KeyCapDir]?: KeyLabel | undefined;
};
export interface KeyLayout {
  width: number;
  labels: KeyLabelMap;
}

export function key(key: string): KeyLayout;
export function key(width: number, map: KeyLabelMap): KeyLayout;
export function key(layout: Partial<KeyLayout>): KeyLayout;
export function key(...args: any[]): KeyLayout {
  const result: KeyLayout = { width: 1, labels: {} };
  if (args.length === 1) {
    if (typeof args[0] === "string") {
      result.labels.c = { text: args[0] };
    } else {
      Object.assign(result, args[0]);
    }
  } else if (typeof args[0] === "number") {
    result.width = args[0];
    result.labels = args[1];
  }
  return result;
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
    return key(1.0, { c: { text: col } });
  } else if (Array.isArray(col)) {
    return key(
      1.0,
      Object.fromEntries(col.map((text, i) => [dirs[i], { text }]))
    );
  } else {
    return key(col);
  }
}
