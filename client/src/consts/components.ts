import {
  HiAdjustments,
  HiOutlineArrowsExpand,
  HiOutlineCloudUpload,
  HiOutlineCube,
  HiOutlineDownload,
  HiOutlinePhotograph,
  HiOutlineTranslate,
} from 'react-icons/hi';

export const TOOLBAR_TABS = [
  { icon: HiOutlineArrowsExpand, title: 'Resize' },
  { icon: HiOutlineDownload, title: 'Export' },
  { icon: HiOutlinePhotograph, title: 'Images' },
  { icon: HiOutlineCloudUpload, title: 'Upload' },
  { icon: HiOutlineTranslate, title: 'Text' },
  { icon: HiOutlineCube, title: 'Shapes' },
  { icon: HiAdjustments, title: 'Hotkeys' },
];

export const NAVBAR_HEIGHT = 56;
export const EDITING_TOOLBAR_HEIGHT = 50;
export const FRAME_CONTAINER_PADDING = 20;
