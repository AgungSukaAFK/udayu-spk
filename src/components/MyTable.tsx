import { Table, TableBody, TableCell, TableHead, TableRow } from "./ui/table";

interface MyTableProps {
  headers: string[];
  data: any[][];
}
export default function MyTable({ headers, data }: MyTableProps) {
  return (
    <Table>
      <TableRow>
        <TableHead className="border border-border">No</TableHead>
        {headers.map((e) => (
          <TableHead className="border border-border">{e}</TableHead>
        ))}
      </TableRow>
      <TableBody>
        {data.map((items, i) => {
          return (
            <TableRow>
              <TableCell className="border border-border w-[40px]">
                {i + 1}
              </TableCell>
              {items.map((item, key) => (
                <TableCell key={key} className="border border-border">
                  {item}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
