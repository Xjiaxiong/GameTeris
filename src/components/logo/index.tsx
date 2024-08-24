import React, { useState, useRef, useEffect } from 'react';
import cn from 'classnames';

import style from './index.module.less';
import { i18nData as i18n, lan } from '../../unit/const';

interface LogoProps {
  cur?: boolean;
  reset: boolean;
}
const Logo: React.FC<LogoProps> = ({ cur, reset }) => {
  const [styleLogo, setStyleLogo] = useState(style.r1)
  const [display, setDisplay] = useState('none')
  const timeOut = useRef<null | number>(null)

  useEffect(() => { 
    animate({ cur, reset })
  },[cur, reset])

  const animate = ({cur, reset}) => {
    clearTimeout(timeOut.current as number);

    setStyleLogo(style.r1)
    setDisplay('none')

    if (cur || reset) {
      setDisplay('none')
      return;
    }

    let m = 'r'; // 方向
    let count = 0;

    const set = (func, delay) => {
      if (!func) {
        return;
      }
      timeOut.current = setTimeout(func, delay);
    };

    const show = (func) => { // 显示
      set(() => {
        setDisplay('block')
        if (func) {
          func();
        }
      }, 150);
    };

    const hide = (func) => { // 隐藏
      set(() => {
        setDisplay('none')
        if (func) {
          func();
        }
      }, 150);
    };

    const eyes = (func, delay1, delay2) => { // 龙在眨眼睛
      set(() => {
        setStyleLogo(style[m + 2])
        set(() => {
         setStyleLogo(style[m + 1])
          if (func) {
            func();
          }
        }, delay2);
      }, delay1);
    };

    const run = (func) => { // 开始跑步啦！
      set(() => {
        setStyleLogo(style[m + 4])

        set(() => {
        setStyleLogo(style[m + 3])
          count++;
          if (count === 10 || count === 20 || count === 30) {
            m = m === 'r' ? 'l' : 'r';
          }
          if (count < 40) {
            run(func);
            return;
          }
          setStyleLogo(style[m + 1])
          if (func) {
            set(func, 4000);
          }
        }, 100);
      }, 100);
    };

    const dra = () => {
      count = 0;
      eyes(() => {
        eyes(() => {
          eyes(() => {
            setStyleLogo(style[m + 2])
            run(dra);
          }, 150, 150);
        }, 150, 150);
      }, 1000, 1500);
    };

    show(() => { // 忽隐忽现
      hide(() => {
        show(() => {
          hide(() => {
            show(() => {
              dra(); // 开始运动
            });
          });
        });
      });
    });
  }   
  if (cur) {
    return null;
  }
  return (
    <div className={style.logo} style={{ display,}}>
      <div className={cn({ bg: true, [style.dragon]: true, [styleLogo]: true })} />
      <p dangerouslySetInnerHTML={{ __html: i18n.titleCenter[lan] }} />
    </div>
  );
};

export default Logo;
