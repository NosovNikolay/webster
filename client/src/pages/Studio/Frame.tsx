import React, { useState, useEffect } from 'react';
import Konva from 'konva';
import { Stage, Layer } from 'react-konva';
import { useAppSelector } from '~/hooks/use-app-selector';
import EditableText from './tools/Text/EditableText';
import { KonvaEventObject } from 'konva/lib/Node';
import ImageObject from './objects/ImageObject/ImageObject';
import useStageObject from '~/hooks/use-stage-object';
import { StageObject, StageObjectType } from '~/types/stage-object';
import useObjectSelect from '~/hooks/use-object-select';

type IProps = {
  stageRef: React.RefObject<Konva.Stage> | null;
};

const Frame = ({ stageRef }: IProps) => {
  const { stageObjects } = useStageObject();

  const { resetObjectSelect } = useObjectSelect({});

  const [scale, setScale] = useState(1);
  const { width, height } = useAppSelector((state) => state.frame);

  useEffect(() => {
    const containerCenterPaddings = 40;
    const toolbar = document.querySelector('#toolbar') as HTMLElement;
    const navbar = document.querySelector('#navbar') as HTMLElement;
    if (toolbar && navbar) {
      const wScale = (window.innerWidth - toolbar.offsetWidth - containerCenterPaddings) / width;
      const hScale = (window.innerHeight - navbar.offsetHeight - containerCenterPaddings) / height;
      if (wScale < hScale) {
        setScale(wScale);
      } else {
        setScale(hScale);
      }
    }
  }, [width, height]);

  const checkDeselect = (e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      resetObjectSelect();
    }
  };

  const renderStageObject = (obj: StageObject) => {
    const data = obj.data;
    switch (data.type) {
      case StageObjectType.IMAGE:
        return <ImageObject obj={obj} />;
      case StageObjectType.TEXT:
        return <EditableText shapeProps={obj} />;
      default:
        return null;
    }
  };

  return (
    <Stage
      width={width * scale}
      height={height * scale}
      style={{ backgroundColor: 'white' }}
      scaleX={scale}
      scaleY={scale}
      ref={stageRef}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
    >
      <Layer>
        {stageObjects.map((obj) => (
          <React.Fragment key={obj.id}>{renderStageObject(obj)}</React.Fragment>
        ))}
        {/* <Transformer ref={transformer} onTransformEnd={onTransformerEnd} /> */}
      </Layer>
    </Stage>
  );
};

export default Frame;
