"use client";
// ============================================
// 読み込んだコレクションを選択するモーダル
// ============================================
import { ReactNode, useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Radio,
  RadioGroup,
} from "@yamada-ui/react";
import { OsuCollectionDB } from "@/lib/types/external";

interface SelectCollectionModalProps {
  osuCollectionDB: OsuCollectionDB | null;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}

const SelectCollectionModal = (props: SelectCollectionModalProps) => {
  const { osuCollectionDB, isOpen, setIsOpen, setIndex } = props;
  const [collectionTitles, setCollectionTitles] = useState<ReactNode[]>([]);
  const [selectedCollectionIndex, setSelectedCollectionIndex] = useState<
    number | undefined
  >();

  useEffect(() => {
    console.log("SelectCollectionModal > useEffect > osuCollectionDB");
    if (osuCollectionDB !== null) {
      const collection = osuCollectionDB.collection;
      const titles = collection.map((collection, index) => (
        <Radio
          key={index + 1}
          value={index + 1}>
          {collection.name}
        </Radio>
      ));
      setCollectionTitles(titles);
    }
  }, [osuCollectionDB]);

  return (
    <>
      <Modal isOpen={isOpen}>
        <ModalBody>
          <RadioGroup
            value={selectedCollectionIndex}
            onChange={(value) => setSelectedCollectionIndex(Number(value))}>
            {collectionTitles}
          </RadioGroup>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button
            disabled={selectedCollectionIndex === null}
            onClick={() => {
              if (typeof selectedCollectionIndex === "undefined") {
                return;
              }
              setIndex(selectedCollectionIndex - 1);
              setIsOpen(false);
            }}>
            Select
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default SelectCollectionModal;
