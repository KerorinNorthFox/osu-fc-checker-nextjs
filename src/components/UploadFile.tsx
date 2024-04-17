"use client";
// ==============================
// ファイルをアップロードする
// ==============================
import { Dropzone } from "@yamada-ui/dropzone";
import { useState } from "react";

const UploadFile = () => {
  const [isDropzoneDisabled, setIsDropzoneDisabled] = useState(false);

  const onDropped = () => {};

  return (
    <>
      <Dropzone
        multiple
        isDisabled={isDropzoneDisabled}
        onDropAccepted={(files) => {
          setIsDropzoneDisabled(true);
          onDropped();
          setIsDropzoneDisabled(false);
        }}
        margin={5}>
        <p>
          Drop here or click to select <b>osu!.db</b> and <b>collection.db</b>
        </p>
      </Dropzone>
    </>
  );
};

export default UploadFile;
