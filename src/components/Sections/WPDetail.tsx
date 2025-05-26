// WPDetail.tsx
import {
  getCriteria,
  getFishCandidates,
  convertAssessmentsToScores,
  normalizeWeights,
  calculateVectorS,
  calculateVectorV,
  rankCandidates,
  determineQuality,
} from "@/utils/weighted-product";
import Section from "../Section";
import { type WeightedProductData } from "@/services/weighted-product";
import { Button } from "../ui/button";
import type { SetStateAction } from "react";
import MyTable from "../MyTable";

interface WPDetailProps {
  wp: WeightedProductData | undefined;
  setWp: React.Dispatch<SetStateAction<WeightedProductData | undefined>>;
}

export default function WPDetail({ wp, setWp }: WPDetailProps) {
  if (!wp) {
    return (
      <Section title="Detail Perhitungan Weighted Product">
        <p className="text-sm text-muted-foreground">
          Belum ada perhitungan Weighted Product yang dipilih.
        </p>
      </Section>
    );
  }

  const criteria = getCriteria(wp);
  const fishCandidates = getFishCandidates(wp);
  const scoredCandidates = convertAssessmentsToScores(wp);
  const normalizedWeights = normalizeWeights(wp);
  const numberOfCriteria = criteria.length;

  const sVectorData = calculateVectorS(scoredCandidates, normalizedWeights);
  const vVectorData = calculateVectorV(sVectorData, numberOfCriteria);

  // Hitung rata-rata nilai V
  const totalVValue = vVectorData.reduce((sum, v) => sum + v.vValue, 0);
  const averageV =
    vVectorData.length > 0 ? totalVValue / vVectorData.length : 0;

  const rankedCandidates = rankCandidates(vVectorData);
  // Gunakan averageV sebagai qualityThreshold
  const qualityDecisions = determineQuality(rankedCandidates, averageV);

  return (
    <Section title="Detail Perhitungan Weighted Product" id="wp-detail">
      {wp ? (
        <>
          <h4 className="text-lg font-semibold mb-4">Kode: {wp.kode}</h4>

          {/* Kriteria & Bobot */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">
              Tabel Kriteria dan Bobot
            </h3>
            <MyTable
              headers={["Kode", "Nama Kriteria", "Bobot", "Jenis"]}
              data={criteria.map((c) => [c.code, c.name, c.weight, c.type])}
            />
          </div>

          {/* Penilaian Kriteria */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">
              Tabel Penilaian Kriteria
            </h3>
            <MyTable
              headers={["Kode Kriteria", "Nilai Penilaian", "Skor"]}
              data={criteria.flatMap((c) =>
                c.assessments.map((a) => [c.code, a.value, a.score])
              )}
            />
          </div>

          {/* Data Bibit Ikan Lele */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">
              Tabel Data Bibit Ikan Lele
            </h3>
            <MyTable
              headers={["Kode Ikan", ...criteria.map((c) => c.name)]}
              data={fishCandidates.map((fc) => [
                fc.code,
                ...criteria.map((c) => {
                  const assessment = fc.assessments.find(
                    (a) => a.criteriaCode === c.code
                  );
                  return assessment ? assessment.value : "-";
                }),
              ])}
            />
          </div>

          {/* Konversi Penilaian ke Angka */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">
              Tabel Konversi Penilaian ke Angka
            </h3>
            <MyTable
              headers={["Kode Ikan", ...criteria.map((c) => c.code)]}
              data={scoredCandidates.map((sc) => [
                sc.code,
                ...criteria.map((c) => {
                  const score = sc.scores.find(
                    (s) => s.criteriaCode === c.code
                  );
                  return score ? score.score : "-";
                }),
              ])}
            />
          </div>

          {/* Perbaikan Bobot (Normalisasi) */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">
              Tabel Bobot Kriteria Ternormalisasi
            </h3>
            <MyTable
              headers={["Kode Kriteria", "Bobot Ternormalisasi", "Jenis"]}
              data={normalizedWeights.map((nw) => [
                nw.code,
                nw.normalizedWeight.toFixed(3),
                nw.type,
              ])}
            />
          </div>

          {/* Perhitungan Vektor S */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">
              Tabel Perhitungan Vektor S
            </h3>
            <MyTable
              headers={["Kode Ikan", "Nilai S"]}
              data={sVectorData.map((s) => [s.code, s.sValue.toFixed(3)])}
            />
          </div>

          {/* Perhitungan Vektor V */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">
              Tabel Perhitungan Vektor V
            </h3>
            <MyTable
              headers={["Kode Ikan", "Nilai V"]}
              data={vVectorData.map((v) => [v.code, v.vValue.toFixed(3)])}
            />
          </div>

          {/* Tabel Perankingan */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Tabel Perankingan</h3>
            <MyTable
              headers={["Kode Ikan", "Nilai", "Rangking"]}
              data={rankedCandidates.map((rc) => [
                rc.code,
                rc.value.toFixed(3),
                rc.rank,
              ])}
            />
          </div>

          {/* Hasil Keputusan Kualitas Bibit */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">
              Tabel Hasil Keputusan Kualitas Bibit
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              Ambang Batas Kualitas (Rata-rata Nilai V):{" "}
              <strong>{averageV.toFixed(3)}</strong>
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Ketentuan: {`>= ${averageV.toFixed(3)} `}Berkualitas,{" "}
              {`< ${averageV.toFixed(3)} `}Tidak Berkualitas.
            </p>
            <MyTable
              headers={["Kode Ikan", "Nilai", "Keputusan"]}
              data={qualityDecisions.map((qd) => [
                qd.code,
                qd.value.toFixed(3),
                qd.decision,
              ])}
            />
          </div>

          <Button
            variant={"destructive"}
            onClick={() => setWp(undefined)}
            className="w-full"
          >
            Clear Detail
          </Button>
        </>
      ) : (
        <div>- Kosong -</div>
      )}
    </Section>
  );
}
