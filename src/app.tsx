import React, { FC } from "react";
import { HashRouter, Link, Route, Routes } from "react-router-dom";
import { KeyboardDesigner } from "./kbds/keyboard-designer";
import { KeyboardLayout } from "./key";
import { Keyboard } from "./keyboard";
import { KeyboardLayouts } from "./layout/layout";
import { RunicAlphabetTable } from "./rune";

const layouts = KeyboardLayouts

export const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Links />} />
        {layouts.map((v) => (
          <Route key={v.name} path={v.name} element={<_App layout={v} />} />
        ))}
        <Route path="/runes" element={<RunicAlphabetTable />} />
        <Route path="/keyboard-designer" element={<KeyboardDesigner />} />
      </Routes>
    </HashRouter>
  );
};

const Links = () => {
  return (
    <div>
      <h2>Keyboards</h2>
      {layouts.map((v) => (
        <div>
          <div>
            <Link to={v.name}>{v.name}</Link>
          </div>
        </div>
      ))}
      <ul>
        <li>
          <Link to={"/runes"}>Runic Alphabets</Link>
        </li>
        <li>
          <Link to={"/keyboard-designer"}>Keyboard Designer</Link>
        </li>
      </ul>
    </div>
  );
};

const _App: FC<{ layout: KeyboardLayout }> = ({ layout }) => {
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
