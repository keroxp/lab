import update, { Spec } from "immutability-helper";
import React, {
  ChangeEvent,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  KeyboardLayout,
  KeyCapDir,
  KeyLabel,
  KeyLabelMap,
  KeyLayout,
} from "../key";
import { Keyboard } from "../keyboard";
import { KeyboardLayouts } from "../layout/layout";
import { QwertyJISLayout } from "../layout/qwerty-jis";

type State = {
  selected?: [number, number];
  showJson: boolean;
  layout: KeyboardLayout;
};
const Context = React.createContext<{
  state: State;
  reduce: (v: Spec<State>) => void;
}>({
  state: { layout: QwertyJISLayout, showJson: false },
  reduce: () => {},
});
export const KeyboardDesigner = () => {
  const [state, dispatch] = useState<State>({
    layout: QwertyJISLayout,
    showJson: false,
  });
  const reduce = useMemo(() => {
    return (spec: Spec<State>) => {
      dispatch(update(state, spec));
    };
  }, [state]);
  return (
    <Context.Provider value={{ state, reduce }}>
      <div className="keyboardDesigner">
        <Keyboard
          layout={state.layout}
          selected={state.selected}
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
                dispatch(update(state, { layout: { $set: layout } }));
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
            <button
              onClick={() => dispatch({ ...state, showJson: !state.showJson })}
            >
              Show JSON
            </button>
            {state.showJson && (
              <textarea
                value={JSON.stringify(state.layout)}
                onChange={(ev) => {
                  const next: KeyboardLayout = JSON.parse(
                    ev.currentTarget.value
                  );
                  dispatch(update(state, { layout: { $set: next } }));
                }}
              />
            )}
          </div>
        </div>
      </div>
    </Context.Provider>
  );
};

const dirs: KeyCapDir[] = ["nw", "n", "ne", "w", "c", "e", "sw", "s", "se"];

const KeyInspector: FC<{ indices: [number, number] }> = ({ indices }) => {
  const { state, reduce } = useContext(Context);
  const key = state.layout.rows[indices[0]][indices[1]];
  const [row, col] = state.selected!;
  const query = (spec: Spec<KeyLayout>): Spec<State> => {
    return {
      layout: { rows: { [row]: { [col]: spec } } },
    };
  };
  const onChangeLabel = (dir: KeyCapDir, text: string) => {
    reduce(query({ labels: { [dir]: { $set: { text, dir } } } }));
  };
  const onSwap = (a: KeyCapDir, b: KeyCapDir) => {
    const _a = key.labels[a];
    const _b = key.labels[b];
    const next = { ...key.labels };
    next[a] = _b;
    next[b] = _a;
    if (!_a) delete next[b];
    if (!_b) delete next[a];
    reduce(query({ labels: { $set: next } }));
  };
  const onInputWitdh = (ev: ChangeEvent<HTMLInputElement>) => {
    reduce(query({ width: { $set: ev.currentTarget.valueAsNumber } }));
  };
  const onAddKey = (left: boolean) => () => {
    const key: KeyLayout = { width: 1, labels: {} };
    const loc = left ? col : col + 1;
    const curr = left ? col + 1 : col;
    reduce({
      layout: {
        rows: { [row]: { $splice: [[loc, 0, key]] } },
      },
      selected: { $set: [row, curr] },
    });
  };
  const onDelete = () => {
    reduce({
      layout: {
        rows: { [row]: { $splice: [[col, 1]] } },
      },
      selected: { $set: undefined },
    });
  };
  return (
    <div className="keyInspector">
      <div>
        <div>Labels</div>
        <KeyTop layout={key} onChange={onChangeLabel} onSwap={onSwap} />
        <div>Width</div>
        <input
          type="number"
          min={1}
          step={0.05}
          autoComplete="false"
          value={key.width}
          onChange={onInputWitdh}
        ></input>
        <div>
          <button onClick={onAddKey(true)}>Add Left</button>
          <button onClick={onDelete}>Delete</button>
          <button onClick={onAddKey(false)}>Add Right</button>
        </div>
      </div>
    </div>
  );
};

const KeyTop: FC<{
  layout: KeyLayout;
  onSwap: (dir: KeyCapDir, ne: KeyCapDir) => void;
  onChange: (dir: KeyCapDir, text: string) => void;
}> = ({ onSwap, onChange, layout }) => {
  const [edit, setEdit] = useState<KeyCapDir | undefined>();
  const [sel, setSel] = useState<KeyCapDir | undefined>();
  const labels = layout.labels;
  useEffect(() => {
    setEdit(undefined);
    setSel(undefined);
  }, [layout]);
  return (
    <div className="keyLabelEdit">
      <div className="keyLabelDirs">
        {dirs.map((dir) => {
          const label = labels[dir];
          if (edit === dir) {
            return (
              <input
                className="keyLabelCell"
                key={dir}
                type="text"
                autoFocus
                value={label?.text ?? ""}
                onBlur={(ev) => {
                  setEdit(undefined);
                }}
                onInput={(ev) => {
                  ev.currentTarget.value;
                  onChange(dir, ev.currentTarget.value);
                }}
              />
            );
          } else {
            const onClick = (ev: React.MouseEvent) => {
              if (sel) {
                onSwap(dir, sel);
                setSel(undefined);
              } else if (edit) {
                setEdit(undefined);
              } else {
                setSel(dir);
              }
            };
            return (
              <div
                key={dir}
                onClick={onClick}
                className="keyLabelCell"
                onContextMenu={(ev) => {
                  ev.preventDefault();
                  setEdit(dir);
                }}
                data-selected={sel === dir}
              >
                {label?.text ?? ""}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
