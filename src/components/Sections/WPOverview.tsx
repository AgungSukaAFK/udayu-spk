import { useEffect, useMemo, useState, type SetStateAction } from "react";
import Section from "../Section";
import { Input } from "../ui/input";
import {
  WPServices,
  type WeightedProductData,
} from "@/services/weighted-product"; // Adjusted import for WP services
import { toast } from "sonner";
import MyPagination from "../MyPagination";
import { Button } from "../ui/button";
import { formatFirestoreTimestamp } from "@/utils/date"; // Assuming this utility is available
import { Skeleton } from "../ui/skeleton";
import type { Timestamp } from "firebase/firestore";

export default function WPOverview({
  setWp,
}: {
  setWp: React.Dispatch<SetStateAction<WeightedProductData | undefined>>;
}) {
  const [wp, setWP] = useState<WeightedProductData[]>();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const filteredWP = useMemo(() => {
    if (!wp) return [];
    return wp.filter((item) =>
      item.kode.toLowerCase().includes(search.toLowerCase())
    );
  }, [wp, search]);

  const totalPages = Math.ceil(filteredWP.length / itemsPerPage);

  const paginatedWP = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredWP.slice(start, start + itemsPerPage);
  }, [filteredWP, page]);

  useEffect(() => {
    async function fetchWP() {
      const wpResponse = await WPServices.getAllWP(); // Changed to WPServices
      if (wpResponse.success) {
        setWP(wpResponse.data);
      } else {
        toast.error(wpResponse.message);
      }
    }

    if (!wp) {
      fetchWP();
    }
  }, [wp]);

  return (
    <Section title="Overview Perhitungan Weighted Product">
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

      {/* Daftar WP */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mb-4 gap-2">
        {paginatedWP.length > 0
          ? paginatedWP.map((item, key) => (
              <div
                key={key}
                className="w-fit flex flex-col gap-2 px-4 py-2 shadow-xs border-border border rounded-md"
              >
                <Button variant={"outline"} onClick={() => setWp(item)} asChild>
                  <a href="#wp-detail">{item.kode}</a>
                </Button>
                <p className="text-base">
                  Terakhir diubah :{" "}
                  {formatFirestoreTimestamp(item.updated_at as Timestamp)}
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
