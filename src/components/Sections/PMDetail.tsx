import {
  bobotGap,
  getKriteria,
  getSubjects,
  getSubKriteria,
  hitungCF_SF,
  hitungGap,
  hitungNilaiTotalAspek,
  hitungRanking,
} from "@/utils/profile-matching";
import Section from "../Section";
import { type ProfileMatchingData } from "@/services/profile-matching";
import { Button } from "../ui/button";
import type { SetStateAction } from "react";
import MyTable from "../MyTable";

interface PMDetailProps {
  pm: ProfileMatchingData | undefined;
  setPm: React.Dispatch<SetStateAction<ProfileMatchingData | undefined>>;
}

export default function PMDetail({ pm, setPm }: PMDetailProps) {
  if (!pm) {
    return (
      <Section title="Detail Perhitungan PM">
        <p className="text-sm text-muted-foreground">
          Belum ada PM yang dipilih.
        </p>
      </Section>
    );
  }

  const kriteria = getKriteria(pm);
  const subKriteria = getSubKriteria(pm);
  const subject = getSubjects(pm);
  const subKriteriaList = Array.from(
    new Set(subject.flatMap((s) => s.nilai.map((n) => n["sub-kriteria"])))
  );
  const gapResults = hitungGap(pm);
  const cfSfData = hitungCF_SF(pm, gapResults);
  const nta = hitungNilaiTotalAspek(pm, cfSfData);
  const rankingData = hitungRanking(pm, nta);

  return (
    <Section title="Detail Perhitungan PM">
      {pm ? (
        <>
          <h4 className="text-lg font-semibold mb-4">Kode: {pm.kode}</h4>

          {/* Kriteria */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">
              Tabel Bobot Nilai Kriteria
            </h3>
            <MyTable
              headers={["Nama", "Bobot"]}
              data={kriteria.map((k) => [k.nama, `${k.bobot}%`])}
            />
          </div>

          {/* Sub-kriteria */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Tabel Sub-kriteria</h3>
            <MyTable
              headers={["Nama", "Kriteria", "Jenis", "Harapan Nilai"]}
              data={subKriteria.map((k) => [
                k.kriteria,
                k.nama,
                `${k.jenis} (${
                  k.jenis === "CORE FACTOR"
                    ? pm!.preference.cf
                    : pm!.preference.sf
                }%)`,
                k.harapan_nilai,
              ])}
            />
          </div>

          {/* Subjek */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Tabel Subjek</h3>
            <MyTable
              headers={["Nama", ...subKriteriaList]}
              data={subject.map((s) => [
                s.nama,
                ...s.nilai.map((e) => e.nilai),
              ])}
            />
          </div>

          {/* GAP */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Tabel Perhitungan Gap</h3>
            <MyTable
              headers={["Nama", ...subKriteriaList]}
              data={gapResults.map((s) => [
                s.nama,
                ...subKriteriaList.map((sk) => {
                  const found = s.gap.find((g) => g.subKriteria === sk);
                  return found?.gap ?? "-";
                }),
              ])}
            />
          </div>

          {/* Pembobotan GAP */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">
              Tabel Pembobotan Nilai Gap
            </h3>
            <MyTable
              headers={["Nama", ...subKriteriaList]}
              data={gapResults.map((s) => [
                s.nama,
                ...subKriteriaList.map((sk) => {
                  const found = s.gap.find((g) => g.subKriteria === sk);
                  return bobotGap(found?.gap) ?? "-";
                }),
              ])}
            />
          </div>

          {/* Perhitungan CF dan SF */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">
              Tabel Nilai CF & SF per Kriteria
            </h3>
            <MyTable
              headers={[
                "Nama",
                ...pm.kriteria.flatMap((k) => [
                  `${k.nama} (CF)`,
                  `${k.nama} (SF)`,
                ]),
              ]}
              data={cfSfData.map(({ nama, kriteria }) => [
                nama,
                ...kriteria.flatMap(([_, cf, sf]) => [
                  cf.toFixed(2),
                  sf.toFixed(2),
                ]),
              ])}
            />
          </div>

          {/* Perhitungan nilai total aspek */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">
              Tabel Nilai Total Aspek
            </h3>
            <MyTable
              headers={["Nama", ...pm.kriteria.map((k) => k.nama)]}
              data={nta.map((nt) => [
                nt.nama,
                ...pm.kriteria.map((k) => {
                  // cari nilai NTA untuk kriteria ini
                  const found = nt.nilai_total_aspek.find(
                    (n) => n.kriteria === k.nama
                  );
                  return found ? found.nta.toFixed(2) : "-";
                }),
              ])}
            />
          </div>

          {/* Tabel Ranking */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Tabel Perankingan</h3>
            <MyTable
              headers={["Nama", "Nilai Akhir", "Ranking"]}
              data={rankingData}
            />
          </div>

          <Button
            variant={"destructive"}
            onClick={() => setPm(undefined)}
            className="w-full"
          >
            Clear
          </Button>
        </>
      ) : (
        <div>- Kosong -</div>
      )}
    </Section>
  );
}
