import React from "react";
import style from "./DetailsContainer.module.scss";
const DetailsContainer = (props) => {
  return (
    <div>
      <div
        style={{ zIndex: props.zIndex ? props.zIndex : 1000 }}
        className={`${style.popup_container}`}
      >
        <div >
            <div className={style.popup_header}><div>{props.topComponent}</div></div>
          

          <div className={style.popup_body}>
            <div>{props.childComponent}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsContainer;
