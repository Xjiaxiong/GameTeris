import React, { useState, useEffect, useRef, useMemo } from 'react';
import cn from 'classnames';
import style from './index.module.less';

interface NumberProps {
  number?: number;
  length?: number;
  time?: boolean;
}

const render = (data) => (
  <div className={style.number}>
    {
      data.map((e, k) => (
        <span className={cn(['bg', style[`s_${e}`]])} key={k} />
      ))
    }
  </div>
);

const formate = (num) => (
  num < 10 ? `0${num}`.split('') : `${num}`.split('')
);


const Number: React.FC<NumberProps> = ({ number, length = 6, time }) => {
  const [timeInner, setTimeInner] = useState(new Date());
  const [timeCount, setTimeCount] = useState<number | boolean>(false);
  const timeInterval = useRef(0)
  const time_count = useRef(0)

  useEffect(() => { 
    if (!time) {
      return;
    }
    const clock = () => {
      const count = +timeInterval.current;
      timeInterval.current = setTimeout(() => {
        setTimeInner(new Date())
        setTimeCount(count)
        clock();
      }, 1000);
    };
    clock();
    return () => {
      clearTimeout(timeInterval.current);
    };
  }, [time])

  const shouleUpdate = useMemo(() => {
    if (time) { 
      if (timeCount !== time_count.current) {
        if (timeCount !== false) {
          time_count.current = timeCount as number; // 记录clock上一次的缓存
        }
        return true;
      }
      return false;
    }
    return true;
  },[timeCount,time,])

  if (!shouleUpdate) {
    return null;
  }

  if (time) { // 右下角时钟
    const now = timeInner;
    const hour = formate(now.getHours());
    const min = formate(now.getMinutes());
    const sec = now.getSeconds() % 2;
    const t = hour.concat(sec ? 'd' : 'd_c', min);
    return (render(t));
  }


  const num = `${number}`.split('');
  for (let i = 0, len = length - num.length; i < len; i++) {
    num.unshift('n');
  }
  return (render(num));
}

export default Number;
