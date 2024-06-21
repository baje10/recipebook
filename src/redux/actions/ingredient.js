import axios from 'axios';
import * as types from '../types';

export const addIngredient = (payload) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.INGREDIENT_ADD_REQUEST, payload: { payload } })

    const { userSignin: { user }, } = getState();

    const { data } = await axios.post(
      '/api/ingredient/create/' + user._id,
      payload,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    dispatch({ type: types.INGREDIENT_ADD_SUCCESS, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    dispatch({ type: types.INGREDIENT_ADD_FAIL, payload: error.response.data.error });
  }
};

export const detailsIngredient = (ingredientById) => async (dispatch) => {
  try {
    dispatch({type: types.INGREDIENT_DETAIL_REQUEST, payload: ingredientById});
    const {data} = await axios.get('/api/ingredient/get/' + ingredientById);
    dispatch({type: types.INGREDIENT_DETAIL_SUCCESS, payload: data});
    return data
  }
  catch(error){
    dispatch({type: types.INGREDIENT_DETAIL_FAIL, payload: error.message});
  }
}

export const listAllIngredients = () => async (dispatch) => {
  try{
    dispatch({type: types.INGREDIENT_LIST_REQUEST});
    const { data } = await axios.get('/api/ingredient');
    dispatch({type: types.INGREDIENT_LIST_SUCCESS, payload: data});
    return data
  }
  catch(error){
    dispatch({type: types.INGREDIENT_LIST_FAIL, payload: error.message})
  }
}

export const updateIngredient = (payload) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.INGREDIENT_UPDATE_REQUEST, payload: { payload } });

    const { userSignin: { user }, } = getState();

    const { data } = await axios.put(
      `/api/ingredient/update/${payload.id}/${user._id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    dispatch({ type: types.INGREDIENT_UPDATE_SUCCESS, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    dispatch({ type: types.INGREDIENT_UPDATE_FAIL, payload: error.response.data.error });
  }
};

export const deleteIngredient = (ingredientById) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { user },
    } = getState();
    dispatch({ type: types.INGREDIENT_DELETE_REQUEST, payload: ingredientById });
    const { data } = await axios.delete(`/api/ingredient/delete/${ingredientById}/${user._id}`, {
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    });
    dispatch({ type: types.INGREDIENT_DELETE_SUCCESS, payload: data});
    return data
  } catch (error) {
    dispatch({ type: types.INGREDIENT_DELETE_FAIL, payload: error.message });
  }
};
