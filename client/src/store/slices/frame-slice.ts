import { createSlice } from '@reduxjs/toolkit';

export type IStageState = {
  id: string | null;
  name: string | null;
  content?: string | null;
};

export type IFrameState = {
  stage: IStageState;
  width: number;
  height: number;
  scale: number;
};

const initialState: IFrameState = {
  stage: {
    id: null,
    name: null,
    content: null,
  },
  width: 1080,
  height: 1080,
  scale: 1,
};

const frameSlice = createSlice({
  name: 'frame',
  initialState,
  reducers: {
    setStage(state, { payload }) {
      state.stage.id = payload.id;
      state.stage.name = payload.name;
      state.stage.content = payload.content || '""';
    },
    setSize(state, { payload }) {
      state.width = payload.width;
      state.height = payload.height;
    },
    setScale(state, { payload }) {
      state.scale = payload.scale;
    },
  },
});

export const { setSize, setScale, setStage } = frameSlice.actions;
export default frameSlice.reducer;
