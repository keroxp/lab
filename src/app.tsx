import React, {
  FC,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { DvorakUSLayout } from "./layout/dvorak-us";
import { QwertyUSLayout } from "./layout/qwerty-us";
import { KeyboardDef, KeyLabel, KeyLayout } from "./key";
import { QwertyJISLayout } from "./layout/qwerty-jis";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import { QwertyRuneLayout } from "./layout/qwerty-rune";
import { RunicAlphabetTable } from "./rune";

const layouts = [
  DvorakUSLayout,
  QwertyUSLayout,
  QwertyJISLayout,
  QwertyRuneLayout,
];

export const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Links />} />
        {layouts.map((v) => (
          <Route key={v.name} path={v.name} element={<_App layout={v} />} />
        ))}
        <Route path="/runes" element={<RunicAlphabetTable />} />
      </Routes>
    </HashRouter>
  );
};

const Links = () => {
  return (
    <div>
      {layouts.map((v) => (
        <div>
          <div>
            <Link to={v.name}>{v.name}</Link>
          </div>
          <Keyboard layout={v} />
        </div>
      ))}
      <Link to={"/runes"}>Runes</Link>
    </div>
  );
};

const _App: FC<{ layout: KeyboardDef }> = ({ layout }) => {
  return (
    <div>
      <div>
        <select
          value={layout.name}
          onChange={(ev) => {
            const value = ev.currentTarget.value;
            const next = layouts.find((v) => v.name === value)!;
            location.hash = "/" + next.name;
          }}
        >
          {layouts.map((v, i) => (
            <option key={v.name} value={v.name}>
              {v.name}
            </option>
          ))}
        </select>
      </div>
      <Keyboard layout={layout} />
    </div>
  );
};

type Children = React.ReactNode | React.ReactNode[];

const KeyCap: FC<{
  labels: KeyLabel[];
}> = ({ labels }) => {
  return (
    <div className="keyLayout relative">
      {labels.map((v) => (
        <div className={`keyLabel ${v.dir}`}>{v.text}</div>
      ))}
    </div>
  );
};

function unwrapCol(col: string[] | KeyLayout): KeyLayout {
  if (col instanceof KeyLayout) {
    return col;
  } else {
    return KeyLayout.fromKeyLabels(col);
  }
}

function colToKey(col: string[] | KeyLayout) {
  let l = unwrapCol(col);
  return (
    <Key width={l.width}>
      <KeyCap labels={l.labels} />
    </Key>
  );
}

const Context = React.createContext<{
  width: number;
  margin: number;
}>({ width: 48, margin: 5 });

const Keyboard: FC<{ layout: KeyboardDef }> = ({ layout }) => {
  // 14 squre key and half key + 14 margins
  const w = 48;
  const m = 5;
  const width = (w + m) * 14 + w * 0.5;
  useEffect(() => {
    const callback = (ev: KeyboardEvent) => {
      console.log(ev);
    };
    window.addEventListener("keydown", callback);
    return () => window.removeEventListener("keydown", callback);
  }, []);
  useEffect(() => {
    layout.rows.forEach((v, i) => {
      const sum = v.map((j) => unwrapCol(j).width).reduce((i, s) => i + s, 0);
      if (sum !== 14.5) {
        console.warn(`${layout.name}:row${i} ${sum}`);
      }
    });
  }, []);
  return (
    <Context.Provider value={{ width: w, margin: m }}>
      <div className="keyboard" style={{ fontFamily: layout.fontFace }}>
        {layout.rows.map((row) => (
          <Row>{row.map(colToKey)}</Row>
        ))}
      </div>
    </Context.Provider>
  );
};

const Row: FC<{
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

const Key: FC<{
  children?: Children;
  width: number;
}> = ({ width, children }) => {
  const value = useContext(Context);
  const w = value.width * width;
  const j = Math.floor(w / (value.width + value.margin));
  const m = value.margin * j;
  return (
    <div
      className="key"
      style={{
        width: w + m,
        marginRight: value.margin,
      }}
    >
      {children}
    </div>
  );
};
