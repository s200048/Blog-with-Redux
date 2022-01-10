import { AUTH } from "../constants/actionTypes";
import * as api from "../api";

export const signIn = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    alert("Login successfully.");
    history.push("/");
  } catch (err) {
    alert(`signup failed: ${err.response.data.message}`);
    console.log(err.response);
  }
};

export const signUp = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    console.log(data);
    dispatch({ type: AUTH, data });
    alert("Signup successfully.");
    history.push("/");
  } catch (err) {
    alert(`signup failed: ${err.response.data}`);
    // console.log(err.response);
    // console.log(err.request);
  }
};
