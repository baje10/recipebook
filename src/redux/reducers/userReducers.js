import * as type from '../types'

const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case type.USER_SIGNUP_REQUEST:
      return { loading: true };
    case type.USER_SIGNUP_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case type.USER_SIGNUP_FAIL:
      return { loading: false, error: action.payload };
    case type.USER_SIGNOUT:
      return {};
    default: return state;
  }
}

const userLoginReducer = (state = {}, action, error) => {
  switch (action.type) {
    case type.USER_SIGNIN_REQUEST:
      return { loading: true };
    case type.USER_SIGNIN_SUCCESS:
      return { loading: false, user: action.payload };
    case type.USER_SIGNIN_FAIL:
      return { loading: false, error:action.payload };
    case type.USER_SIGNOUT:
      return {};
    default: return state;
  }
}


export { userRegisterReducer, userLoginReducer };
