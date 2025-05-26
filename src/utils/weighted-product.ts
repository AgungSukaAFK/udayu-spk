// utils/weighted-product.ts

import type { WeightedProductData } from "@/services/weighted-product";

export function getCriteria(wpData: WeightedProductData) {
  return wpData.criteria;
}

export function getFishCandidates(wpData: WeightedProductData) {
  return wpData.fishCandidates;
}

export function convertAssessmentsToScores(wpData: WeightedProductData) {
  const criteriaAssessmentMap = new Map<string, Map<string, number>>();
  wpData.criteria.forEach((c) => {
    const assessmentMap = new Map<string, number>();
    c.assessments.forEach((a) => {
      assessmentMap.set(a.value, a.score);
    });
    criteriaAssessmentMap.set(c.code, assessmentMap);
  });

  return wpData.fishCandidates.map((candidate) => {
    const scores = candidate.assessments.map((assessment) => {
      const assessmentMap = criteriaAssessmentMap.get(assessment.criteriaCode);
      const score = assessmentMap
        ? assessmentMap.get(assessment.value)
        : undefined;
      if (score === undefined) {
        console.warn(
          `Score not found for criteria ${assessment.criteriaCode} and value ${assessment.value}`
        );
      }
      return {
        criteriaCode: assessment.criteriaCode,
        score: score !== undefined ? score : 0,
      };
    });
    return {
      code: candidate.code,
      scores: scores,
    };
  });
}

export function normalizeWeights(wpData: WeightedProductData) {
  let totalWeight = 0;
  wpData.criteria.forEach((c) => {
    totalWeight += c.weight;
  });

  return wpData.criteria.map((c) => {
    return {
      code: c.code,
      normalizedWeight: c.weight / totalWeight,
      type: c.type, // Crucial: pass the type along
    };
  });
}

export function calculateVectorS(
  scoredCandidates: {
    code: string;
    scores: { criteriaCode: string; score: number }[];
  }[],
  normalizedWeights: {
    code: string;
    normalizedWeight: number;
    type: "Benefit" | "Cost";
  }[]
) {
  const weightAndTypeMap = new Map<
    string,
    { normalizedWeight: number; type: "Benefit" | "Cost" }
  >();
  normalizedWeights.forEach((nw) => {
    weightAndTypeMap.set(nw.code, {
      normalizedWeight: nw.normalizedWeight,
      type: nw.type,
    });
  });

  return scoredCandidates.map((candidate) => {
    // --- PERUBAHAN DI SINI: Dari perkalian menjadi penjumlahan ---
    let sValue = 0; // Initialize with 0 for summation
    candidate.scores.forEach((score) => {
      const weightInfo = weightAndTypeMap.get(score.criteriaCode);
      if (weightInfo) {
        const { normalizedWeight, type } = weightInfo;
        let exponent = normalizedWeight;

        if (type === "Cost") {
          exponent = -normalizedWeight;
        }

        // Add the term to sValue (instead of multiplying)
        // Note: For score=0 and negative exponent (cost), Math.pow(0, -exp) can be Infinity.
        // This behavior might need specific handling based on your desired outcome for zero scores on cost criteria.
        sValue += Math.pow(score.score, exponent);
      } else {
        console.warn(
          `Weight and type information not found for criteria ${score.criteriaCode}`
        );
      }
    });
    return {
      code: candidate.code,
      sValue: sValue,
    };
  });
}

export function calculateVectorV(
  sVectorData: { code: string; sValue: number }[],
  numberOfCriteria: number
) {
  if (numberOfCriteria === 0) {
    console.warn("Number of criteria is zero, cannot calculate Vector V.");
    return sVectorData.map((s) => ({ code: s.code, vValue: 0 }));
  }

  // Calculation of V remains S_i / numberOfCriteria, as per journal's example
  return sVectorData.map((s) => {
    return {
      code: s.code,
      vValue: s.sValue / numberOfCriteria,
    };
  });
}

export function rankCandidates(
  vVectorData: { code: string; vValue: number }[]
) {
  const rankedData = [...vVectorData].sort((a, b) => b.vValue - a.vValue);
  return rankedData.map((data, index) => ({
    code: data.code,
    value: data.vValue,
    rank: index + 1,
  }));
}

export function determineQuality(
  rankedCandidates: { code: string; value: number; rank: number }[],
  qualityThreshold: number
) {
  return rankedCandidates.map((candidate) => ({
    code: candidate.code,
    value: candidate.value,
    decision:
      candidate.value >= qualityThreshold ? "Berkualitas" : "Tidak Berkualitas",
  }));
}
