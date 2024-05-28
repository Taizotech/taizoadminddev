import style from "./modal_popup.module.css";
const ModalContainer = (props) => {
  return (
    <>
      <div
        style={{ zIndex: props.zIndex ? props.zIndex : 1000 }}
        className={`${style.popup_container}`}
      >
        <div className={style.popup_body}>
          <div>{props.childComponent}</div>
        </div>
      </div>
    </>
  );
};

export default ModalContainer;
