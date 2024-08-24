import { ReducerType } from '../../types/globalType';
import { hasWebAudioAPI } from '../../unit/music';
import constModule from '../../unit/const';
const { lastRecord } = constModule;

let initState = lastRecord && lastRecord.music !== undefined ? !!lastRecord.music : true;
if (!hasWebAudioAPI.data) {
  initState = false;
}
const music = (state = initState, action) => {
  switch (action.type) {
    case ReducerType.MUSIC:
      if (!hasWebAudioAPI.data) { // 若浏览器不支持 WebAudioApi, 将无法播放音效
        return false;
      }
      return action.data;
    default:
      return state;
  }
};

export default music;
