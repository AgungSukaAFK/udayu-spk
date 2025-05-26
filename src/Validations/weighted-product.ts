import type { WeightedProductData } from "@/services/weighted-product";

export function validateWeightedProductData(
  data: Partial<WeightedProductData | undefined>
): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  if (data === undefined) {
    return {
      valid: false,
      errors: ["Data tidak boleh kosong."],
    };
  }

  // Validate kode (code)
  if (!data.kode || typeof data.kode !== "string" || data.kode.trim() === "") {
    errors.push("Kode harus diisi dan berupa string yang tidak kosong.");
  }

  // Validate criteria
  if (
    !Array.isArray(data.criteria) ||
    data.criteria.length === 0 ||
    data.criteria.some(
      (c) =>
        !c.code ||
        typeof c.code !== "string" ||
        !c.name ||
        typeof c.name !== "string" ||
        typeof c.weight !== "number" ||
        c.weight <= 0 ||
        !c.type || // Validate type
        !["Benefit", "Cost"].includes(c.type) || // Validate type value
        !Array.isArray(c.assessments) ||
        c.assessments.length === 0 ||
        c.assessments.some(
          (a) =>
            !a.value ||
            typeof a.value !== "string" ||
            typeof a.score !== "number" ||
            a.score < 0
        )
    )
  ) {
    errors.push(
      "Kriteria harus berupa array yang valid, setiap kriteria harus memiliki kode (string), nama (string), bobot (number > 0), jenis (Benefit/Cost), dan daftar penilaian (array dengan nilai string dan skor number >= 0)."
    );
  }

  // Validate fishCandidates
  if (
    !Array.isArray(data.fishCandidates) ||
    data.fishCandidates.length === 0 ||
    data.fishCandidates.some(
      (fc) =>
        !fc.code ||
        typeof fc.code !== "string" ||
        !Array.isArray(fc.assessments) ||
        fc.assessments.length === 0 ||
        fc.assessments.some(
          (a) =>
            !a.criteriaCode ||
            typeof a.criteriaCode !== "string" ||
            !a.value ||
            typeof a.value !== "string"
        )
    )
  ) {
    errors.push(
      "Kandidat ikan harus berupa array yang valid, setiap kandidat harus memiliki kode (string) dan daftar penilaian (array dengan kode kriteria string dan nilai string)."
    );
  }

  // HAPUS BARIS INI:
  // if (typeof data.qualityThreshold !== 'number' || data.qualityThreshold < 0) {
  //   errors.push("Ambang batas kualitas (qualityThreshold) harus berupa angka positif.");
  // }

  return {
    valid: errors.length === 0,
    errors,
  };
}
