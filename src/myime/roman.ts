import { RamanTable } from "./dvorak-jp-sakura";

class ANode {
  children = new Map<string, ANode>();
  result?: string;
  constructor(
    readonly parent: ANode | undefined,
    readonly char: string,
    readonly depth: number
  ) {}
  addChild(char: string) {
    this.children.set(char, new ANode(this, char, this.depth + 1));
  }
  getChild(char: string) {
    return this.children.get(char);
  }
  getOrAddChild(char: string) {
    let result = this.getChild(char);
    if (result) return result;
    result = new ANode(this, char, this.depth + 1);
    this.children.set(char, result);
    return result;
  }
  *reverse() {
    let t: ANode | undefined = this;
    while (t) {
      yield t;
      t = t.parent;
    }
  }
  *print(tab: string): IterableIterator<string> {
    let v = tab + this.char;
    if (this.result) v += "→ " + this.result;
    yield v;
    for (const [_, child] of this.children) {
      yield* child.print(tab + "  ");
    }
  }
}

function buildTree(table: RamanTable) {
  const root = new ANode(undefined, "", 0);
  for (const [key, val] of table) {
    let n: ANode = root;
    for (const char of key.split("")) {
      n = n.getOrAddChild(char);
    }
    if (n !== root) {
      n.result = val;
    }
  }
  return root;
}

export class RomanConverter {
  private pos: ANode;
  root: ANode;
  private _buffer: string = "";
  private stack: ANode[] = [];
  public get buffer(): string {
    return this._buffer;
  }
  constructor(table: RamanTable) {
    this.root = buildTree(table);
    this.pos = this.root;
  }
  reset() {
    this._buffer = "";
    this.pos = this.root;
  }
  add(s: string): boolean {
    const next = this.pos.getChild(s);
    if (!next) {
      const head = this.root.getChild(s);
      if (!head) {
        this.pos = this.root;
      } else {
        this.stack.push(this.pos);
        this.pos = head;
      }
    } else if (next.result) {
      const len = this.buffer.length;
      this._buffer = this.buffer.slice(0, len - this.pos.depth) + next.result;
      this.stack.push(this.root)
      this.pos = this.root;
      return true;
    } else {
      this.pos = next;
    }
    this._buffer += s;
    return false;
  }
  delete() {
    if (this._buffer === "") {
      return;
    }
    let next: ANode | undefined;
    if (this.pos !== this.root) {
      next = this.pos.parent!;
    } else {
      next = this.stack.pop();
    }
    this.pos = next ?? this.root;
    this._buffer = this._buffer.slice(0, -1);
  }
  debug() {
    const hist = this.stack.map((i) => i.char);
    const tree = Array.from(this.pos.reverse())
      .reverse()
      .slice(1)
      .map((i) => i.char);
    console.log(hist, tree);
  }
}
