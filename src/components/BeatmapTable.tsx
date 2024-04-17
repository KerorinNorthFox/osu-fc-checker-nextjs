"use client";
// ==============================
// 読み込んだ譜面を表示するテーブル
// ==============================
import { Column, PagingTable } from "@yamada-ui/table";
import { useMemo } from "react";

export interface BeatmapTableData {
  title: string;
  beatmapId: number;
  beatmapsetId: number;
  yourCombo: number;
  maxCombo: number;
}

interface BeatmapTableProps {
  tableData: BeatmapTableData[];
}

const BeatmapTable = (props: BeatmapTableProps) => {
  const { tableData } = props;

  const columns = useMemo<Column<BeatmapTableData>[]>(
    () => [
      {
        header: "Title",
        accessorKey: "title",
      },
      {
        header: "Beatmap ID",
        accessorKey: "beatmapId",
      },
      {
        header: "Beatmapset ID",
        accessorKey: "beatmapsetId",
      },
      {
        header: "Your Combo",
        accessorKey: "yourCombo",
      },
      {
        header: "Max Combo",
        accessorKey: "maxCombo",
      },
    ],
    [],
  );

  return (
    <>
      <PagingTable
        columns={columns}
        data={tableData}
      />
    </>
  );
};

export default BeatmapTable;
