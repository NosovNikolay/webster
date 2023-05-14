import { Button, HStack } from '@chakra-ui/react';
import useStageObject from '~/hooks/use-stage-object';
import { StageObject } from '~/types/stage-object';

type Props = {
  selectedObject: StageObject;
};

const ImageEditing = ({ selectedObject }: Props) => {
  const { id, data } = selectedObject;
  const { updateOne } = useStageObject();

  const flipVertically = () => {
    const offsetY = data.height / 2;
    const scaleY = -1 * data.scaleY;
    updateOne({ id, data: { offsetY, scaleY } });
  };

  const flipHorizontally = () => {
    const offsetX = data.width / 2;
    const scaleX = -1 * data.scaleX;
    updateOne({ id, data: { offsetX, scaleX } });
  };

  return (
    <HStack spacing={4} sx={{ px: 4 }}>
      <Button onClick={() => flipVertically()}>Flip vertically</Button>
      <Button onClick={() => flipHorizontally()}>Flip horizontally</Button>
    </HStack>
  );
};

export default ImageEditing;
