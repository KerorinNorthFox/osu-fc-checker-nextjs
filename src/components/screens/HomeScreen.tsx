"use client";
// ==============================
// osu fc checkerのメイン画面
// ==============================
import { useEffect, useState } from "react";
import { VStack } from "@yamada-ui/react";
import UploadFile from "@/components/UploadFile";
import BeatmapFilter from "@/components/BeatmapFilter";
import BeatmapTable, { BeatmapTableData } from "@/components/BeatmapTable";
import SelectCollectionModal from "@/components/modals/SelectCollectionModal";
import { OsuCollectionDB, OsuDB } from "@/lib/types/external";

const HomeScreen = () => {
  const [isOpenSelectCollectionModal, setIsOpenSelectCollectionModal] =
    useState<boolean>(false);
  const [osuDB, setOsuDB] = useState<OsuDB | null>(null);
  const [osuCollectionDB, setOsuCollectionDB] =
    useState<OsuCollectionDB | null>(null);
  const [isLoadDBComplete, setIsLoadDBComplete] = useState<boolean>(false);
  const [beatmapTableData, setBeatmapTableData] = useState<BeatmapTableData[]>(
    [],
  );

  useEffect(() => {
    console.log("useEffect > osuDB, osuCollectionDB");
    if (osuDB !== null && osuCollectionDB !== null) {
      setIsLoadDBComplete(true);
    }
  }, [osuDB, osuCollectionDB]);

  useEffect(() => {
    console.log("useEffect > isLoadDBComplete:", isLoadDBComplete);
    if (isLoadDBComplete) {
      setIsOpenSelectCollectionModal(true);
      setIsLoadDBComplete(false);
    }
  }, [isLoadDBComplete]);

  return (
    <>
      <VStack>
        <UploadFile
          osuDB={osuDB}
          osuCollectionDB={osuCollectionDB}
          setOsuDB={setOsuDB}
          setOsuCollectionDB={setOsuCollectionDB}
          setIsLoadDBComplete={setIsLoadDBComplete}
        />
        <BeatmapFilter />
        <BeatmapTable data={beatmapTableData} />
      </VStack>
      <SelectCollectionModal
        isOpen={isOpenSelectCollectionModal}
        setIsOpen={setIsOpenSelectCollectionModal}
      />
    </>
  );
};

export default HomeScreen;
