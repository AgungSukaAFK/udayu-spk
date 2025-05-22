import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  geneticAlgorithm,
  type Lokasi,
  type Mahasiswa,
} from "@/utils/genetics-algorithm";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Section from "../Section";
import { toast } from "sonner";

export default function GA() {
  const [mahasiswaList, setMahasiswaList] = useState<Mahasiswa[]>([]);
  const [lokasiList, setLokasiList] = useState<Lokasi[]>([]);
  const [hasil, setHasil] = useState<{ nama: string; lokasi: string }[] | null>(
    null
  );
  const [namaMhs, setNamaMhs] = useState("");
  const [jurusanMhs, setJurusanMhs] = useState("");
  const [namaLokasi, setNamaLokasi] = useState("");
  const [jurusanDiterima, setJurusanDiterima] = useState("");
  const [kapasitas, setKapasitas] = useState("");
  const [fitnessValue, setFitnessValue] = useState<number | null>(null);

  const tambahMahasiswa = () => {
    try {
      if (!namaMhs || !jurusanMhs) {
        toast.error("Nama dan jurusan mahasiswa harus diisi.");
        return;
      }
      setMahasiswaList([
        ...mahasiswaList,
        { nama: namaMhs, jurusan: jurusanMhs },
      ]);
      setNamaMhs("");
      setJurusanMhs("");
    } catch (error) {
      toast.error("Gagal menambahkan mahasiswa.");
      console.error(error);
    }
  };

  const hapusMahasiswa = (index: number) => {
    setMahasiswaList(mahasiswaList.filter((_, i) => i !== index));
  };

  const tambahLokasi = () => {
    try {
      if (!namaLokasi || !jurusanDiterima || !kapasitas) {
        toast.error("Semua field lokasi harus diisi.");
        return;
      }
      const kapasitasInt = parseInt(kapasitas);
      if (isNaN(kapasitasInt) || kapasitasInt <= 0) {
        toast.error("Kapasitas harus berupa angka positif.");
        return;
      }
      const jurusanArray = jurusanDiterima.split(",").map((j) => j.trim());
      const newId =
        lokasiList.length > 0
          ? Math.max(...lokasiList.map((l) => l.id)) + 1
          : 1;
      setLokasiList([
        ...lokasiList,
        {
          id: newId,
          nama: namaLokasi,
          jurusanDiterima: jurusanArray,
          kapasitas: kapasitasInt,
        },
      ]);
      setNamaLokasi("");
      setJurusanDiterima("");
      setKapasitas("");
    } catch (error) {
      toast.error("Gagal menambahkan lokasi.");
      console.error(error);
    }
  };

  const hapusLokasi = (id: number) => {
    setLokasiList(lokasiList.filter((l) => l.id !== id));
  };

  const prosesGenetika = () => {
    try {
      if (!validasiKapasitas()) return;

      const { chrom: solusi, fitness } = geneticAlgorithm(
        mahasiswaList,
        lokasiList
      );

      const hasilPenempatan = mahasiswaList.map((mhs, idx) => {
        const lokasi = lokasiList.find((l) => l.id === solusi[idx]);
        return { nama: mhs.nama, lokasi: lokasi?.nama ?? "Tidak ditemukan" };
      });

      setHasil(hasilPenempatan);
      setFitnessValue(fitness);
    } catch (error) {
      toast.error("Gagal memproses algoritma genetika.");
      console.error(error);
      setHasil(null);
    }
  };

  const autoIsiDummy = () => {
    const dummyMahasiswa: Mahasiswa[] = [
      { nama: "Budi Santoso", jurusan: "Informatika" },
      { nama: "Siti Aminah", jurusan: "Sistem Informasi" },
      { nama: "Rudi Hartono", jurusan: "Informatika" },
      { nama: "Ayu Lestari", jurusan: "Manajemen" },
      { nama: "Dewi Sartika", jurusan: "Manajemen" },
      { nama: "Andi Wijaya", jurusan: "Sistem Informasi" },
      { nama: "Rina Agustin", jurusan: "Teknik Sipil" },
      { nama: "Bayu Pratama", jurusan: "Teknik Sipil" },
      { nama: "Nina Putri", jurusan: "Teknik Elektro" },
      { nama: "Fajar Nugroho", jurusan: "Teknik Elektro" },
    ];

    const dummyLokasi: Lokasi[] = [
      {
        id: 1,
        nama: "PT Teknologi Nusantara",
        jurusanDiterima: ["Informatika"],
        kapasitas: 2,
      },
      {
        id: 2,
        nama: "Bank Nasional",
        jurusanDiterima: ["Manajemen"],
        kapasitas: 2,
      },
      {
        id: 3,
        nama: "CV Konstruksi Jaya",
        jurusanDiterima: ["Teknik Sipil"],
        kapasitas: 2,
      },
      {
        id: 4,
        nama: "Pabrik Elektronik",
        jurusanDiterima: ["Teknik Elektro"],
        kapasitas: 2,
      },
      {
        id: 5,
        nama: "Startup Kreatif",
        jurusanDiterima: ["Sistem Informasi"],
        kapasitas: 2,
      },
    ];

    setMahasiswaList(dummyMahasiswa);
    setLokasiList(dummyLokasi);
    setHasil(null);
  };

  // Validasi Input
  const isValidMahasiswa = namaMhs.trim() !== "" && jurusanMhs.trim() !== "";
  const isValidLokasi =
    namaLokasi.trim() !== "" &&
    jurusanDiterima.trim() !== "" &&
    kapasitas.trim() !== "" &&
    !isNaN(Number(kapasitas)) &&
    Number(kapasitas) > 0;

  const validasiKapasitas = (): boolean => {
    // Hitung jumlah mahasiswa per jurusan
    const countMhsPerJurusan: Record<string, number> = {};
    mahasiswaList.forEach(({ jurusan }) => {
      countMhsPerJurusan[jurusan] = (countMhsPerJurusan[jurusan] || 0) + 1;
    });

    // Hitung total kapasitas lokasi per jurusan
    const kapasitasPerJurusan: Record<string, number> = {};
    lokasiList.forEach(({ jurusanDiterima, kapasitas }) => {
      jurusanDiterima.forEach((j) => {
        kapasitasPerJurusan[j] = (kapasitasPerJurusan[j] || 0) + kapasitas;
      });
    });

    // Bandingkan jumlah mahasiswa dan kapasitas tiap jurusan
    for (const jurusan in countMhsPerJurusan) {
      if ((kapasitasPerJurusan[jurusan] || 0) < countMhsPerJurusan[jurusan]) {
        toast.error(
          `Kapasitas lokasi untuk jurusan "${jurusan}" tidak mencukupi (${
            kapasitasPerJurusan[jurusan] || 0
          } < ${countMhsPerJurusan[jurusan]})`
        );
        return false;
      }
    }
    return true;
  };

  return (
    <div className="space-y-8 p-4">
      <Section title="Rules Penempatan Mahasiswa">
        <Card>
          <CardContent>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>
                Mahasiswa hanya dapat ditempatkan ke lokasi yang menerima
                jurusannya.
              </li>
              <li>
                Kapasitas lokasi harus dipenuhi sesuai jumlah mahasiswa yang
                ditempatkan.
              </li>
              <li>Setiap mahasiswa hanya ditempatkan pada satu lokasi saja.</li>
              <li>
                Jika tidak ada lokasi yang sesuai, mahasiswa tidak mendapatkan
                penempatan.
              </li>
            </ul>
          </CardContent>
        </Card>
      </Section>

      {/* Section Mahasiswa */}
      <Section title="Data Mahasiswa">
        <Card>
          <CardContent className="space-y-2">
            <div className="flex gap-2">
              <Input
                placeholder="Nama"
                value={namaMhs}
                onChange={(e) => setNamaMhs(e.target.value)}
              />
              <Input
                placeholder="Jurusan"
                value={jurusanMhs}
                onChange={(e) => setJurusanMhs(e.target.value)}
              />
              <Button onClick={tambahMahasiswa} disabled={!isValidMahasiswa}>
                Tambah
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Jurusan</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mahasiswaList.map((m, i) => (
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{m.nama}</TableCell>
                    <TableCell>{m.jurusan}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => hapusMahasiswa(i)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Section>

      {/* Section Lokasi */}
      <Section title="Data Lokasi">
        <Card>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <Input
                placeholder="Nama Lokasi"
                value={namaLokasi}
                onChange={(e) => setNamaLokasi(e.target.value)}
              />
              <Input
                placeholder="Jurusan Diterima (pisah koma)"
                value={jurusanDiterima}
                onChange={(e) => setJurusanDiterima(e.target.value)}
              />
              <Input
                placeholder="Kapasitas"
                type="number"
                value={kapasitas}
                onChange={(e) => setKapasitas(e.target.value)}
              />
              <Button onClick={tambahLokasi} disabled={!isValidLokasi}>
                Tambah
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Nama Lokasi</TableHead>
                  <TableHead>Jurusan Diterima</TableHead>
                  <TableHead>Kapasitas</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lokasiList.map((l, i) => (
                  <TableRow key={l.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{l.nama}</TableCell>
                    <TableCell>{l.jurusanDiterima.join(", ")}</TableCell>
                    <TableCell>{l.kapasitas}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => hapusLokasi(l.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Section>

      {/* Section Hasil */}
      <Section title="Hasil Penempatan">
        <Card>
          <CardHeader className="flex items-center justify-end">
            <div className="flex gap-2 w-full">
              {fitnessValue !== null && (
                <div className="grow">
                  Nilai Fitness = {fitnessValue}/{mahasiswaList.length} (
                  {((fitnessValue / mahasiswaList.length) * 100).toFixed(0)}%)
                </div>
              )}

              <Button onClick={autoIsiDummy} variant="outline">
                Auto Isi Dummy
              </Button>
              <Button onClick={prosesGenetika}>Proses Penempatan</Button>
            </div>
          </CardHeader>
          <CardContent>
            {hasil && hasil.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Mahasiswa</TableHead>
                    <TableHead>Lokasi Penempatan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hasil.map((h, i) => (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{h.nama}</TableCell>
                      <TableCell>{h.lokasi}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground">Belum ada hasil.</p>
            )}
          </CardContent>
        </Card>
      </Section>
    </div>
  );
}
