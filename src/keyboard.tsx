import React, { Dispatch, FC, useContext, useEffect } from "react";
import { KeyboardLayout, KeyLabelMap, unwrapCol } from "./key";
import { usePatcher } from "./react-util";

type Children = React.ReactNode | React.ReactNode[];

export const KeyCap: FC<{
  labels: KeyLabelMap;
}> = ({ labels }) => {
  return (
    <div className="keyLayout relative">
      {Array.from(Object.entries(labels)).map(([dir, v]) => (
        <div key={dir} className={`keyLabel ${dir}`}>
          {v.text}
        </div>
      ))}
    </div>
  );
};

type State = {
  width: number;
  margin: number;
};
const Context = React.createContext<
  State & {
    dispatch: Dispatch<Partial<State>>;
  }
>({ width: 48, margin: 5, dispatch: () => {} });

export const Keyboard: FC<{
  layout: KeyboardLayout;
  selected?: [number, number];
  onKeyClick?: (row: number, col: number) => void;
}> = ({ layout, selected, onKeyClick }) => {
  // 14 squre key and half key + 14 margins
  const [state, dispatch] = usePatcher<State>({ width: 48, margin: 0 });
  const width = (state.width + state.margin) * 14 + state.width * 0.5;
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
      <div className="keyboard" style={{ fontFamily: layout.fontFace }}>
        {layout.rows.map((row, i) => (
          <KeyboardRow key={i}>
            {row.map(unwrapCol).map((l, j) => (
              <Key
                key={j}
                selected={selected?.[0] === i && selected?.[1] === j}
                width={l.width}
                onClick={() => onKeyClick?.(i, j)}
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
  width: number;
  onClick: () => void;
}> = ({ width, onClick, selected, children }) => {
  const { width: _width, margin } = useContext(Context);
  const w = _width * width;
  const j = Math.floor(w / (_width + margin));
  const m = margin * j;
  return (
    <div
      className="key"
      data-selected={selected}
      onClick={onClick}
      style={{
        width: w,
        marginRight: margin,
      }}
    >
      {children}
    </div>
  );
};
