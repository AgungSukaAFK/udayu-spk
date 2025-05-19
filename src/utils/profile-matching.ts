import type { ProfileMatchingData } from "@/services/profile-matching";

export function getKriteria(pm: ProfileMatchingData) {
  return pm.kriteria;
}

export function getSubKriteria(pm: ProfileMatchingData) {
  return pm["sub-kriteria"].sort((a, b) =>
    a.kriteria.localeCompare(b.kriteria)
  );
}

export function getSubjects(pm: ProfileMatchingData) {
  return pm.subject;
}

export function hitungGap(pm: ProfileMatchingData) {
  const subKriteriaMap = new Map(
    pm["sub-kriteria"].map((sk) => [sk.nama, sk.harapan_nilai])
  );

  return pm.subject.map((sub) => {
    const gapNilai = sub.nilai.map((n) => {
      const harapan = subKriteriaMap.get(n["sub-kriteria"]);
      const gap = harapan !== undefined ? n.nilai - harapan : null;

      return {
        subKriteria: n["sub-kriteria"],
        gap,
      };
    });

    return {
      nama: sub.nama,
      gap: gapNilai,
    };
  });
}

// Pembobotan GAP
export function bobotGap(gap: number | null | undefined): number {
  if (isNaN(Number(gap))) {
    return 0;
  }
  switch (gap) {
    case 0:
      return 5;
    case 1:
      return 4.5;
    case -1:
      return 4;
    case 2:
      return 3.5;
    case -2:
      return 3;
    case 3:
      return 2.5;
    case -3:
      return 2;
    case 4:
      return 1.5;
    case -4:
      return 1;
    default:
      return 0;
  }
}

// Hitung nilai CF dan SF
export function hitungCF_SF(
  pm: ProfileMatchingData,
  gapData: {
    nama: string;
    gap: { subKriteria: string; gap: number | null }[];
  }[]
) {
  const subKriteriaInfo = new Map(
    pm["sub-kriteria"].map((sk) => [
      sk.nama,
      { kriteria: sk.kriteria, jenis: sk.jenis },
    ])
  );

  return gapData.map(({ nama, gap }) => {
    const kelompok: Record<string, { cf: number[]; sf: number[] }> = {};

    gap.forEach(({ subKriteria, gap }) => {
      const info = subKriteriaInfo.get(subKriteria);
      if (!info || gap === null) return;

      const bobot = bobotGap(gap);
      if (!kelompok[info.kriteria]) {
        kelompok[info.kriteria] = { cf: [], sf: [] };
      }

      if (info.jenis === "CORE FACTOR") {
        kelompok[info.kriteria].cf.push(bobot);
      } else if (info.jenis === "SECONDARY FACTOR") {
        kelompok[info.kriteria].sf.push(bobot);
      }
    });

    const kriteriaValues = Object.entries(kelompok).map(([kriteria, vals]) => {
      const avgCF = vals.cf.length
        ? vals.cf.reduce((a, b) => a + b, 0) / vals.cf.length
        : 0;
      const avgSF = vals.sf.length
        ? vals.sf.reduce((a, b) => a + b, 0) / vals.sf.length
        : 0;
      return [kriteria, avgCF, avgSF] as [string, number, number];
    });

    return {
      nama,
      kriteria: kriteriaValues,
    };
  });
}

type NilaiAspek = {
  nama: string;
  nilai_total_aspek: {
    kriteria: string;
    nta: number;
  }[];
};

export function hitungNilaiTotalAspek(
  pm: ProfileMatchingData,
  nilaiCfSf: { nama: string; kriteria: [string, number, number][] }[]
): NilaiAspek[] {
  return nilaiCfSf.map((subject) => {
    const nilai_total_aspek = subject.kriteria.map(
      ([kriteria, nilai_cf, nilai_sf]) => {
        const pref = pm.preference || { cf: 60, sf: 40 };
        const cfBobot = pref.cf / 100;
        const sfBobot = pref.sf / 100;

        // Hitung NTA sesuai formula
        const nta = nilai_cf * cfBobot + nilai_sf * sfBobot;

        return {
          kriteria,
          nta: Number(nta.toFixed(2)),
        };
      }
    );

    return {
      nama: subject.nama,
      nilai_total_aspek,
    };
  });
}

export function hitungRanking(
  pm: ProfileMatchingData,
  ntaData: {
    nama: string;
    nilai_total_aspek: { kriteria: string; nta: number }[];
  }[]
) {
  // Map kriteria ke bobotnya supaya gampang akses
  const bobotKriteriaMap = new Map(pm.kriteria.map((k) => [k.nama, k.bobot]));

  // Hitung nilai akhir tiap subjek
  const hasil = ntaData.map(({ nama, nilai_total_aspek }) => {
    const nilaiAkhir = nilai_total_aspek.reduce((acc, curr) => {
      const bobot = (bobotKriteriaMap.get(curr.kriteria) ?? 0) / 100;
      return acc + curr.nta * bobot;
    }, 0);

    return { nama, nilaiAkhir };
  });

  // Urutkan dari nilai tertinggi ke terendah
  hasil.sort((a, b) => b.nilaiAkhir - a.nilaiAkhir);

  // Tambahkan ranking
  return hasil.map(({ nama, nilaiAkhir }, index) => [
    nama,
    nilaiAkhir.toFixed(3),
    `Ranking ${index + 1}`,
  ]);
}
