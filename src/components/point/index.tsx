import React, { useState, useEffect,  useRef, memo} from 'react';
// import propTypes from 'prop-types';

import Number from '../number';
import { i18nData as i18n, lan } from '../../unit/const';

const DF = i18n.point[lan];
const ZDF = i18n.highestScore[lan];
const SLDF = i18n.lastRound[lan];

interface PointProps {
  cur: boolean;
  max: number;
  point: number;
}

const Point: React.FC<PointProps> = memo((props) => {
  
  const [label, setLabel] = useState('');
  const [number, setNumber] = useState(0);
  const timeOutRef = useRef<number | null>(null);


  useEffect(() => {
    onChange(props);
  }, [props])

  function onChange({ cur, point, max }) {
    clearInterval(timeOutRef.current as number);
    if (cur) { // 在游戏进行中
      setLabel(point >= max ? ZDF : DF)
      setNumber(point);
    } else { // 游戏未开始
      const toggle = () => { // 最高分与上轮得分交替出现
        setLabel(SLDF)
        setNumber(point);

        timeOutRef.current = setTimeout(() => {
          setLabel(ZDF)
          setNumber(max);
          timeOutRef.current = setTimeout(toggle, 3000);
        }, 3000);
      };

      if (point !== 0) { // 如果为上轮没玩, 也不用提示了
        toggle();
      } else {
        setLabel(ZDF)
        setNumber(max);
      }
    }
  }
  return (
    <div>
      <p>{ label }</p>
      <Number number={number} />
    </div>
  );
})

export default Point;

