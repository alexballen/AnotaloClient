import { popUpClose } from "../reducers/popUpSlice";

export const closingPopUp = (currentViewPopupWindow) => (dispatch) => {
  try {
    dispatch(popUpClose(currentViewPopupWindow));
  } catch (error) {
    console.log(error);
  }
};
