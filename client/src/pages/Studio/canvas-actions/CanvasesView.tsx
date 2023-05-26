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
  Card,
  Text,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import Loader from '~/components/Loader/Loader';
import NothingFound from '~/components/NothingFound/NothingFound';
import { useGetCanvasesQuery } from '~/store/slices/canvas-slice';
import { IStageState, setStage } from '~/store/slices/frame-slice';

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date));

const CanvasesView = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading } = useGetCanvasesQuery();

  const changeStage = ({ id, name }: IStageState) =>
    dispatch(
      setStage({
        id,
        name,
      }),
    );

  return (
    <Box sx={{ w: '100%' }}>
      <Button onClick={onOpen} sx={{ w: '100%' }}>
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
                  data.map(({ id, name, ...s }) => (
                    <Card
                      key={id}
                      onClick={() => changeStage({ id, name })}
                      variant="outline"
                      _hover={{ bgColor: 'gray.100', cursor: 'pointer' }}
                      sx={{ w: '100%', p: 4, borderRadius: '10px' }}
                    >
                      <VStack spacing={2} sx={{ alignItems: 'flex-start', w: '100%' }}>
                        <Box>
                          <Text fontSize="18px" fontWeight="600" color="pink.500">
                            {name}
                          </Text>
                          <Text fontSize="16px" fontWeight="500" color="pink.500">
                            {s.description}
                          </Text>
                        </Box>
                        <Text w="100%" align="right" fontSize="14px" fontWeight="500">
                          Last update: {formatDate(s.updatedAt)}
                        </Text>
                      </VStack>
                    </Card>
                  ))
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
