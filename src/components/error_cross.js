import style from "./error_cross.module.scss";

const ErrorCross = (props) => {
  return (
    <>
      <div>
        <div>
          <div className={`${style["error-cross"]} ${style.error_cross_wrp}`}>
            <div className={`${style["cross-icon"]}`}>
              <span
                className={`${style["icon-line"]} ${style["line-tip"]}`}
              ></span>
              <span
                className={`${style["icon-line"]} ${style["line-long"]}`}
              ></span>
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

export default ErrorCross;
