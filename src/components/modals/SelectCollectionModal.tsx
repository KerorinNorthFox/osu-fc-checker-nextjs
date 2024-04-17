import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  RadioGroup,
} from "@yamada-ui/react";

interface SelectCollectionModalProps {
  isOpen: boolean;
}

const SelectCollectionModal = (props: SelectCollectionModalProps) => {
  const { isOpen } = props;

  return (
    <>
      <Modal isOpen={isOpen}>
        <ModalBody>
          <RadioGroup>a</RadioGroup>
        </ModalBody>
        <ModalFooter>
          <Button>Cancel</Button>
          <Button>Select</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
