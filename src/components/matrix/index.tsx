/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React,{ useEffect, useState } from 'react';
import { List } from 'immutable';
import classnames from 'classnames';

import style from './index.module.less';
import unit from '../../unit';
import { fillLine, blankLine } from '../../unit/const';
import states from '../../control/states';
import { BinaryMatrix } from '../../types/globalType'


const t = setTimeout;
const isClear = unit.isClear;

interface MatrixProps {
  matrix: BinaryMatrix;
  cur: any;
  reset: boolean;
}

const Matrix: React.FC<MatrixProps> = (props) => {
  // console.log(`MatrixProps`, props)
  const { matrix, cur, reset } = props;

  const [clearLines, setClearLines] = useState<number[] | boolean>(false)
  const [animateColor, setAnimateColor] = useState(2)
  const [isOver, setIsOver] = useState(false)
  const [overState, setOverState] = useState<List<any> | null>(null)

  useEffect(() => {
    const clears = isClear(matrix)
    const overs = reset;

    setClearLines(clears)
    setIsOver(overs)

    if (clears && !clearLines) {
      clearAnimate(clears);
    }

    if (!clears && overs && !isOver) {
      over();
    }
  },[matrix, reset])

  function getResult () { 
    // 获取当前方块
    const shape = cur && cur.shape;
    // 获取当前方块的坐标
    const xy = cur && cur.xy;
    // 获取矩阵
    let matrix = props.matrix;
    // 获取是否清除
    // const clearLines = this.state.clearLines;
    if (clearLines) {
      // const animateColor = this.stanimateColor;
     (clearLines as number[]).forEach((index) => {
        // 清除
        matrix = matrix.set(index, List([
          animateColor,
          animateColor,
          animateColor,
          animateColor,
          animateColor,
          animateColor,
          animateColor,
          animateColor,
          animateColor,
          animateColor,
        ]));
      });
    } else if (shape) {
      shape.forEach((m, k1) => (
        m.forEach((n, k2) => {
          if (n && xy.get(0) + k1 >= 0) { // 竖坐标可以为负
            let line = matrix.get(xy.get(0) + k1);
            let color;
            if (line.get(xy.get(1) + k2) === 1 && !clearLines) { // 矩阵与方块重合
              color = 2;
            } else {
              color = 1;
            }
            line = line.set(xy.get(1) + k2, color);
            matrix = matrix.set(xy.get(0) + k1, line);
          }
        })
      ));
    }
    return matrix;
  }

  function clearAnimate (clears) { 
    const anima = (callback) => {
      t(() => {
        setAnimateColor(0)
        t(() => {
          setAnimateColor(2)
          if (typeof callback === 'function') {
            callback();
          }
        }, 100);
      }, 100);
    };
    anima(() => {
      anima(() => {
        anima(() => {
          t(() => {
            if (Array.isArray(clears)) {
              states.clearLines(props.matrix, clears);
            }
          }, 100);
        });
      });
    });
  }

  function over () { 
    let overState = getResult();
    setOverState(overState as List<any>)
    const exLine = (index: number): any => {
      if (index <= 19) {
        overState = (overState as List<any>).set(19 - index, List(fillLine));
      } else if (index >= 20 && index <= 39) {
        overState = (overState as List<any>).set(index - 20, List(blankLine));
      } else {
        states.overEnd();
        return;
      }
      setOverState(overState)
    };

    for (let i = 0; i <= 40; i++) {
      t(exLine(i), 40 * (i + 1));
    }
  }

  let matrixRenders;
  if (isOver) {
    console.log('游戏结束');
    matrixRenders = overState;
  } else {
    matrixRenders = getResult();
  }
  // console.log(`matrixRenders`, matrixRenders)
  return (
    <div className={style.matrix}>{
      matrixRenders && matrixRenders.map((p, k1) => (<p key={k1}>
          {
            p && p.map((e, k2) => <b
              className={classnames({
                c: e === 1,
                d: e === 2,
              })}
              key={k2}
            />)
          }
        </p>))
    }
    </div>
  );
}

export default Matrix
