import { cn } from "@/lib/utils";
import {
  WPServices,
  type WeightedProductData,
  type WPResponse,
} from "@/services/weighted-product";
import { validateWeightedProductData } from "@/Validations/weighted-product";
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

// WPCreate.tsx
// ... (imports remain the same)
export default function WPCreate({ className = "" }: { className?: string }) {
  const navigate = useNavigate();
  const [wp, setWP] = useState<Partial<WeightedProductData | undefined>>();

  const [criteriaCode, setCriteriaCode] = React.useState<string>("");
  const [criteriaName, setCriteriaName] = React.useState<string>("");
  const [criteriaWeight, setCriteriaWeight] = React.useState<number>(1);
  const [criteriaType, setCriteriaType] = React.useState<"Benefit" | "Cost">(
    "Benefit"
  );

  const [criteriaAssessmentValue, setCriteriaAssessmentValue] =
    React.useState<string>("");
  const [criteriaAssessmentScore, setCriteriaAssessmentScore] =
    React.useState<number>(0);
  const [selectedCriteriaForAssessment, setSelectedCriteriaForAssessment] =
    React.useState<string>("");

  const [fishCandidateCode, setFishCandidateCode] = React.useState<string>("");
  const [fishCandidateAssessments, setFishCandidateAssessments] = useState<
    { criteriaCode: string; value: string }[]
  >([]);

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  function autoInputWP() {
    setWP({
      kode: "Jurnal WP Catfish",
      criteria: [
        {
          code: "K1",
          name: "Pergerakan Ikan",
          weight: 9,
          type: "Benefit",
          assessments: [
            { value: "Sangat Lincah", score: 7 },
            { value: "Lincah", score: 5 },
            { value: "Lambat", score: 3 },
            { value: "Sangat Lambat", score: 1 },
          ],
        },
        {
          code: "K2",
          name: "Nafsu Makan Ikan",
          weight: 2,
          type: "Cost",
          assessments: [
            { value: "Sangat Baik", score: 1 },
            { value: "Baik", score: 3 },
            { value: "Kurang Baik", score: 5 },
            { value: "Sangat Buruk", score: 7 },
          ],
        },
        {
          code: "K3",
          name: "Pernapasan Ikan",
          weight: 7,
          type: "Benefit",
          assessments: [
            { value: "Sangat teratur", score: 7 },
            { value: "Teratur", score: 3 },
            { value: "Sangat Tidak Teratur", score: 1 },
          ],
        },
        {
          code: "K4",
          name: "Bentuk Tubuh Ikan",
          weight: 6,
          type: "Benefit",
          assessments: [
            { value: "Ideal", score: 7 },
            { value: "Kurang Ideal", score: 5 },
            { value: "Sangat Tidak Ideal", score: 1 },
          ],
        },
        {
          code: "K5",
          name: "Kondisi Tubuh",
          weight: 7,
          type: "Benefit",
          assessments: [
            { value: "Sangat Bagus Tanpa Lecet", score: 7 },
            { value: "Tidak Bagus, Ada Lecet", score: 1 },
          ],
        },
        {
          code: "K6",
          name: "Kondisi Kulit Ikan",
          weight: 4,
          type: "Benefit",
          assessments: [
            { value: "Sangat Bagus", score: 7 },
            { value: "Terdapat Bercak jamur", score: 1 },
          ],
        },
        {
          code: "K7",
          name: "Kondisi Mulut Ikan",
          weight: 5,
          type: "Benefit",
          assessments: [
            { value: "Sangat Bagus, Tidak Terluka", score: 7 },
            { value: "Ada Luka", score: 1 },
          ],
        },
        {
          code: "K8",
          name: "Mata Ikan",
          weight: 6,
          type: "Benefit",
          assessments: [
            { value: "Sangat Baik", score: 7 },
            { value: "Baik", score: 3 },
            { value: "Tampak Berselaput", score: 1 },
          ],
        },
        {
          code: "K9",
          name: "Kumis Ikan",
          weight: 3,
          type: "Benefit",
          assessments: [
            { value: "Lengkap 4 Pasang", score: 7 },
            { value: "Kurang 1", score: 3 },
            { value: "Kurang 1 Pasang atau lebih", score: 1 },
          ],
        },
      ],
      fishCandidates: [
        {
          code: "IK 001",
          assessments: [
            { criteriaCode: "K1", value: "Sangat Lincah" },
            { criteriaCode: "K2", value: "Baik" },
            { criteriaCode: "K3", value: "Teratur" },
            { criteriaCode: "K4", value: "Kurang Ideal" },
            { criteriaCode: "K5", value: "Sangat Bagus Tanpa Lecet" },
            { criteriaCode: "K6", value: "Sangat Bagus" },
            { criteriaCode: "K7", value: "Sangat Bagus, Tidak Terluka" },
            { criteriaCode: "K8", value: "Sangat Baik" },
            { criteriaCode: "K9", value: "Lengkap 4 Pasang" },
          ],
        },
        {
          code: "IK 002",
          assessments: [
            { criteriaCode: "K1", value: "Sangat Lincah" },
            { criteriaCode: "K2", value: "Sangat Baik" },
            { criteriaCode: "K3", value: "Teratur" },
            { criteriaCode: "K4", value: "Ideal" },
            { criteriaCode: "K5", value: "Sangat Bagus Tanpa Lecet" },
            { criteriaCode: "K6", value: "Sangat Bagus" },
            { criteriaCode: "K7", value: "Sangat Bagus, Tidak Terluka" },
            { criteriaCode: "K8", value: "Baik" },
            { criteriaCode: "K9", value: "Lengkap 4 Pasang" },
          ],
        },
        {
          code: "IK 003",
          assessments: [
            { criteriaCode: "K1", value: "Lincah" },
            { criteriaCode: "K2", value: "Baik" },
            { criteriaCode: "K3", value: "Teratur" },
            { criteriaCode: "K4", value: "Kurang Ideal" },
            { criteriaCode: "K5", value: "Sangat Bagus Tanpa Lecet" },
            { criteriaCode: "K6", value: "Sangat Bagus" },
            { criteriaCode: "K7", value: "Sangat Bagus, Tidak Terluka" },
            { criteriaCode: "K8", value: "Sangat Baik" },
            { criteriaCode: "K9", value: "Kurang 1" },
          ],
        },
        {
          code: "IK 004",
          assessments: [
            { criteriaCode: "K1", value: "Sangat Lincah" },
            { criteriaCode: "K2", value: "Sangat Baik" },
            { criteriaCode: "K3", value: "Teratur" },
            { criteriaCode: "K4", value: "Kurang Ideal" },
            { criteriaCode: "K5", value: "Sangat Bagus Tanpa Lecet" },
            { criteriaCode: "K6", value: "Sangat Bagus" },
            { criteriaCode: "K7", value: "Ada Luka" },
            { criteriaCode: "K8", value: "Sangat Baik" },
            { criteriaCode: "K9", value: "Lengkap 4 Pasang" },
          ],
        },
        {
          code: "IK 005",
          assessments: [
            { criteriaCode: "K1", value: "Sangat Lincah" },
            { criteriaCode: "K2", value: "Baik" },
            { criteriaCode: "K3", value: "Teratur" },
            { criteriaCode: "K4", value: "Ideal" },
            { criteriaCode: "K5", value: "Sangat Bagus Tanpa Lecet" },
            { criteriaCode: "K6", value: "Sangat Bagus" },
            { criteriaCode: "K7", value: "Sangat Bagus, Tidak Terluka" },
            { criteriaCode: "K8", value: "Baik" },
            { criteriaCode: "K9", value: "Lengkap 4 Pasang" },
          ],
        },
        {
          code: "IK 006",
          assessments: [
            { criteriaCode: "K1", value: "Lambat" },
            { criteriaCode: "K2", value: "Baik" },
            { criteriaCode: "K3", value: "Teratur" },
            { criteriaCode: "K4", value: "Kurang Ideal" },
            { criteriaCode: "K5", value: "Sangat Bagus Tanpa Lecet" },
            { criteriaCode: "K6", value: "Sangat Bagus" },
            { criteriaCode: "K7", value: "Sangat Bagus, Tidak Terluka" },
            { criteriaCode: "K8", value: "Sangat Baik" },
            { criteriaCode: "K9", value: "Lengkap 4 Pasang" },
          ],
        },
        {
          code: "IK 007",
          assessments: [
            { criteriaCode: "K1", value: "Sangat Lincah" },
            { criteriaCode: "K2", value: "Kurang Baik" },
            { criteriaCode: "K3", value: "Sangat Tidak Teratur" },
            { criteriaCode: "K4", value: "Kurang Ideal" },
            { criteriaCode: "K5", value: "Sangat Bagus Tanpa Lecet" },
            { criteriaCode: "K6", value: "Sangat Bagus" },
            { criteriaCode: "K7", value: "Sangat Bagus, Tidak Terluka" },
            { criteriaCode: "K8", value: "Sangat Baik" },
            { criteriaCode: "K9", value: "Lengkap 4 Pasang" },
          ],
        },
      ],
      // HAPUS BARIS INI: qualityThreshold: 1.17,
    });
  }

  useEffect(() => {
    console.log(wp);
  }, [wp]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validateWP = validateWeightedProductData(wp);
    if (!validateWP.valid) {
      toast.error(
        <ul className="px-4 flex flex-col gap-2 list-disc">
          {validateWP.errors.map((err, index) => (
            <li key={index}>{err}</li>
          ))}
        </ul>
      );
    } else {
      const res: WPResponse<null> = await WPServices.createWP(
        wp as WeightedProductData
      );
      if (res.success) {
        toast.success("Perhitungan Weighted Product baru berhasil dibuat!");
        navigate(0);
      } else {
        toast.error(res.message);
      }
    }
  }

  function addCriteria() {
    const newCriteria: WeightedProductData["criteria"] = wp?.criteria || [];
    const findIndex = newCriteria.findIndex((c) => c.code === criteriaCode);

    if (criteriaCode && criteriaName && criteriaWeight > 0) {
      if (findIndex > -1) {
        newCriteria[findIndex] = {
          ...newCriteria[findIndex],
          name: criteriaName,
          weight: Number(criteriaWeight),
          type: criteriaType,
        };
      } else {
        newCriteria.push({
          code: criteriaCode,
          name: criteriaName,
          weight: Number(criteriaWeight),
          type: criteriaType,
          assessments: [],
        });
      }
      setWP((prev) => ({
        ...prev,
        criteria: newCriteria,
      }));
      setCriteriaCode("");
      setCriteriaName("");
      setCriteriaWeight(1);
      setCriteriaType("Benefit");
    } else {
      toast.error(
        "Kode, nama, bobot, dan jenis kriteria harus diisi dengan benar."
      );
    }
  }

  function removeCriteria(code: string) {
    const updatedCriteria = (wp?.criteria || []).filter((c) => c.code !== code);
    setWP((prev) => ({
      ...prev,
      criteria: updatedCriteria,
    }));
  }

  function addCriteriaAssessment() {
    if (
      selectedCriteriaForAssessment &&
      criteriaAssessmentValue &&
      criteriaAssessmentScore >= 0
    ) {
      const updatedCriteria = (wp?.criteria || []).map((c) => {
        if (c.code === selectedCriteriaForAssessment) {
          const newAssessments = [...c.assessments];
          const assessmentIndex = newAssessments.findIndex(
            (a) => a.value === criteriaAssessmentValue
          );
          if (assessmentIndex > -1) {
            newAssessments[assessmentIndex] = {
              value: criteriaAssessmentValue,
              score: Number(criteriaAssessmentScore),
            };
          } else {
            newAssessments.push({
              value: criteriaAssessmentValue,
              score: Number(criteriaAssessmentScore),
            });
          }
          return { ...c, assessments: newAssessments };
        }
        return c;
      });
      setWP((prev) => ({ ...prev, criteria: updatedCriteria }));
      setCriteriaAssessmentValue("");
      setCriteriaAssessmentScore(0);
    } else {
      toast.error(
        "Pilih kriteria, isi nilai penilaian, dan skor dengan benar."
      );
    }
  }

  function removeCriteriaAssessment(criteriaCode: string, value: string) {
    const updatedCriteria = (wp?.criteria || []).map((c) => {
      if (c.code === criteriaCode) {
        const newAssessments = c.assessments.filter((a) => a.value !== value);
        return { ...c, assessments: newAssessments };
      }
      return c;
    });
    setWP((prev) => ({ ...prev, criteria: updatedCriteria }));
  }

  function handleCreateFishCandidate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const code = form.get("fish-code")?.toString().trim();
    if (!code) {
      toast.error("Kode ikan harus diisi.");
      return;
    }

    const assessments: { criteriaCode: string; value: string }[] = [];
    wp?.criteria?.forEach((crit) => {
      const value = form.get(`assessment-${crit.code}`)?.toString()?.trim();
      if (value) {
        assessments.push({ criteriaCode: crit.code, value: value });
      }
    });

    const newFishCandidates = [...(wp?.fishCandidates || [])];
    const existingIndex = newFishCandidates.findIndex((fc) => fc.code === code);

    if (existingIndex > -1) {
      newFishCandidates[existingIndex] = { code, assessments };
    } else {
      newFishCandidates.push({ code, assessments });
    }

    setWP((prev) => ({
      ...prev,
      fishCandidates: newFishCandidates,
    }));
    setOpenDialog(false);
    e.currentTarget.reset();
  }

  function removeFishCandidate(code: string) {
    const updatedFishCandidates = (wp?.fishCandidates || []).filter(
      (fc) => fc.code !== code
    );
    setWP((prev) => ({
      ...prev,
      fishCandidates: updatedFishCandidates,
    }));
  }

  return (
    <Section title="Buat Perhitungan Weighted Product Baru">
      <div id="create" className="flex flex-col gap-4">
        <Button variant={"secondary"} onClick={autoInputWP}>
          Auto Input Berdasarkan Data Jurnal
        </Button>
        <form
          id="form_create"
          onSubmit={handleSubmit}
          className={cn("grid items-start gap-4 overflow-auto", className)}
        >
          {/* Kode WP */}
          <div className="grid gap-2">
            <Label htmlFor="kode">Kode WP*</Label>
            <Input
              type="text"
              id="kode"
              required
              defaultValue={wp?.kode || ""}
              onChange={(e) => setWP((p) => ({ ...p, kode: e.target.value }))}
            />
          </div>

          {/* Quality Threshold (Removed) */}

          {/* Kriteria */}
          <div className="grid gap-2">
            <Label htmlFor="criteria">Kriteria & Bobot</Label>
            <div className="w-full">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary">
                    <TableHead className="px-4 py-2 text-left text-muted-foreground border-b border-r border-border">
                      Kode
                    </TableHead>
                    <TableHead className="px-4 py-2 text-left text-muted-foreground border-b border-r border-border">
                      Nama
                    </TableHead>
                    <TableHead className="px-4 py-2 text-left text-muted-foreground border-b border-r border-border">
                      Bobot
                    </TableHead>
                    <TableHead className="px-4 py-2 text-left text-muted-foreground border-b border-r border-border">
                      Jenis
                    </TableHead>
                    <TableHead className="px-4 py-2 text-center text-muted-foreground border-b border-border">
                      Aksi
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {wp?.criteria?.map((c, index) => (
                    <TableRow key={index} className="border-b border-border">
                      <TableCell className="px-4 py-2 text-muted-foreground border-r border-border">
                        {c.code}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-muted-foreground border-r border-border">
                        {c.name}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-muted-foreground border-r border-border">
                        {c.weight}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-muted-foreground border-r border-border">
                        {c.type}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-center">
                        <Button
                          type="button"
                          size={"sm"}
                          onClick={() => removeCriteria(c.code)}
                        >
                          <Trash2 />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-accent/50">
                    <TableCell
                      colSpan={2}
                      className="px-4 py-2 font-semibold text-right border-r border-border"
                    >
                      Total Bobot
                    </TableCell>
                    <TableCell className="px-4 py-2 font-semibold border-r border-border">
                      {wp?.criteria?.reduce((sum, c) => sum + c.weight, 0)}
                    </TableCell>
                    <TableCell colSpan={2}></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <p className="text-sm text-red-600 mt-2">
              <strong>Penting</strong>: Pastikan total bobot semua kriteria
              sesuai dengan penjumlahan bobot yang digunakan dalam perhitungan
              Weighted Product.
            </p>

            {/* Tambah kriteria */}
            <div className="grid grid-cols-10 w-full gap-2 mt-4">
              <Input
                type="text"
                placeholder="Kode Kriteria (e.g., K1)"
                className="col-span-2"
                value={criteriaCode}
                onChange={(e) => setCriteriaCode(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Nama Kriteria"
                className="col-span-3"
                value={criteriaName}
                onChange={(e) => setCriteriaName(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Bobot"
                className="col-span-1"
                min={1}
                value={criteriaWeight}
                onChange={(e) => setCriteriaWeight(Number(e.target.value))}
              />
              <div className="col-span-2">
                <Select
                  onValueChange={(value: "Benefit" | "Cost") =>
                    setCriteriaType(value)
                  }
                  value={criteriaType}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Jenis Kriteria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Benefit">Benefit</SelectItem>
                    <SelectItem value="Cost">Cost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="button"
                size={"sm"}
                className="col-span-2"
                onClick={addCriteria}
              >
                <Plus /> Tambah Kriteria
              </Button>
            </div>
          </div>

          {/* Penilaian Kriteria */}
          <div className="grid gap-2">
            <Label htmlFor="criteria-assessments">Penilaian Kriteria</Label>
            <div className="w-full">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary">
                    <TableHead className="px-4 py-2 text-left text-muted-foreground border-b border-r border-border">
                      Kode Kriteria
                    </TableHead>
                    <TableHead className="px-4 py-2 text-left text-muted-foreground border-b border-r border-border">
                      Nilai Penilaian
                    </TableHead>
                    <TableHead className="px-4 py-2 text-left text-muted-foreground border-b border-r border-border">
                      Skor
                    </TableHead>
                    <TableHead className="px-4 py-2 text-center text-muted-foreground border-b border-border">
                      Aksi
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {wp?.criteria?.map((c) =>
                    c.assessments.map((a, index) => (
                      <TableRow
                        key={`<span class="math-inline">\{c\.code\}\-</span>{index}`}
                        className="border-b border-border"
                      >
                        <TableCell className="px-4 py-2 text-muted-foreground border-r border-border">
                          {c.code}
                        </TableCell>
                        <TableCell className="px-4 py-2 text-muted-foreground border-r border-border">
                          {a.value}
                        </TableCell>
                        <TableCell className="px-4 py-2 text-muted-foreground border-r border-border">
                          {a.score}
                        </TableCell>
                        <TableCell className="px-4 py-2 text-center">
                          <Button
                            type="button"
                            size={"sm"}
                            onClick={() =>
                              removeCriteriaAssessment(c.code, a.value)
                            }
                          >
                            <Trash2 />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Tambah Penilaian Kriteria */}
            <div className="grid grid-cols-8 w-full gap-2 mt-4">
              <div className="col-span-2">
                <Select
                  onValueChange={(val) => setSelectedCriteriaForAssessment(val)}
                  value={selectedCriteriaForAssessment}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Kriteria" />
                  </SelectTrigger>
                  <SelectContent>
                    {wp?.criteria?.map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        {c.name} ({c.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Input
                type="text"
                placeholder="Nilai Penilaian (e.g., Sangat Lincah)"
                className="col-span-3"
                value={criteriaAssessmentValue}
                onChange={(e) => setCriteriaAssessmentValue(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Skor"
                className="col-span-1"
                min={0}
                value={criteriaAssessmentScore}
                onChange={(e) =>
                  setCriteriaAssessmentScore(Number(e.target.value))
                }
              />
              <Button
                type="button"
                size={"sm"}
                className="col-span-2"
                onClick={addCriteriaAssessment}
              >
                <Plus /> Tambah Penilaian
              </Button>
            </div>
          </div>

          {/* Fish Candidates */}
          <div className="grid gap-2">
            <Label htmlFor="fish-candidates">Data Bibit Ikan Lele</Label>

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
                    Kode Ikan
                  </TableHead>
                  <TableHead
                    className="border border-border text-center"
                    colSpan={wp?.criteria?.length}
                  >
                    Penilaian Berdasarkan Kriteria
                  </TableHead>
                  <TableHead className="border border-border" rowSpan={2}>
                    Aksi
                  </TableHead>
                </TableRow>
                <TableRow>
                  {wp?.criteria?.map((c, index) => (
                    <TableHead key={index} className="border border-border">
                      {c.name} ({c.code})
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {wp?.fishCandidates?.map((candidate, index) => (
                  <TableRow key={index}>
                    <TableCell className="border border-border">
                      {index + 1}
                    </TableCell>
                    <TableCell className="border border-border">
                      {candidate.code}
                    </TableCell>
                    {wp?.criteria?.map((c) => {
                      const assessment = candidate.assessments.find(
                        (a) => a.criteriaCode === c.code
                      );
                      return (
                        <TableCell
                          key={c.code}
                          className="border border-border"
                        >
                          {assessment ? assessment.value : "-"}
                        </TableCell>
                      );
                    })}
                    <TableCell className="border border-border">
                      <Button
                        variant={"destructive"}
                        size={"icon"}
                        type="button"
                        onClick={() => removeFishCandidate(candidate.code)}
                      >
                        <Minus />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* Tambah Fish Candidate */}
            <Button
              onClick={() => setOpenDialog(true)}
              variant={"outline"}
              type="button"
            >
              Tambah Bibit Ikan
            </Button>
          </div>

          <Button type="submit" form="form_create">
            Submit
          </Button>
        </form>

        {/* Dialog to add/edit Fish Candidate */}
        <AddEditFishCandidateDialog
          wp={wp}
          open={openDialog}
          setOpen={setOpenDialog}
          onSubmit={handleCreateFishCandidate}
        />
      </div>
    </Section>
  );
}

interface AddEditFishCandidateDialogProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  wp: Partial<WeightedProductData | undefined>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

function AddEditFishCandidateDialog({
  open,
  setOpen,
  wp,
  onSubmit,
}: AddEditFishCandidateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[85vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Tambah/Edit Bibit Ikan</DialogTitle>
          <DialogDescription>
            Masukkan data penilaian untuk bibit ikan lele.
          </DialogDescription>
        </DialogHeader>
        <form
          id="form_fish_candidate"
          onSubmit={onSubmit}
          className="grid gap-2"
        >
          <div className="grid gap-2">
            <Label htmlFor="fish-code">Kode Ikan</Label>
            <Input type="text" required name="fish-code" id="fish-code" />
          </div>
          <Label>Penilaian untuk setiap kriteria:</Label>
          {wp?.criteria?.map((crit) => (
            <div key={crit.code} className="grid gap-2">
              <Label>
                {crit.name} ({crit.code})
              </Label>
              <Select name={`assessment-${crit.code}`} required>
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={`Pilih penilaian untuk ${crit.name}`}
                  />
                </SelectTrigger>
                <SelectContent>
                  {crit.assessments.map((assessment, idx) => (
                    <SelectItem key={idx} value={assessment.value}>
                      {assessment.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Batal
              </Button>
            </DialogClose>
            <Button type="submit" form="form_fish_candidate">
              Simpan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
