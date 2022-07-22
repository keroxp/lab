export interface RunicLetter {
  codePoint: number;
  rune: string;
  name: string;
}

export interface RunicCharacter {
  runes: RunicLetter[];
  transliteration: string;
  ipa: string;
}

export interface RunicAlphabet {
  name: string;
  ages: string;
  chars: RunicCharacter[];
}

import Table from "./runic-table";

export const RunicAlphabets: RunicAlphabet[] = [
  {
    name: "Elder Futhark",
    ages: "2th ~ 8th centiries",
    chars: Table.Elder,
  },
  {
    name: "Anglo-Saxon Runes",
    ages: "5th ~ 11th centuries",
    chars: Table.AngloSaxon,
  },

  {
    name: "Younger Futhark(Long-Branch)",
    ages: "9th ~ 11th centuries",
    chars: Table.YoungerLong,
  },
  {
    name: "Younger Futhark(Short-Twig)",
    ages: "9th ~ 11th centuries",
    chars: Table.YoungerShort,
  },
  {
    name: "Medival Runes",
    ages: "12th ~ 15th centuries",
    chars: Table.Medieval,
  },
];
