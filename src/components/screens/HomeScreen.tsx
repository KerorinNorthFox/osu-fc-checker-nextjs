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
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
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

  useEffect(() => {
    console.log("selected index :", selectedIndex);
  }, [selectedIndex]);

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
        <div>
          <p>{osuDB == null ? "osu!db is unloaded" : "osu!.db is loaded"}</p>
          <p>
            {osuCollectionDB == null
              ? "collection.db is unloaded"
              : "collection.db is loaded"}
          </p>
        </div>
        <BeatmapFilter />
        <BeatmapTable data={beatmapTableData} />
      </VStack>
      <SelectCollectionModal
        osuCollectionDB={osuCollectionDB}
        isOpen={isOpenSelectCollectionModal}
        setIsOpen={setIsOpenSelectCollectionModal}
        setIndex={setSelectedIndex}
      />
    </>
  );
};

export default HomeScreen;
