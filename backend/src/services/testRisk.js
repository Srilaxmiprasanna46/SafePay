const { calculateRisk } = require("./riskEngine");

const testCases = [
    {
        name: "LOW RISK",
        transaction: {
            amount: 500,
            isFirstTransaction: false,
            newDevice: false,
            unusualLocation: false,
            highFrequency: false,
            unusualBehaviour: false
        }
    },
    {
        name: "MEDIUM RISK",
        transaction: {
            amount: 25000,
            isFirstTransaction: true,
            newDevice: true,
            unusualLocation: false,
            highFrequency: false,
            unusualBehaviour: false
        }
    },
    {
        name: "HIGH RISK",
        transaction: {
            amount: 50000,
            isFirstTransaction: true,
            newDevice: true,
            unusualLocation: true,
            highFrequency: false,
            unusualBehaviour: false
        }
    }
];

for (const test of testCases) {
    const result = calculateRisk(test.transaction);

    console.log("\n==============================");
    console.log(test.name);
    console.log("==============================");
    console.log("Risk Score:", result.riskScore);
    console.log("Risk Level:", result.riskLevel);
    console.log("Factors:", result.factors);
}