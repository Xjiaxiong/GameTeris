import React, { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import style from './index.module.less';

interface PauseProps {
  data: boolean;
}
const Pause: React.FC<PauseProps> = ({ data = false }) => {
  
  const [showPause, setShowPause] = useState(false);
  const timeout = useRef<number | null>(null);

  useEffect(() => { 
    setShake(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
  
  // 根据props显示闪烁或停止闪烁
  function setShake(bool: boolean) {  
    if (bool && !timeout.current) {
      timeout.current = setInterval(() => {
        setShowPause(!showPause)
      }, 250);
    }
    if (!bool && timeout.current) {
      clearInterval(timeout.current);
      setShowPause(false)
      timeout.current = null;
    }
  }
  return (
    <div
      className={cn(
        {
          bg: true,
          [style.pause]: true,
          [style.c]: showPause,
        }
      )}
    />
  );
}

export default Pause;

