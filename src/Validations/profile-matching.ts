import type { ProfileMatchingData } from "@/services/profile-matching";

export function validateProfileMatchingData(
  data: Partial<ProfileMatchingData | undefined>
): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  if (data === undefined) {
    return {
      valid: false,
      errors: ["Data tidak boleh kosong"],
    };
  }

  // Validasi kode
  if (!data.kode || typeof data.kode !== "string" || data.kode.trim() === "") {
    errors.push("Kode harus diisi dan berupa string.");
  }

  // Validasi kriteria
  if (
    !Array.isArray(data.kriteria) ||
    data.kriteria.length === 0 ||
    data.kriteria.some(
      (k) =>
        !k.nama ||
        typeof k.nama !== "string" ||
        typeof k.bobot !== "number" ||
        k.bobot <= 0
    )
  ) {
    errors.push(
      "Kriteria harus berupa array dengan nama string dan bobot number > 0."
    );
  }

  // Validasi preference
  if (
    !data.preference ||
    typeof data.preference.cf !== "number" ||
    typeof data.preference.sf !== "number" ||
    data.preference.cf + data.preference.sf !== 100
  ) {
    errors.push(
      "Preference harus memiliki properti cf dan sf dengan jumlah total 100."
    );
  }

  // Validasi sub-kriteria
  if (
    !Array.isArray(data["sub-kriteria"]) ||
    data["sub-kriteria"].length === 0 ||
    data["sub-kriteria"].some(
      (sk) =>
        !sk.nama ||
        typeof sk.nama !== "string" ||
        !sk.kriteria ||
        typeof sk.kriteria !== "string" ||
        typeof sk.harapan_nilai !== "number" ||
        !["CORE FACTOR", "SECONDARY FACTOR"].includes(sk.jenis)
    )
  ) {
    errors.push(
      "Sub-kriteria harus array valid dengan nama, kriteria, harapan_nilai number dan jenis CORE FACTOR atau SECONDARY FACTOR."
    );
  }

  // Validasi subject
  if (
    !Array.isArray(data.subject) ||
    data.subject.length === 0 ||
    data.subject.some(
      (subj) =>
        !subj.nama ||
        typeof subj.nama !== "string" ||
        !Array.isArray(subj.nilai) ||
        subj.nilai.some(
          (n) =>
            !n["sub-kriteria"] ||
            typeof n["sub-kriteria"] !== "string" ||
            typeof n.nilai !== "number"
        )
    )
  ) {
    errors.push(
      "Subject harus array valid dengan nama string dan nilai array dengan sub-kriteria dan nilai number."
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
