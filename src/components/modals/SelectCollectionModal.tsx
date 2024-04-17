import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  RadioGroup,
} from "@yamada-ui/react";

interface SelectCollectionModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectCollectionModal = (props: SelectCollectionModalProps) => {
  const { isOpen, setIsOpen } = props;

  return (
    <>
      <Modal isOpen={isOpen}>
        <ModalBody>
          <RadioGroup>a</RadioGroup>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button>Select</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default SelectCollectionModal;
