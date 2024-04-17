"use client";
// ==============================
// osu fc checkerのメイン画面
// ==============================
import { useState } from "react";
import { VStack } from "@yamada-ui/react";
import UploadFile from "@/components/UploadFile";
import BeatmapFilter from "@/components/BeatmapFilter";
import BeatmapTable, { BeatmapTableData } from "@/components/BeatmapTable";

const HomeScreen = () => {
  const [beatmapTableData, setBeatmapTableData] = useState<BeatmapTableData[]>(
    [],
  );

  return (
    <>
      <VStack>
        <UploadFile />
        <BeatmapFilter />
        <BeatmapTable data={beatmapTableData} />
      </VStack>
    </>
  );
};

export default HomeScreen;
