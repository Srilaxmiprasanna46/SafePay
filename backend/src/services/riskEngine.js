function calculateRisk(transaction) {
    let amountRisk = 0;
    let relationshipRisk = 0;
    let deviceRisk = 0;
    let locationRisk = 0;
    let frequencyRisk = 0;
    let behaviourRisk = 0;

    // 1. Amount risk
    if (transaction.amount >= 50000) {
        amountRisk = 25;
    } else if (transaction.amount >= 20000) {
        amountRisk = 20;
    } else if (transaction.amount >= 10000) {
        amountRisk = 10;
    }

    // 2. Relationship risk
    if (transaction.isFirstTransaction) {
        relationshipRisk = 20;
    }

    // 3. Device risk
    if (transaction.newDevice) {
        deviceRisk = 15;
    }

    // 4. Location risk
    if (transaction.unusualLocation) {
        locationRisk = 15;
    }

    // 5. Frequency risk
    if (transaction.highFrequency) {
        frequencyRisk = 10;
    }

    // 6. Behaviour risk
    if (transaction.unusualBehaviour) {
        behaviourRisk = 15;
    }

    const riskScore =
        amountRisk +
        relationshipRisk +
        deviceRisk +
        locationRisk +
        frequencyRisk +
        behaviourRisk;

    let riskLevel;

    if (riskScore >= 80) {
        riskLevel = "CRITICAL";
    } else if (riskScore >= 60) {
        riskLevel = "HIGH";
    } else if (riskScore >= 30) {
        riskLevel = "MEDIUM";
    } else {
        riskLevel = "LOW";
    }

    return {
        riskScore,
        riskLevel,
        factors: {
            amountRisk,
            relationshipRisk,
            deviceRisk,
            locationRisk,
            frequencyRisk,
            behaviourRisk
        }
    };
}

module.exports = {
    calculateRisk
};