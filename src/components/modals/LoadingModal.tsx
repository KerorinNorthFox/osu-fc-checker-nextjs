import {
  Center,
  CircleProgress,
  Loading,
  Modal,
  ModalBody,
  Progress,
  VStack,
} from "@yamada-ui/react";

interface LoadingModalProps {
  fileName: string;
}

const LoadingModal = (props: LoadingModalProps) => {
  const { fileName } = props;

  return (
    <>
      <Modal
        isOpen={true}
        w="220px"
        h="150px">
        <ModalBody padding="20px">
          <VStack>
            <p>Loading {fileName}</p>
            <div>
              <Progress isAnimation />
            </div>
          </VStack>
        </ModalBody>
      </Modal>
    </>
  );
};

export default LoadingModal;
