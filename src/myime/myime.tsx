import React, { useEffect, useRef, useState } from "react";
import { DvorakJPSakuraTable, RamanTable } from "./dvorak-jp-sakura";
import { RomanConverter } from "./roman";
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
      console.log(ev);      
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
      } else if (ev.key === ' ') {
        const commit = conv.buffer;
        if (commit) {
          conv.reset();
          _text += commit;
          setConposing("");
        } else {
          _text += "＿";
        }
      } else if (!skip.includes(ev.key)) {
        conv.add(ev.key);
        setConposing(conv.buffer);
      }
      conv.debug()
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
