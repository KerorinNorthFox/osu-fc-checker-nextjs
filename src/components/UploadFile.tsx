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
  const [loadingFileName, setLoadingFileName] = useState<string>("");

  const onDropped = async (files: File[]) => {
    console.time("onDropped");
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setLoadingFileName(file.name);
      // osu!.dbかcollection.db以外を弾く
      if (!file.name.match("^(osu!|collection).db$")) {
        alert(
          "The file is incorrect : " +
            file.name +
            "\nPlease select osu!.db and collection.db",
        );
        return;
      }
      console.log(`The file "${file.name}" is correct.`);

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
          alert(`${res.statusText}\nFailed to upload the DB.`);
          return;
        }

        const data = await res.json();

        if (!data.success) {
          alert("Failed to load the DB.");
          return;
        }
        console.log("DB loading completed successfully.\n", data.data);

        if (file.name.match("osu!.db")) {
          setOsuDB(data.data);
        } else if (file.name.match("collection.db")) {
          setOsuCollectionDB(data.data);
        }
      } catch (e) {
        alert(e);
        return;
      }
    }

    if (osuDB !== null && osuCollectionDB !== null) {
      setIsLoadDBComplete(true);
    }
    console.timeEnd("onDropped");
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
      {isOpenLoadingModal ? <LoadingModal fileName={loadingFileName} /> : <></>}
    </>
  );
};

export default UploadFile;
