import { nanoid } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { stageObjectSelector, stateObjectActions } from '~/store/slices/stage-object-slice';
import { StageObject, StageObjectData, StageObjectPartial } from '~/types/stage-object';
import { useAppSelector } from './use-app-selector';

const useStageObject = () => {
  const dispatch = useDispatch();
  const stageObjects = useAppSelector(stageObjectSelector.selectAll);

  const createOne = (data: StageObjectData) => {
    const payload: StageObject = { id: nanoid(), data };
    dispatch(stateObjectActions.addOne(payload));
  };

  const updateOne = (obj: StageObjectPartial) => {
    const { id, data } = obj;
    const target = stageObjects.find((s) => s.id === id);
    if (!target) {
      console.error(`A target with the id ${id} does not exist.`);
      return;
    }

    const payload = { ...target.data, ...data };
    payload.image && delete payload.image;
    dispatch(stateObjectActions.updateOne({ id, data: payload }));
  };

  const removeOne = (id: string) => {
    dispatch(stateObjectActions.removeOne(id));
  };

  const resetAll = () => {
    dispatch(stateObjectActions.removeAll());
  };

  return {
    stageObjects,
    createOne,
    updateOne,
    removeOne,
    resetAll,
  };
};
export default useStageObject;
