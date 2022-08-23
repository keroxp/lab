import React, { useEffect, useRef, useState } from "react";
import { DvorakJPSakuraTable, RamanTable } from "./dvorak-jp-sakura";
export const MyIME = () => {
  const [text, setText] = useState<string>("");
  const [conposing, setConposing] = useState("");
  // const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const conv = new RomanConverter(DvorakJPSakuraTable);
    // ref.current!.value = Array.from(conv.root.print("")).join("\n");
    const skip = ["Meta", "Shift", "Tab", "Control", "Escape"];
    let _text: string = "";
    document.addEventListener("keydown", (ev) => {
      if (ev.key === "Backspace") {
        if (conv.buffer) {
          conv.delete();
          setConposing(conv.buffer);
        } else {
          _text = _text.slice(0, -1)        
          setText(_text);
        }
      } else if (ev.key === "Enter") {
        const commit = conv.buffer;
        if (commit) {
          conv.reset();
          setConposing("");
          _text += commit;
        } else {
          _text += "\n";
        }
        setText(_text);
      } else if (!skip.includes(ev.key)) {
        conv.add(ev.key);
        setConposing(conv.buffer);
      }
    });
  }, []);
  function lines() {
    const arr = [];
    let i = 0;
    while (true) {
      const _i = text.indexOf("\n", i);
      if (_i >= 0) {
        arr.push(<span>{text.slice(i, _i)}</span>);
        arr.push(<br />);
        i = _i + 1;
      } else {
        break;
      }
    }
    arr.push(<span>{text.slice(i)}</span>);
    return arr;
  }
  return (
    <div>
      <div>
        {lines()}
        {conposing && (
          <span style={{ textDecoration: "underline" }}>{conposing}</span>
        )}
      </div>
      {/* <textarea ref={ref} /> */}
    </div>
  );
};

class ANode {
  children = new Map<string, ANode>();
  result?: string;
  constructor(readonly parent: ANode | undefined, readonly char: string) {}
  addChild(char: string) {
    this.children.set(char, new ANode(this, char));
  }
  getChild(char: string) {
    return this.children.get(char);
  }
  getOrAddChild(char: string) {
    let result = this.getChild(char);
    if (result) return result;
    result = new ANode(this, char);
    this.children.set(char, result);
    return result;
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
  const root = new ANode(undefined, "");
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

class RomanConverter {
  private pos: ANode;
  root: ANode;
  private _buffer: string = "";
  public get buffer(): string {
    return this._buffer;
  }
  private chain = 0;
  constructor(table: RamanTable) {
    this.root = buildTree(table);
    this.pos = this.root;
  }
  reset() {
    this._buffer = "";
    this.chain = 0;
    this.pos = this.root;
  }
  add(s: string): boolean {
    const next = this.pos.getChild(s);
    if (!next) {
      const head = this.root.getChild(s);
      if (!head) {
        this.pos = this.root;
        this.chain = 0;
      } else {
        this.pos = head;
        this.chain = 1;
      }
    } else if (next.result) {
      console.log(next);
      const len = this.buffer.length;
      this._buffer = this.buffer.slice(0, len - this.chain) + next.result;
      this.chain = 0;
      this.pos = this.root;
      return true;
    } else {
      this.pos = next;
      this.chain++;
    }
    this._buffer += s;
    return false;
  }
  delete() {
    if (this._buffer === "") {
      return;
    }
    if (this.pos !== this.root) {
      const prev = this.pos.parent!;
      this.pos = prev;
      this.chain--;
    }
    this._buffer = this._buffer.slice(0, -1);
  }
}
