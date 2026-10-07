const { determinePolicy } = require("./policyEngine");

const tests = [
    { score: 10, level: "LOW" },
    { score: 45, level: "MEDIUM" },
    { score: 70, level: "HIGH" },
    { score: 90, level: "CRITICAL" }
];

for (const test of tests) {
    const result = determinePolicy(test.score, test.level);

    console.log("\nRisk:", test.level);
    console.log("Score:", test.score);
    console.log("Action:", result.action);
}