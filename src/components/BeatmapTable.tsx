"use client";
// ==============================
// 読み込んだ譜面を表示するテーブル
// ==============================
import { useMemo } from "react";
import { Column, PagingTable } from "@yamada-ui/table";
import { BeatmapData } from "@/lib/types/external";

export interface BeatmapTableData {
  title: string;
  beatmapId: number;
  beatmapsetId: number;
  userCombo: number;
  maxCombo: number;
}

interface BeatmapTableProps {
  data: BeatmapTableData[];
}

const BeatmapTable = (props: BeatmapTableProps) => {
  const { data } = props;

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
        accessorKey: "userCombo",
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
        data={data}
      />
    </>
  );
};

export default BeatmapTable;

// Tableに表示するためにBeatmapDataをScoreDataに変換
export function convertBeatmapDataToScoreData(
  beatmaps: BeatmapData[],
): BeatmapTableData[] {
  let tableData: BeatmapTableData[] = [];
  for (let i = 0; i < beatmaps.length; i++) {
    const beatmap = beatmaps[i];
    tableData.push({
      title: beatmap.osu_file_name,
      beatmapId: beatmap.beatmap_id,
      beatmapsetId: beatmap.beatmapset_id,
      userCombo: beatmap.user_combo,
      maxCombo: beatmap.max_combo,
    });
  }
  return tableData;
}
