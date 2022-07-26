import React, { Dispatch, FC, useContext, useMemo, useState } from "react";
import { KeyboardLayout, KeyCapDir, KeyLabel, KeyLayout, label } from "../key";
import { Keyboard } from "../keyboard";
import { KeyboardLayouts } from "../layout/layout";
import { QwertyUSLayout } from "../layout/qwerty-us";
import { usePatcher } from "../react-util";
import update, { Spec } from "immutability-helper";
import { QwertyJISLayout } from "../layout/qwerty-jis";
import { usRow5 } from "../key-util";

type State = { selected?: [number, number]; layout: KeyboardLayout };
const Context = React.createContext<{
  state: State;
  dispatch: (v: State) => void;
}>({
  state: { layout: QwertyJISLayout },
  dispatch: () => {},
});
export const KeyboardDesigner = () => {
  const [state, dispatch] = useState<State>({ layout: QwertyJISLayout });
  return (
    <Context.Provider value={{ state, dispatch }}>
      <div className="keyboardDesigner">
        <Keyboard
          layout={state.layout}
          onKeyClick={(row, col) => {
            dispatch(
              update(state, {
                selected: { $set: [row, col] },
              })
            );
          }}
        />
        <div className="keyboardInspector">
          <div>
            <div>Base Layout</div>
            <select
              value={state.layout.name}
              onChange={(ev) => {
                const layout = KeyboardLayouts.find(
                  (v) => v.name === ev.currentTarget.value
                )!;
                dispatch({ layout });
              }}
            >
              {KeyboardLayouts.map((v) => (
                <option value={v.name} key={v.name}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>
          {state.selected && <KeyInspector indices={state.selected} />}
          <div>
            <button>Show JSON</button>
            {/* <textarea value={state.layout.toJSON()} /> */}
          </div>
        </div>
      </div>
    </Context.Provider>
  );
};

const dirs = ["nw", "n", "ne", "w", "c", "e", "sw", "s", "se"];

const KeyInspector: FC<{ indices: [number, number] }> = ({ indices }) => {
  const { state, dispatch } = useContext(Context);
  const key = state.layout.rows[indices[0]][indices[1]];
  const [row, col] = state.selected!;
  const query = (spec: Spec<KeyLayout>): Spec<State> => {
    return {
      layout: { rows: { [row]: { [col]: spec } } },
    };
  };
  const onClickAdd = () => {
    dispatch(update(state, query({ labels: { $push: label(["", "e"]) } })));
  };
  const onDelete = (i: number) => () => {
    dispatch(update(state, query({ labels: { $splice: [[i]] } })));
  };
  const onChangeLabel = (i: number) => (text: string, dir: KeyCapDir) => {
    dispatch(
      update(state, query({ labels: { [i]: { $set: { text, dir } } } }))
    );
  };
  return (
    <div className="keyInspector">
      <div>
        <div>Labels</div>
        <div>
          {key.labels.map((v, i) => (
            <KeyTop
              key={i}
              label={v}
              onChange={onChangeLabel(i)}
              onDelete={onDelete(i)}
            />
          ))}
        </div>
        <div>
          <button onClick={onClickAdd}>Add Label</button>
        </div>
        <div>Width</div>
        <input
          type="number"
          min={1}
          step={0.5}
          autoComplete="false"
          value={key.width}
        ></input>
        <button>Delete</button>
      </div>
    </div>
  );
};

const KeyTop: FC<{
  label: KeyLabel;
  onChange: (text: string, dir: KeyCapDir) => void;
  onDelete: () => void;
}> = ({ onChange, onDelete, label }) => {
  const { text, dir } = label;
  return (
    <div className="keyLabelEdit">
      <input
        type="text"
        value={text}
        onInput={(ev) => {
          ev.currentTarget.value;
          onChange(ev.currentTarget.value, dir);
        }}
      />
      <select
        value={dir}
        onChange={(ev) => {
          onChange(text, ev.currentTarget.value as KeyCapDir);
        }}
      >
        {dirs.map((dir) => (
          <option value={dir}>{dir}</option>
        ))}
      </select>
      <button onClick={onDelete}>X</button>
    </div>
  );
};
