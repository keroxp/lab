import React, { Dispatch, FC, useContext, useEffect, useState } from "react";
import { KeyboardLayout, KeyLabel, unwrapCol } from "./key";
import { usePatcher } from "./react-util";

type Children = React.ReactNode | React.ReactNode[];

export const KeyCap: FC<{
  labels: KeyLabel[];
}> = ({ labels }) => {
  return (
    <div className="keyLayout relative">
      {labels.map((v) => (
        <div key={v.text} className={`keyLabel ${v.dir}`}>
          {v.text}
        </div>
      ))}
    </div>
  );
};

type State = {
  width: number;
  margin: number;
  selected?: [number, number];
};
const Context = React.createContext<
  State & {
    dispatch: Dispatch<Partial<State>>;
  }
>({ width: 48, margin: 5, dispatch: () => {} });

export const Keyboard: FC<{
  layout: KeyboardLayout;
  onKeyClick?: (row: number, col: number) => void;
}> = ({ layout, onKeyClick }) => {
  // 14 squre key and half key + 14 margins
  const [state, dispatch] = usePatcher<State>({ width: 48, margin: 0 });
  const width = (state.width + state.margin) * 14 + state.width * 0.5;
  useEffect(() => {
    if (!state.selected) return;
    const [row, col] = state.selected;
    onKeyClick?.(row, col);
  }, [state.selected]);
  useEffect(() => {
    layout.rows.forEach((v, i) => {
      const sum = v.map((j) => unwrapCol(j).width).reduce((i, s) => i + s, 0);
      if (sum !== 14.5) {
        console.warn(`${layout.name}:row${i} ${sum}`);
      }
    });
  }, []);
  return (
    <Context.Provider value={{ ...state, dispatch }}>
      <div className="keyboard" style={{ width, fontFamily: layout.fontFace }}>
        {layout.rows.map((row, i) => (
          <KeyboardRow key={i}>
            {row.map(unwrapCol).map((l, j) => (
              <Key
                key={j}
                selected={
                  state.selected?.[0] === i && state.selected?.[1] === j
                }
                width={l.width}
                row={i}
                col={j}
              >
                <KeyCap labels={l.labels} />
              </Key>
            ))}
          </KeyboardRow>
        ))}
      </div>
    </Context.Provider>
  );
};

export const KeyboardRow: FC<{
  children?: Children;
}> = ({ children }) => {
  const value = useContext(Context);
  return (
    <div
      className="row"
      style={{ height: value.width, marginBottom: value.margin }}
    >
      {children}
    </div>
  );
};

export const Key: FC<{
  children?: Children;
  selected: boolean;
  row: number;
  col: number;
  width: number;
}> = ({ width, row, col, selected, children }) => {
  const { width: _width, margin, dispatch } = useContext(Context);
  const w = _width * width;
  const j = Math.floor(w / (_width + margin));
  const m = margin * j;
  return (
    <div
      className="key"
      data-selected={selected}
      onClick={() => dispatch({ selected: [row, col] })}
      style={{
        width: w,
        marginRight: margin,
      }}
    >
      {children}
    </div>
  );
};
