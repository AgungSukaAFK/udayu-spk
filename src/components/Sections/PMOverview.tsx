import { useEffect, useMemo, useState, type SetStateAction } from "react";
import Section from "../Section";
import { Input } from "../ui/input";
import {
  PMServices,
  type ProfileMatchingData,
} from "@/services/profile-matching";
import { toast } from "sonner";
import MyPagination from "../MyPagination";
import { Button } from "../ui/button";
import { formatFirestoreTimestamp } from "@/utils/date";
import { Skeleton } from "../ui/skeleton";

export default function PMOverview({
  setPm,
}: {
  setPm: React.Dispatch<SetStateAction<ProfileMatchingData | undefined>>;
}) {
  const [pm, setPM] = useState<ProfileMatchingData[]>();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const filteredPM = useMemo(() => {
    if (!pm) return [];
    return pm.filter((item) =>
      item.kode.toLowerCase().includes(search.toLowerCase())
    );
  }, [pm, search]);

  const totalPages = Math.ceil(filteredPM.length / itemsPerPage);

  const paginatedPM = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredPM.slice(start, start + itemsPerPage);
  }, [filteredPM, page]);

  useEffect(() => {
    async function fetchPM() {
      const pm = await PMServices.getAllPM();
      if (pm.success) {
        setPM(pm.data);
      } else {
        toast.error(pm.message);
      }
    }

    if (!pm) {
      fetchPM();
    }
  }, [pm]);

  return (
    <Section title="Overview">
      {/* Search bar */}
      <div className="flex flex-col gap-4 mb-4">
        <Input
          type="text"
          placeholder="Cari berdasarkan kode"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <Button variant={"ghost"} asChild>
          <a href="#create">Buat Baru</a>
        </Button>
      </div>

      {/* Daftar PM */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mb-4 gap-2">
        {paginatedPM.length > 0
          ? paginatedPM.map((item, key) => (
              <div
                key={key}
                className="w-fit flex flex-col gap-2 px-4 py-2 shadow-xs border-border border rounded-md"
              >
                <Button variant={"outline"} onClick={() => setPm(item)}>
                  <a href="#pm-detail">{item.kode}</a>
                </Button>
                <p className="text-base">
                  Terakhir diubah : {formatFirestoreTimestamp(item.updated_at)}
                </p>
              </div>
            ))
          : [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 px-4 py-2 shadow-xs border border-border rounded-md"
              >
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-3/4 h-4" />
              </div>
            ))}
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <MyPagination
          currentPage={page}
          onPageChange={setPage}
          totalPages={totalPages}
        />
      )}
    </Section>
  );
}
