const fs = require("fs");
let v = fs.readFileSync("runic.tsv").toString();
let i = -1;
while ((i = v.indexOf("\r\n")) > -1) {
  v = v.replace("\r\n", "\n");
}

const lines = v.split("\n").map((v) => v.split("\t"));
const luts = [new Map(), new Map(), new Map(), new Map(), new Map()];
for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  const [codePoint, rune, transliteration, ipa, name] = line;
  for (let j = 5; j < 10; j++) {
    if (line[j]) {
      const lut = luts[j - 5];
      let arr = lut.get(transliteration);
      if (!arr) {
        arr = {
          transliteration,
          ipa,
          runes: [],
        };
        lut.set(transliteration, arr);
      }
      arr.runes.push({ name, codePoint:parseInt(codePoint), rune });
    }
  }
}


const [Elder, AngloSaxon, YoungerLong, YoungerShort, Medieval] = luts.map(v => Array.from(v.values()));
fs.writeFileSync(
  "src/runic-table.ts",
  "export default " +
    JSON.stringify(
      {
        Elder,
        AngloSaxon,
        YoungerLong,
        YoungerShort,
        Medieval,
      },
      null,
      2
    )
);
