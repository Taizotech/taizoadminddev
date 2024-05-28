import style from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <>
      <div className="text-center mt-5">
        <h3 className={`${style.error_text}`}>404 Not Found</h3>
      </div>
    </>
  );
};

export default NotFound;
