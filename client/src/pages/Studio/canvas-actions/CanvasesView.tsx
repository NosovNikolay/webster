import {
  Button,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
  Box,
  VStack,
} from '@chakra-ui/react';
import Loader from '~/components/Loader/Loader';
import NothingFound from '~/components/NothingFound/NothingFound';
import { useGetCanvasesQuery } from '~/store/slices/canvas-slice';
import CanvasViewItem from './CanvasViewItem';

const CanvasesView = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading } = useGetCanvasesQuery();

  return (
    <Box sx={{ w: '100%' }}>
      <Button variant="ghost" colorScheme="pink" onClick={onOpen} sx={{ w: '100%' }}>
        View all stages
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent sx={{ p: 4 }}>
          <ModalHeader>All Created Stages</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoading ? (
              <Loader />
            ) : (
              <VStack spacing={4}>
                {data && data.length ? (
                  data.map((s) => <CanvasViewItem onClose={onClose} key={s.id} {...s} />)
                ) : (
                  <NothingFound message="You have no stages. Please create one." />
                )}
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CanvasesView;
