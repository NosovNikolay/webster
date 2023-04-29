import Konva from 'konva';
import { RefObject } from 'react';

type Props = {
  transformer: RefObject<Konva.Transformer>;
};

const useObjectSelect = ({ transformer }: Props) => {
  const onObjectSelect = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const target = e.target;

    transformer.current?.nodes([target]);
    transformer.current?.getLayer()?.batchDraw();
  };

  return { onObjectSelect };
};

export default useObjectSelect;
