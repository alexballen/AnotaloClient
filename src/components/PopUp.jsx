import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closingPopUp } from "../redux/actions/popUp";
import s from "./PopUp.module.css";

const PopUp = ({ value, Component, title }) => {
  const dispatch = useDispatch();

  const { popUpClose } = useSelector((state) => state.popUpClose);
  console.log(popUpClose);

  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
    dispatch(closingPopUp(true));
  };

  const closePopup = () => {
    setShowPopup(false);
    dispatch(closingPopUp(false));
  };

  return (
    <>
      <div>
        <button onClick={openPopup}>{`${title}`}</button>
      </div>
      <div className={`${s.popup} ${showPopup ? s.show : ""}`}>
        <button
          className={s.cerrar}
          onClick={closePopup}
          style={{ display: popUpClose ? "block" : "none" }}
        >
          Cerrar
        </button>
        <Component {...value} />
      </div>
    </>
  );
};

export default PopUp;
