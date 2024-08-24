import React from "react";
import cn from "classnames";

import style from "./index.module.less";

interface MusicProps {
  data: boolean;
}

const Music: React.FC<MusicProps> = ({ data }) => {
  return (
    <div
      className={cn({
        bg: true,
        [style.music]: true,
        [style.c]: !data,
      })}
    />
  );
};

export default Music;
