import style from "./success_tick.module.scss";
const SuccessTick = (props) => {
  return (
    <>
      <div>
        <div>
          <div
            className={`${style["success-checkmark"]} ${style.success_tick_wrp}`}
          >
            <div className={`${style["check-icon"]}`}>
              <span
                className={`${style["icon-line"]} ${style["line-tip"]}`}
              ></span>
              <span
                className={`${style["icon-line"]} ${style["line-long"]}`}
              ></span>
              <div className={`${style["icon-circle"]}`}></div>
              <div className={`${style["icon-fix"]}`}></div>
            </div>
          </div>
        </div>
        <div className={`${style.text_wrp}`}>
          <p className="text-center">{props.HeadText}</p>
        </div>
      </div>
    </>
  );
};

export default SuccessTick;
