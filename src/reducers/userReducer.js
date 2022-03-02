import { ContactsOutlined } from "@mui/icons-material";
import userTypes from "../actionTypes/userTypes";

export const INITIAL_STATE = {
  _id: null,
  photo: null,
  userName: null,
  token: null,
  following: [],
  followres: [],
  fetching: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SIGN_UP_START:
    case userTypes.SIGN_IN_START: {
      return { ...state, error: false, fetching: true };
    }

    case userTypes.SIGN_IN_SUCCESS: {
      return {
        ...action.payload,
        fetching: false,
      };
    }
    case userTypes.SIGN_UP_FAILURE:
    case userTypes.SIGN_IN_FAILURE: {
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    }
    case userTypes.SIGN_OUT: {
      localStorage.clear();
      sessionStorage.clear();
      return null;
    }

    default:
      return state;
  }
};

export default userReducer;
