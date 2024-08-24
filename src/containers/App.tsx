/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { BinaryMatrix } from '../types/globalType'

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import style from './app.module.less';

import Matrix from '../components/matrix';
import Decorate from '../components/decorate';
import Number from '../components/number';
import Next from '../components/next';
import Music from '../components/music';
import Pause from '../components/pause';
import Point from '../components/point';
import Logo from '../components/logo';
import Keyboard from '../components/keyboard';

import { transform, speeds, i18nData as i18n, lan } from '../unit/const';
import constModule from '../unit/const';

import { visibilityChangeEvent, isFocus } from '../unit';

import states from '../control/states';

interface AppProps {
  music: boolean;
  pause: boolean;
  matrix: BinaryMatrix;
  next: string;
  cur: object;
  dispatch: (action: any) => void;
  speedStart: number;
  speedRun: number;
  startLines: number;
  clearLines: number;
  points: number;
  max: number;
  reset: boolean;
  drop: boolean;
  keyboard: object;
}

interface TCss {
  paddingTop?: number;
  paddingBottom?: number;
  marginTop?: number;
  transform?: string;
}

const { lastRecord } = constModule;
const App: React.FC<AppProps> = (props: AppProps) => {
  
  const [w, Setw] = useState<number>(document.documentElement.clientWidth)
  const [h, Seth] = useState<number>(document.documentElement.clientHeight)

  useEffect(() => {
    //componentWillMount
    const handleResize = () => {
      Setw(document.documentElement.clientWidth)
      Seth(document.documentElement.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    //componentDidMount start
    if (visibilityChangeEvent) { // 将页面的焦点变换写入store
      document.addEventListener(visibilityChangeEvent, () => {
        states.focus(isFocus());
      }, false);
    }

    if (lastRecord) { // 读取记录
      if (lastRecord.cur && !lastRecord.pause) { // 拿到上一次游戏的状态, 如果在游戏中且没有暂停, 游戏继续
        const speedRun = props.speedRun;
        let timeout = speeds[speedRun - 1] / 2; // 继续时, 给予当前下落速度一半的停留时间
        // 停留时间不小于最快速的速度
        timeout = speedRun < speeds[speeds.length - 1] ? speeds[speeds.length - 1] : speedRun;
        states.auto(timeout);
      }
      if (!lastRecord.cur) {
        states.overStart();
      }
    } else {
      states.overStart();
    }
    // componentDidMount end

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [props.speedRun])

  const size = () => { 
    const ratio = h / w;
    let scale;
    let css: TCss = {};
    if (ratio < 1.5) {
      scale = h / 960;
    } else {
      scale = w / 640;
      const filling = (h - (960 * scale)) / scale / 3;
      css = {
        paddingTop: Math.floor(filling) + 42,
        paddingBottom: Math.floor(filling),
        marginTop: Math.floor(-480 - (filling * 1.5)),
      };
    }
    css[transform] = `scale(${scale})`;
    return css;
  }

  return (
    <div
    className={style.app}
    style={size()}
  >
    <div className={classnames({ [style.rect]: true, [style.drop]: props.drop })}>
      <Decorate />
      <div className={style.screen}>
        <div className={style.panel}>
          <Matrix
            matrix={props.matrix}
            cur={props.cur}
            reset={props.reset}
          />
          <Logo cur={!!props.cur} reset={props.reset} />
          <div className={style.state}>
            <Point cur={!!props.cur} point={props.points} max={props.max} />
            <p>{ props.cur ? i18n.cleans[lan] : i18n.startLine[lan] }</p>
            <Number number={props.cur ? props.clearLines : props.startLines} />
            <p>{i18n.level[lan]}</p>
            <Number
              number={props.cur ? props.speedRun : props.speedStart}
              length={1}
            />
            <p>{i18n.next[lan]}</p>
            <Next data={props.next} />
            <div className={style.bottom}>
              <Music data={props.music} />
              <Pause data={props.pause} />
              <Number time />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Keyboard filling={0} keyboard={props.keyboard} />
    {/* <Guide /> */}
  </div>
  )
}

const mapStateToProps = (state) => ({
  pause: state.get('pause'),
  music: state.get('music'),
  matrix: state.get('matrix'),
  next: state.get('next'),
  cur: state.get('cur'),
  speedStart: state.get('speedStart'),
  speedRun: state.get('speedRun'),
  startLines: state.get('startLines'),
  clearLines: state.get('clearLines'),
  points: state.get('points'),
  max: state.get('max'),
  reset: state.get('reset'),
  drop: state.get('drop'),
  keyboard: state.get('keyboard'),
});

export default connect(mapStateToProps)(App);
