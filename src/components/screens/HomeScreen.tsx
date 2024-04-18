"use client";
// ==============================
// osu fc checkerのメイン画面
// ==============================
import { useEffect, useState } from "react";
import { VStack } from "@yamada-ui/react";
import UploadFile from "@/components/UploadFile";
import BeatmapFilter from "@/components/BeatmapFilter";
import BeatmapTable, {
  BeatmapTableData,
  convertBeatmapDataToScoreData,
} from "@/components/BeatmapTable";
import SelectCollectionModal from "@/components/modals/SelectCollectionModal";
import { useOsuToken } from "@/components/stores/OsuTokenProvider";
import { matchEachMd5 } from "@/lib/filter";
import { fetchBeatmapInfo } from "@/lib/fetch";
import { OsuCollectionDB, OsuDB } from "@/lib/types/external";

const HomeScreen = () => {
  const [isOpenSelectCollectionModal, setIsOpenSelectCollectionModal] =
    useState<boolean>(false);
  const [osuDB, setOsuDB] = useState<OsuDB | null>(null);
  const [osuCollectionDB, setOsuCollectionDB] =
    useState<OsuCollectionDB | null>(null);
  const [selectedCollectionIndex, setSelectedCollectionIndex] =
    useState<number>(-1);
  const [isLoadDBComplete, setIsLoadDBComplete] = useState<boolean>(false);
  const [beatmapTableData, setBeatmapTableData] = useState<BeatmapTableData[]>(
    [],
  );
  const token = useOsuToken();

  useEffect(() => {
    console.log("HomeScreen > useEffect > osuDB, osuCollectionDB");
    if (osuDB !== null && osuCollectionDB !== null) {
      setIsLoadDBComplete(true);
    }
  }, [osuDB, osuCollectionDB]);

  useEffect(() => {
    console.log("HomeScreen > useEffect > isLoadDBComplete:", isLoadDBComplete);
    if (isLoadDBComplete) {
      setIsOpenSelectCollectionModal(true);
      setIsLoadDBComplete(false);
    }
  }, [isLoadDBComplete]);

  useEffect(() => {
    console.log("HomeScreen > useEffect > selectedCollectionIndex");
    console.log("selected index :", selectedCollectionIndex);
    if (osuDB !== null && osuCollectionDB !== null) {
      const beatmaps = matchEachMd5(
        osuDB.beatmaps,
        osuCollectionDB.collection[selectedCollectionIndex],
      );
      fetchBeatmapInfo(beatmaps, token).then((bms) => {
        const data = convertBeatmapDataToScoreData(bms);
        setBeatmapTableData(data);
      });
    }
  }, [selectedCollectionIndex]);

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
        setIndex={setSelectedCollectionIndex}
      />
    </>
  );
};

export default HomeScreen;
