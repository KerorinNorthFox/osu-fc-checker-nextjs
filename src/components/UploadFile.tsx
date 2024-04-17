"use client";
// ==============================
// ファイルをアップロードする
// ==============================
import { SetStateAction, useState } from "react";
import { Dropzone } from "@yamada-ui/dropzone";
import LoadingModal from "@/components/modals/LoadingModal";
import { arrayBufferToJson, readFileAsArrayBuffer } from "@/lib/buffer/convert";
import { OsuCollectionDB, OsuDB } from "@/lib/types/external";

interface UploadFileProps {
  osuDB: OsuDB | null;
  osuCollectionDB: OsuCollectionDB | null;
  setOsuDB: React.Dispatch<React.SetStateAction<OsuDB | null>>;
  setOsuCollectionDB: React.Dispatch<
    React.SetStateAction<OsuCollectionDB | null>
  >;
  setIsLoadDBComplete: React.Dispatch<SetStateAction<boolean>>;
}

const UploadFile = (props: UploadFileProps) => {
  const {
    osuDB,
    osuCollectionDB,
    setOsuDB,
    setOsuCollectionDB,
    setIsLoadDBComplete,
  } = props;
  const [isDropzoneDisabled, setIsDropzoneDisabled] = useState<boolean>(false);
  const [isOpenLoadingModal, setIsOpenLoadingModal] = useState<boolean>(false);

  const onDropped = async (files: File[]) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // osu!.dbかcollection.db以外を弾く
      if (!file.name.match("^(osu!|collection).db$")) {
        alert(
          "The file is incorrect : " +
            file.name +
            "\nPlease select osu!.db and collection.db",
        );
        return;
      }

      try {
        const arrBuf = await readFileAsArrayBuffer(file);
        const arrBufJson = arrayBufferToJson(arrBuf);

        const res = await fetch("/api/db/parser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            Object.assign(arrBufJson, {
              dbType: file.name.match("collection.db") ? "collection" : "osu",
            }),
          ),
        });

        if (!res.ok) {
          alert(`${res.statusText}\nファイルをアップロードできませんでした`);
          return;
        }

        const data = await res.json();

        if (!data.success) {
          alert("DBファイルの読み込みに失敗しました");
          return;
        }
        console.log("DB data:", data.data);

        if (file.name.match("osu!.db")) {
          setOsuDB(data.data);
        } else if (file.name.match("collection.db")) {
          setOsuCollectionDB(data.data);
        } else {
          alert("データのセットに失敗");
        }
      } catch (e) {
        alert(e);
        return;
      }
    }

    console.log("osuDB:", osuDB);
    console.log("osuCollectionDB", osuCollectionDB);
    if (osuDB !== null && osuCollectionDB !== null) {
      setIsLoadDBComplete(true);
    }
  };

  return (
    <>
      <Dropzone
        multiple
        isDisabled={isDropzoneDisabled}
        onDropAccepted={async (files) => {
          setIsOpenLoadingModal(true);
          setIsDropzoneDisabled(true);
          await onDropped(files);
          setIsDropzoneDisabled(false);
          setIsOpenLoadingModal(false);
        }}
        margin={5}>
        <p>
          Drop here or click to select <b>osu!.db</b> and <b>collection.db</b>
        </p>
      </Dropzone>
      <LoadingModal isOpen={isOpenLoadingModal} />
    </>
  );
};

export default UploadFile;
