import React, { FC, useMemo, useState } from "react";
import {
  RunicAlphabet,
  RunicAlphabets,
  RunicCharacter,
} from "./runic-alphabet";

const sorts = ["unicode", "latin"];
export const RunicAlphabetTable: FC = () => {
  const [sort, setSort] = useState("latin");
  return (
    <div>
      <div>
        <span>Sort</span>
        <select
          onChange={(ev) => {
            setSort(ev.currentTarget.value);
          }}
        >
          {sorts.map((v) => (
            <option value={v} selected={v === sort}>
              {v}
            </option>
          ))}
        </select>
      </div>
      <div style={{ fontFamily: "NotoSansRunic" }}>
        {RunicAlphabets.map((v) => (
          <Table alphabet={v} sort={sort} />
        ))}
      </div>
    </div>
  );
};

function runeSort(a: RunicCharacter, b: RunicCharacter): number {
  if (a.transliteration !== "" && b.transliteration !== "") {
    return a.transliteration.localeCompare(b.transliteration);
  } else if (!a.transliteration) {
    return 1;
  } else {
    return -1;
  }
}
const Table: FC<{ alphabet: RunicAlphabet; sort: string }> = ({
  alphabet,
  sort,
}) => {
  const count = alphabet.chars.length;
  const list = useMemo(() => {
    if (sort === "unicode") return alphabet.chars;
    return Array.from(alphabet.chars).sort(runeSort);
  }, [alphabet, sort]);
  return (
    <div className="runic-alphabet">
      <div className="runic-alphabet-name">{alphabet.name}</div>
      <div className="runic-alphabet-ages">
        {count} letters / {alphabet.ages}
      </div>
      <div className="runic-table">
        {list.map((v) => {
          return (
            <div className="runic-cell">
              <div className="runic-cell-ipa">{v.ipa}</div>
              <div className="runic-cell-rune">
                {v.runes.map((rune) => {
                  return <div>{rune.rune}</div>;
                })}
              </div>
              <div className="runic-cell-trans">{v.transliteration}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
