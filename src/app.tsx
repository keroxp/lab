import React, { FC, ReactElement, useEffect, useState } from "react";
import { DvorakUSLayout } from "./layout/dvorak-us";
import { QwertyUSLayout } from "./layout/qwerty-us";
import {
  kDefaultMargin,
  kDefaultWidth,
  KeyboardDef,
  KeyLabel,
  KeyLayout,
} from "./key";
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
        <div className={["keyLabel", v.dir].join(" ")}>{v.text}</div>
      ))}
    </div>
  );
};

function colToKey(col: string[] | KeyLayout) {
  let l: KeyLayout;
  if (col instanceof KeyLayout) {
    l = col;
  } else {
    l = KeyLayout.fromKeyLabels(col);
  }
  return (
    <Key width={l.width}>
      <KeyCap labels={l.labels} />
    </Key>
  );
}

const Keyboard: FC<{ layout: KeyboardDef }> = ({ layout }) => {
  // 14 squre key and half key + 14 margins
  const width = (kDefaultWidth + kDefaultMargin) * 14 + kDefaultWidth * 0.5;
  useEffect(() => {
    const callback = (ev: KeyboardEvent) => {
      console.log(ev);
    };
    window.addEventListener("keydown", callback);
    return () => window.removeEventListener("keydown", callback);
  }, []);
  return (
    <div className="keyboard" style={{ width, fontFamily: layout.fontFace }}>
      {layout.rows.map((row) => (
        <Row>{row.map(colToKey)}</Row>
      ))}
    </div>
  );
};

const Row: FC<{
  height?: number;
  children?: Children;
}> = ({ height = kDefaultWidth, children }) => {
  return (
    <div
      className="row"
      style={{
        height,
      }}
    >
      {children}
    </div>
  );
};

const Key: FC<{
  children?: Children;
  width?: number;
}> = ({ width, children }) => {
  return (
    <div className="key" style={{ width }}>
      {children}
    </div>
  );
};
