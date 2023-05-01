import { StageObjectData, StageObjectType } from '~/types/stage-object';

export const DEFAULT_STAGE_OBJECT = {
  width: 100,
  height: 100,
  x: 20,
  y: 20,
  draggable: true,
};

export const DEFAULT_IMAGE_OBJECT: StageObjectData = {
  ...DEFAULT_STAGE_OBJECT,
  type: StageObjectType.IMAGE,
};

export const DEFAULT_TEXT_OBJECT: StageObjectData = {
  ...DEFAULT_STAGE_OBJECT,
  width: 300,
  type: StageObjectType.TEXT,
};