/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
// import Immutable from 'immutable';
// import propTypes from 'prop-types';

import style from "./index.module.less";
import Button from "./button";
import store from "../../store";
import todo from "../../control/todo";
import { i18nData as i18n, lan } from "../../unit/const";

interface KeyboardProps {
  filling: number;
  keyboard: any;
}
interface SelfType {
  [key: string]: any;
}

const self: SelfType = {};
const Keyboard: React.FC<KeyboardProps> = (props) => {
  useEffect(() => {
    const touchEventCatch = {}; // 对于手机操作, 触发了touchstart, 将作出记录, 不再触发后面的mouse事件

    // 在鼠标触发mousedown时, 移除元素时可以不触发mouseup, 这里做一个兼容, 以mouseout模拟mouseup
    const mouseDownEventCatch = {};
    document.addEventListener(
      "touchstart",
      (e) => {
        if (e.preventDefault) {
          e.preventDefault();
        }
      },
      true
    );

    // 解决issue: https://github.com/chvin/react-tetris/issues/24
    document.addEventListener(
      "touchend",
      (e) => {
        if (e.preventDefault) {
          e.preventDefault();
        }
      },
      true
    );

    // 阻止双指放大
    document.addEventListener("gesturestart", (event) => {
      if (event.preventDefault) {
        event.preventDefault();
      }
    });

    document.addEventListener(
      "mousedown",
      (e) => {
        if (e.preventDefault) {
          e.preventDefault();
        }
      },
      true
    );

    Object.keys(todo).forEach((key) => {
      self[`dom_${key}`].addEventListener(
        "mousedown",
        () => {
          if (touchEventCatch[key] === true) {
            return;
          }
          todo[key].down(store);
          mouseDownEventCatch[key] = true;
        },
        true
      );

      self[`dom_${key}`].addEventListener(
        "mouseup",
        () => {
          if (touchEventCatch[key] === true) {
            touchEventCatch[key] = false;
            return;
          }
          todo[key].up(store);
          mouseDownEventCatch[key] = false;
        },
        true
      );

      self[`dom_${key}`].addEventListener(
        "mouseout",
        () => {
          if (mouseDownEventCatch[key] === true) {
            todo[key].up(store);
          }
        },
        true
      );

      self[`dom_${key}`].addEventListener(
        "touchstart",
        () => {
          touchEventCatch[key] = true;
          todo[key].down(store);
        },
        true
      );

      self[`dom_${key}`].addEventListener(
        "touchend",
        () => {
          todo[key].up(store);
        },
        true
      );
    });
  }, []);
  // 由于键盘事件触发频繁, 这里使用memo, 减少不必要的render
  // shouldComponentUpdate({ keyboard, filling }) {
  //   return !Immutable.is(keyboard, self.props.keyboard) || filling !== self.props.filling;
  // }
  const keyboard = props.keyboard;
  return (
    <div
      className={style.keyboard}
      style={{
        marginTop: 20 + props.filling,
      }}
    >
      <Button
        color="blue"
        size="s1"
        top={0}
        left={374}
        label={i18n.rotation[lan]}
        arrow="translate(0, 63px)"
        position
        active={keyboard.get("rotate")}
        ref={(c) => {
          self.dom_rotate = c;
        }}
      />
      <Button
        color="blue"
        size="s1"
        top={180}
        left={374}
        label={i18n.down[lan]}
        arrow="translate(0,-71px) rotate(180deg)"
        active={keyboard.get("down")}
        ref={(c) => {
          self.dom_down = c;
        }}
      />
      <Button
        color="blue"
        size="s1"
        top={90}
        left={284}
        label={i18n.left[lan]}
        arrow="translate(60px, -12px) rotate(270deg)"
        active={keyboard.get("left")}
        ref={(c) => {
          self.dom_left = c;
        }}
      />
      <Button
        color="blue"
        size="s1"
        top={90}
        left={464}
        label={i18n.right[lan]}
        arrow="translate(-60px, -12px) rotate(90deg)"
        active={keyboard.get("right")}
        ref={(c) => {
          self.dom_right = c;
        }}
      />
      <Button
        color="blue"
        size="s0"
        top={100}
        left={52}
        label={`${i18n.drop[lan]} (SPACE)`}
        active={keyboard.get("drop")}
        ref={(c) => {
          self.dom_space = c;
        }}
      />
      <Button
        color="red"
        size="s2"
        top={0}
        left={196}
        label={`${i18n.reset[lan]}(R)`}
        active={keyboard.get("reset")}
        ref={(c) => {
          self.dom_r = c;
        }}
      />
      <Button
        color="green"
        size="s2"
        top={0}
        left={106}
        label={`${i18n.sound[lan]}(S)`}
        active={keyboard.get("music")}
        ref={(c) => {
          self.dom_s = c;
        }}
      />
      <Button
        color="green"
        size="s2"
        top={0}
        left={16}
        label={`${i18n.pause[lan]}(P)`}
        active={keyboard.get("pause")}
        ref={(c) => {
          self.dom_p = c;
        }}
      />
    </div>
  );
};

// 等待使用React.memo进行优化看看
export default Keyboard;
