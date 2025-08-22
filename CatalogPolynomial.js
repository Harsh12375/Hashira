// catalogPolynomial.js
// 🚀 Creative / humanized version for Catalog Placements Assignment

const fs = require("fs");
const path = require("path");

// Function to decode number from a given base
function decodeValue(value, base) {
    return BigInt(parseInt(value, base));
}

// Lagrange Interpolation at x = 0
function lagrangeAtZero(xs, ys) {
    let secret = BigInt(0);
    let k = xs.length;

    for (let i = 0; i < k; i++) {
        let xi = BigInt(xs[i]);
        let yi = BigInt(ys[i]);

        let numerator = BigInt(1);
        let denominator = BigInt(1);

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                numerator *= -BigInt(xs[j]);
                denominator *= (xi - BigInt(xs[j]));
            }
        }

        secret += yi * (numerator / denominator);
    }

    return secret;
}

// MAIN FUNCTION
function main() {
    // Read JSON from input file
    const filePath = path.join(__dirname, "input.json");
    const raw = fs.readFileSync(filePath, "utf8");
    const obj = JSON.parse(raw);

    const n = obj.keys.n;
    const k = obj.keys.k;

    let xs = [];
    let ys = [];

    console.log("📥 Input loaded from JSON: n =", n, "k =", k);
    console.log("\n🔑 Decoded roots (x, y):");

    for (const key in obj) {
        if (key !== "keys") {
            let base = parseInt(obj[key].base);
            let value = obj[key].value;

            let y = decodeValue(value, base);
            xs.push(parseInt(key));
            ys.push(y);

            console.log(`   (${key}, ${y})`);
        }
    }

    // Only use first k roots
    xs = xs.slice(0, k);
    ys = ys.slice(0, k);

    console.log("\n✨ Applying Lagrange Interpolation...");
    const secret = lagrangeAtZero(xs, ys);

    console.log("\n🎉 The hidden constant 'c' is:", secret.toString());
}

// Run program
main();
