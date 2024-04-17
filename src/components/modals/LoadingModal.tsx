import { CircleProgress, Modal, ModalBody } from "@yamada-ui/react";

interface LoadingModalProps {
  isOpen: boolean;
}

const LoadingModal = (props: LoadingModalProps) => {
  const { isOpen } = props;

  return (
    <>
      <Modal
        isOpen={isOpen}
        w="150px"
        h="150px">
        <ModalBody>
          <div>
            <CircleProgress isAnimation />
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default LoadingModal;
