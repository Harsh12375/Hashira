const fs = require("fs");

function readJSON(path) {
  return JSON.parse(fs.readFileSync(path, "utf-8"));
}

function decode(base, value) {
  return BigInt(parseInt(value, parseInt(base)));
}

function lagrange(points) {
  let c = 0n;
  for (let i = 0; i < points.length; i++) {
    let [xi, yi] = points[i];
    let num = 1n, den = 1n;
    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        let [xj] = points[j];
        num *= -BigInt(xj);
        den *= BigInt(xi - xj);
      }
    }
    c += yi * (num / den);
  }
  return c;
}

function main() {
  const data = readJSON("input.json");
  const n = data.keys.n;
  const k = data.keys.k;
  const points = [];
  let count = 0;
  for (let key in data) {
    if (key !== "keys" && count < k) {
      let x = parseInt(key);
      let y = decode(data[key].base, data[key].value);
      points.push([x, y]);
      count++;
    }
  }
  console.log("✨ The hidden constant 'c' is:", lagrange(points).toString());
}

main();
