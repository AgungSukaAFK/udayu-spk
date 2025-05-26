import { cn } from "@/lib/utils";
import {
  PMServices,
  type ProfileMatchingData,
} from "@/services/profile-matching";
import { validateProfileMatchingData } from "@/Validations/profile-matching";
import { Minus, Plus, Trash2 } from "lucide-react";
import React, {
  useEffect,
  useState,
  type FormEvent,
  type SetStateAction,
} from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Section from "../Section";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useNavigate } from "react-router-dom";

export default function PMCreate({ className = "" }: { className?: string }) {
  const navigate = useNavigate();
  const [pm, setPM] = useState<Partial<ProfileMatchingData | undefined>>();

  const [namaKriteria, setNamaKriteria] = React.useState<string>("");
  const [bobotKriteria, setBobotKriteria] = React.useState<number>(1);

  const [namaSub, setNamaSub] = React.useState<string>("");
  const [kriteriaSub, setKriteriaSub] = React.useState<string>("");
  const [harapanSub, setHarapanSub] = React.useState<number>(1);
  const [jenisSub, setJenisSub] = React.useState<string>("");

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  function autoInputPM() {
    setPM({
      kode: "Jurnal PM",
      kriteria: [
        { nama: "Akademik", bobot: 40 },
        { nama: "Non Akademik", bobot: 28 },
        { nama: "Sikap dan Perilaku", bobot: 32 },
      ],
      preference: {
        cf: 60,
        sf: 40,
      },
      "sub-kriteria": [
        {
          nama: "IPK",
          kriteria: "Akademik",
          jenis: "CORE FACTOR",
          harapan_nilai: 5,
        },
        {
          nama: "Visi & Misi",
          kriteria: "Akademik",
          jenis: "CORE FACTOR",
          harapan_nilai: 5,
        },
        {
          nama: "Semester",
          kriteria: "Akademik",
          jenis: "SECONDARY FACTOR",
          harapan_nilai: 5,
        },
        {
          nama: "Prestasi",
          kriteria: "Akademik",
          jenis: "CORE FACTOR",
          harapan_nilai: 3,
        },
        {
          nama: "Rekomendasi",
          kriteria: "Non Akademik",
          jenis: "CORE FACTOR",
          harapan_nilai: 5,
        },
        {
          nama: "Usia",
          kriteria: "Non Akademik",
          jenis: "SECONDARY FACTOR",
          harapan_nilai: 5,
        },
        {
          nama: "Keikutsertaan dalam organisasi non kampus",
          kriteria: "Non Akademik",
          jenis: "CORE FACTOR",
          harapan_nilai: 5,
        },
        {
          nama: "Prestasi Non Akademik",
          kriteria: "Non Akademik",
          jenis: "SECONDARY FACTOR",
          harapan_nilai: 3,
        },
        {
          nama: "Kepemimpinan",
          kriteria: "Sikap dan Perilaku",
          jenis: "CORE FACTOR",
          harapan_nilai: 4,
        },
        {
          nama: "Disiplin",
          kriteria: "Sikap dan Perilaku",
          jenis: "SECONDARY FACTOR",
          harapan_nilai: 4,
        },
        {
          nama: "Loyalitas",
          kriteria: "Sikap dan Perilaku",
          jenis: "SECONDARY FACTOR",
          harapan_nilai: 4,
        },
        {
          nama: "Kerjasama",
          kriteria: "Sikap dan Perilaku",
          jenis: "CORE FACTOR",
          harapan_nilai: 4,
        },
      ],
      subject: [
        {
          nama: "M1",
          nilai: [
            { "sub-kriteria": "IPK", nilai: 4 },
            { "sub-kriteria": "Visi & Misi", nilai: 5 },
            { "sub-kriteria": "Semester", nilai: 1 },
            { "sub-kriteria": "Prestasi", nilai: 5 },
            { "sub-kriteria": "Rekomendasi", nilai: 5 },
            { "sub-kriteria": "Usia", nilai: 5 },
            {
              "sub-kriteria": "Keikutsertaan dalam organisasi non kampus",
              nilai: 1,
            },
            { "sub-kriteria": "Prestasi Non Akademik", nilai: 1 },
            { "sub-kriteria": "Kepemimpinan", nilai: 4 },
            { "sub-kriteria": "Disiplin", nilai: 4 },
            { "sub-kriteria": "Loyalitas", nilai: 3 },
            { "sub-kriteria": "Kerjasama", nilai: 4 },
          ],
        },
        {
          nama: "M2",
          nilai: [
            { "sub-kriteria": "IPK", nilai: 4 },
            { "sub-kriteria": "Visi & Misi", nilai: 3 },
            { "sub-kriteria": "Semester", nilai: 1 },
            { "sub-kriteria": "Prestasi", nilai: 5 },
            { "sub-kriteria": "Rekomendasi", nilai: 5 },
            { "sub-kriteria": "Usia", nilai: 5 },
            {
              "sub-kriteria": "Keikutsertaan dalam organisasi non kampus",
              nilai: 3,
            },
            { "sub-kriteria": "Prestasi Non Akademik", nilai: 1 },
            { "sub-kriteria": "Kepemimpinan", nilai: 4 },
            { "sub-kriteria": "Disiplin", nilai: 4 },
            { "sub-kriteria": "Loyalitas", nilai: 4 },
            { "sub-kriteria": "Kerjasama", nilai: 5 },
          ],
        },
        {
          nama: "M3",
          nilai: [
            { "sub-kriteria": "IPK", nilai: 5 },
            { "sub-kriteria": "Visi & Misi", nilai: 4 },
            { "sub-kriteria": "Semester", nilai: 3 },
            { "sub-kriteria": "Prestasi", nilai: 5 },
            { "sub-kriteria": "Rekomendasi", nilai: 5 },
            { "sub-kriteria": "Usia", nilai: 3 },
            {
              "sub-kriteria": "Keikutsertaan dalam organisasi non kampus",
              nilai: 1,
            },
            { "sub-kriteria": "Prestasi Non Akademik", nilai: 1 },
            { "sub-kriteria": "Kepemimpinan", nilai: 5 },
            { "sub-kriteria": "Disiplin", nilai: 3 },
            { "sub-kriteria": "Loyalitas", nilai: 4 },
            { "sub-kriteria": "Kerjasama", nilai: 4 },
          ],
        },
        {
          nama: "M4",
          nilai: [
            { "sub-kriteria": "IPK", nilai: 4 },
            { "sub-kriteria": "Visi & Misi", nilai: 4 },
            { "sub-kriteria": "Semester", nilai: 2 },
            { "sub-kriteria": "Prestasi", nilai: 5 },
            { "sub-kriteria": "Rekomendasi", nilai: 5 },
            { "sub-kriteria": "Usia", nilai: 5 },
            {
              "sub-kriteria": "Keikutsertaan dalam organisasi non kampus",
              nilai: 1,
            },
            { "sub-kriteria": "Prestasi Non Akademik", nilai: 1 },
            { "sub-kriteria": "Kepemimpinan", nilai: 5 },
            { "sub-kriteria": "Disiplin", nilai: 4 },
            { "sub-kriteria": "Loyalitas", nilai: 5 },
            { "sub-kriteria": "Kerjasama", nilai: 4 },
          ],
        },
        {
          nama: "M5",
          nilai: [
            { "sub-kriteria": "IPK", nilai: 5 },
            { "sub-kriteria": "Visi & Misi", nilai: 5 },
            { "sub-kriteria": "Semester", nilai: 1 },
            { "sub-kriteria": "Prestasi", nilai: 5 },
            { "sub-kriteria": "Rekomendasi", nilai: 5 },
            { "sub-kriteria": "Usia", nilai: 3 },
            {
              "sub-kriteria": "Keikutsertaan dalam organisasi non kampus",
              nilai: 1,
            },
            { "sub-kriteria": "Prestasi Non Akademik", nilai: 1 },
            { "sub-kriteria": "Kepemimpinan", nilai: 4 },
            { "sub-kriteria": "Disiplin", nilai: 3 },
            { "sub-kriteria": "Loyalitas", nilai: 4 },
            { "sub-kriteria": "Kerjasama", nilai: 5 },
          ],
        },
        {
          nama: "M6",
          nilai: [
            { "sub-kriteria": "IPK", nilai: 4 },
            { "sub-kriteria": "Visi & Misi", nilai: 3 },
            { "sub-kriteria": "Semester", nilai: 1 },
            { "sub-kriteria": "Prestasi", nilai: 5 },
            { "sub-kriteria": "Rekomendasi", nilai: 5 },
            { "sub-kriteria": "Usia", nilai: 5 },
            {
              "sub-kriteria": "Keikutsertaan dalam organisasi non kampus",
              nilai: 5,
            },
            { "sub-kriteria": "Prestasi Non Akademik", nilai: 1 },
            { "sub-kriteria": "Kepemimpinan", nilai: 5 },
            { "sub-kriteria": "Disiplin", nilai: 5 },
            { "sub-kriteria": "Loyalitas", nilai: 3 },
            { "sub-kriteria": "Kerjasama", nilai: 4 },
          ],
        },
      ],
    });
  }

  useEffect(() => {
    console.log(pm);
  }, [pm]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!pm?.preference?.cf) {
      setPM((p) => ({
        ...p,
        preference: {
          cf: 60,
          sf: p?.preference?.sf || 40,
        },
      }));
    }

    if (!pm?.preference?.sf) {
      setPM((p) => ({
        ...p,
        preference: {
          cf: p?.preference?.cf || 60,
          sf: 40,
        },
      }));
    }

    const validatePM = validateProfileMatchingData(pm);
    if (!validatePM.valid) {
      toast.error(
        <ul className="px-4 flex flex-col gap-2 list-disc">
          {validatePM.errors.map((e) => (
            <li>{e}</li>
          ))}
        </ul>
      );
    } else {
      const res = await PMServices.createPM(pm as ProfileMatchingData);
      if (res.success) {
        toast.success("Perhitungan PM baru berhasil dibuat!");
        navigate(0);
      } else {
        toast.error(res.message);
      }
    }
  }

  function addKriteria() {
    const kriteriaNew = pm?.kriteria || [];
    const find = kriteriaNew.findIndex((e) => e.nama === namaKriteria);
    if (find > -1 && namaKriteria && bobotKriteria) {
      kriteriaNew[find] = {
        nama: namaKriteria,
        bobot: Number(bobotKriteria),
      };
      setPM((p) => ({
        ...p,
        kriteria: kriteriaNew,
      }));
    } else if (namaKriteria && bobotKriteria) {
      kriteriaNew.push({
        nama: namaKriteria,
        bobot: Number(bobotKriteria),
      });
      setPM((p) => ({
        ...p,
        kriteria: kriteriaNew,
      }));
    }
  }

  function removeKriteria(nama: string) {
    const kriteriaOld = pm?.kriteria || [];
    const kriteriaNew = kriteriaOld.filter((e) => e.nama !== nama);
    setPM((p) => ({
      ...p,
      kriteria: kriteriaNew,
    }));
  }

  function addSubKriteria() {
    const subKriteriaNew = pm?.["sub-kriteria"] || [];
    const find = subKriteriaNew.findIndex((e) => e.nama === namaKriteria);
    if (find > -1 && namaSub && harapanSub && jenisSub && kriteriaSub) {
      subKriteriaNew[find] = {
        harapan_nilai: harapanSub,
        jenis: jenisSub,
        kriteria: kriteriaSub,
        nama: namaSub,
      };
      setPM((p) => ({
        ...p,
        "sub-kriteria": subKriteriaNew,
      }));
    } else if (namaKriteria && bobotKriteria) {
      subKriteriaNew.push({
        harapan_nilai: harapanSub,
        jenis: jenisSub,
        kriteria: kriteriaSub,
        nama: namaSub,
      });
      setPM((p) => ({
        ...p,
        "sub-kriteria": subKriteriaNew,
      }));
    }
  }

  function removeSubKriteria(nama: string) {
    const subKriteriaOld = pm?.["sub-kriteria"] || [];
    const subKriteriaNew = subKriteriaOld.filter((e) => e.nama !== nama);
    setPM((p) => ({
      ...p,
      "sub-kriteria": subKriteriaNew,
    }));
  }

  type NilaiType = { "sub-kriteria": string; nilai: number };

  function addSubject(nama: string, nilai: NilaiType[]) {
    const copySubject = [...(pm?.subject || [])];
    const find = copySubject.findIndex((e) => e.nama === nama);

    if (find > -1) {
      copySubject[find] = { nama, nilai };
    } else {
      copySubject.push({ nama, nilai });
    }

    setPM((p) => ({
      ...p,
      subject: copySubject,
    }));
  }

  function handleCreateSubject(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const nama = form.get("nama-subjek")?.toString().trim();
    if (!nama) return alert("Nama subjek harus diisi");

    const nilai: NilaiType[] =
      pm?.["sub-kriteria"]?.map((item) => {
        const raw = form.get(item.nama)?.toString();
        const parsed = Number(raw);
        if (!raw || isNaN(parsed) || parsed < 1 || parsed > 5)
          throw new Error(`Nilai untuk "${item.nama}" harus antara 1–5`);
        return { "sub-kriteria": item.nama, nilai: parsed };
      }) || [];

    addSubject(nama, nilai);
    setOpenDialog(false);
    const formElement = e.target as HTMLFormElement;
    formElement.reset();
  }

  function removeSubject(nama: string) {
    const subjectOld = pm?.subject || [];
    const subjectNew = subjectOld.filter((e) => e.nama !== nama);
    setPM((p) => ({
      ...p,
      subject: subjectNew,
    }));
  }

  return (
    <Section title="Buat Perhitungan PM Baru">
      <div id="create" className="flex flex-col gap-4">
        <Button variant={"secondary"} onClick={autoInputPM}>
          Auto Input Berdasarkan Data Jurnal
        </Button>
        <form
          id="form_create"
          onSubmit={handleSubmit}
          className={cn("grid items-start gap-4 overflow-auto", className)}
        >
          {/* Kode */}
          <div className="grid gap-2">
            <Label htmlFor="kode">Kode PM*</Label>
            <Input
              type="text"
              id="kode"
              required
              defaultValue={pm?.kode || ""}
              onChange={(e) => setPM((p) => ({ ...p, kode: e.target.value }))}
            />
          </div>

          {/* Preferensi - CF */}
          <div className="grid gap-2">
            <Label htmlFor="kode">Persentase Core Factor (%)*</Label>
            <Input
              type="text"
              inputMode="numeric"
              id="kode"
              defaultValue={pm?.preference?.cf}
              min={0}
              max={100}
              placeholder="Default 60%"
              onChange={(e) =>
                setPM((p) => ({
                  ...p,
                  preference: {
                    cf: Number(e.target.value),
                    sf: p?.preference?.sf || 40,
                  },
                }))
              }
            />
          </div>

          {/* Preferensi - CF */}
          <div className="grid gap-2">
            <Label htmlFor="kode">
              Persentase Secondary Factor (%)* <em></em>
            </Label>
            <Input
              type="text"
              inputMode="numeric"
              id="kode"
              defaultValue={pm?.preference?.sf}
              min={0}
              max={100}
              placeholder="Default 40%"
              onChange={(e) =>
                setPM((p) => ({
                  ...p,
                  preference: {
                    sf: Number(e.target.value),
                    cf: p?.preference?.cf || 60,
                  },
                }))
              }
            />
          </div>

          {/* Kriteria */}
          <div className="grid gap-2">
            <Label htmlFor="kriteria">Kriteria</Label>
            <div className="w-full">
              <table className="min-w-full border border-border">
                <thead>
                  <tr className="bg-secondary">
                    <th className="px-4 py-2 text-left text-muted-foreground border-b border-r border-border">
                      Nama
                    </th>
                    <th className="px-4 py-2 text-left text-muted-foreground border-b border-r border-border">
                      Bobot (%)
                    </th>
                    <th className="px-4 py-2 text-center text-muted-foreground border-b border-border">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pm?.kriteria?.map((e, index) => (
                    <tr key={index} className="border-b border-border">
                      <td className="px-4 py-2 text-muted-foreground border-r border-border">
                        {e.nama}
                      </td>
                      <td className="px-4 py-2 text-muted-foreground border-r border-border">
                        {e.bobot}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <Button
                          type="button"
                          size={"sm"}
                          onClick={() => removeKriteria(e.nama)}
                        >
                          <Trash2 />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {/* Row for Total Bobot */}
                  <tr className="bg-accent/50">
                    <td className="px-4 py-2 font-semibold text-right border-r border-border">
                      Total Bobot
                    </td>
                    <td className="px-4 py-2 font-semibold border-r border-border">
                      {pm?.kriteria?.reduce(
                        (sum, kriteria) => sum + kriteria.bobot,
                        0
                      )}
                      %
                    </td>
                    <td></td> {/* Empty cell for the "Aksi" column */}
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-red-600 mt-2">
              <strong>Penting</strong>: Pastikan total bobot semua kriteria
              berjumlah
              <strong>100%</strong> untuk perhitungan yang akurat.
            </p>

            {/* Tambah kriteria */}
            <div className="grid grid-cols-8 w-full gap-2 mt-4">
              <Input
                type="text"
                placeholder="Nama Kriteria"
                className="col-span-4"
                defaultValue={namaKriteria}
                onChange={(e) => setNamaKriteria(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Bobot"
                className="col-span-2"
                min={1}
                max={100}
                defaultValue={bobotKriteria}
                onChange={(e) => setBobotKriteria(Number(e.target.value))}
              />
              <Button
                type="button"
                size={"sm"}
                className="col-span-2"
                onClick={addKriteria}
              >
                <Plus />
              </Button>
            </div>
          </div>

          {/* Sub Kriteria */}
          <div className="grid gap-2">
            <Label htmlFor="sub-kriteria">Sub-kriteria</Label>
            <div className="w-full">
              <table className="min-w-full border border-border">
                <thead>
                  <tr className="bg-secondary">
                    <th className="px-4 py-2 text-left text-muted-foreground border-b border-r border-border">
                      Kriteria
                    </th>
                    <th className="px-4 py-2 text-left text-muted-foreground border-b border-r border-border">
                      Nama
                    </th>
                    <th className="px-4 py-2 text-left text-muted-foreground border-b border-r border-border">
                      Harapan
                    </th>
                    <th className="px-4 py-2 text-center text-muted-foreground border-b border-border">
                      Jenis
                    </th>
                    <th className="px-4 py-2 text-center text-muted-foreground border-b border-border">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pm?.["sub-kriteria"]?.map((e, index) => (
                    <tr key={index} className="border-b border-border">
                      <td className="px-4 py-2 text-muted-foreground border-r border-border">
                        {e.kriteria}
                      </td>
                      <td className="px-4 py-2 text-muted-foreground border-r border-border">
                        {e.nama}
                      </td>
                      <td className="px-4 py-2 text-muted-foreground border-r border-border">
                        {e.harapan_nilai}
                      </td>
                      <td className="px-4 py-2 text-center text-muted-foreground border-r border-border">
                        {e.jenis}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <Button
                          type="button"
                          size={"sm"}
                          onClick={() => removeSubKriteria(e.nama)}
                        >
                          <Trash2 />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tambah sub kriteria */}
            <div className="grid grid-cols-12 w-full gap-2 mt-4">
              {/* Kriteria */}
              <div className="col-span-3">
                <Select onValueChange={(ek) => setKriteriaSub(ek)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Kriteria" />
                  </SelectTrigger>
                  <SelectContent>
                    {pm?.kriteria?.map((e, i) => (
                      <SelectItem key={i} value={e.nama}>
                        {e.nama}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Nama */}
              <Input
                type="text"
                placeholder="Nama Kriteria"
                className="col-span-3"
                onChange={(e) => setNamaSub(e.target.value)}
              />
              {/* harapan */}
              <Input
                type="number"
                placeholder="Harapan"
                className="col-span-2"
                min={1}
                max={5}
                maxLength={5}
                onChange={(e) => setHarapanSub(Number(e.target.value))}
              />
              {/* Jenis */}
              <div className="w-full col-span-3">
                <Select onValueChange={(e) => setJenisSub(e)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Jenis" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CORE FACTOR">CF</SelectItem>
                    <SelectItem value="SECONDARY FACTOR">SF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="button"
                size={"sm"}
                className="col-span-1"
                onClick={addSubKriteria}
              >
                <Plus />
              </Button>
            </div>
          </div>

          {/* Subjek */}
          <div className="grid gap-2">
            <Label htmlFor="subjek">Subjek</Label>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="border border-border w-[20px]"
                    rowSpan={2}
                  >
                    No
                  </TableHead>
                  <TableHead className="border border-border" rowSpan={2}>
                    Nama Subjek
                  </TableHead>
                  <TableHead
                    className="border border-border text-center"
                    colSpan={pm?.["sub-kriteria"]?.length}
                  >
                    Nilai
                  </TableHead>
                  <TableHead className="border border-border" rowSpan={2}>
                    Aksi
                  </TableHead>
                </TableRow>
                <TableRow>
                  {pm?.["sub-kriteria"]?.map((e, index) => {
                    return (
                      <TableHead key={index} className="border border-border">
                        {e.nama}
                      </TableHead>
                    );
                  })}
                </TableRow>
              </TableHeader>
              <TableBody>
                {pm?.subject?.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="border border-border">
                        {index + 1}
                      </TableCell>
                      <TableCell className="border border-border">
                        {item.nama}
                      </TableCell>
                      {item.nilai.map((e, i) => {
                        return (
                          <TableCell className="border border-border" key={i}>
                            {e.nilai}
                          </TableCell>
                        );
                      })}
                      <TableCell className="border border-border">
                        <Button
                          variant={"destructive"}
                          size={"icon"}
                          type="button"
                          onClick={() => removeSubject(item.nama)}
                        >
                          <Minus />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {/* Tambah subjek */}
            <Button
              onClick={() => setOpenDialog(true)}
              variant={"outline"}
              type="button"
            >
              Tambah Subjek
            </Button>
          </div>

          <Button type="submit" form="form_create">
            Submit
          </Button>
        </form>

        {/* Dialog */}
        <TambahSubjekDialog
          pm={pm}
          open={openDialog}
          setOpen={setOpenDialog}
          onSubmit={handleCreateSubject}
        />
      </div>
    </Section>
  );
}

function TambahSubjekDialog({
  open,
  setOpen,
  pm,
  onSubmit,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  pm: Partial<ProfileMatchingData | undefined>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[85vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Tambah Subjek Baru</DialogTitle>
          <DialogDescription>
            Masukkan data untuk menambahkan subjek baru.
          </DialogDescription>
        </DialogHeader>
        <form id="form_subject" onSubmit={onSubmit} className="grid gap-2">
          <div className="grid gap-2">
            <Label>Nama Subjek</Label>
            <Input type="text" required name="nama-subjek" />
          </div>
          <Label>Penilaian untuk setiap sub kriteria (1 - 5)</Label>
          {pm?.["sub-kriteria"]?.map((item, index) => (
            <div key={index} className="grid gap-2">
              <Label>{item.nama}</Label>
              <Input type="number" required name={item.nama} min={1} max={5} />
            </div>
          ))}
          <DialogFooter>
            <DialogClose>Batal</DialogClose>
            <Button type="submit" form="form_subject">
              Buat
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
