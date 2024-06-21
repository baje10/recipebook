import * as type from '../types'

const ingredientAddReducer = (state = { ingredientAdd: {} }, action) => {
  switch(action.type){
    case type.INGREDIENT_ADD_REQUEST:
      return {loadingIngrd: true};
    case type.INGREDIENT_ADD_SUCCESS:
      return {loadingIngrd: false, successAddIngrd: true, ingredientAdd: action.payload};
    case type.INGREDIENT_ADD_FAIL:
      return {loading: false, successAddIngrd: false, errorIngrd: action.payload};
    default:
      return state;
  }
}

const ingredientListReducer = (state = { ingredients: [] }, action) => {
  switch(action.type){
    case type.INGREDIENT_LIST_REQUEST:
      return {loadingIngrdList: true};
    case type.INGREDIENT_LIST_SUCCESS:
      return {loadingIngrdList: false, ingredients: action.payload};
    case type.INGREDIENT_LIST_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
}

const ingredientDeleteReducer = (state = {ingredientDel: {} }, action) => {
  switch(action.type){
    case type.INGREDIENT_DELETE_REQUEST:
      return {loadingDelIngrd: true};
    case type.INGREDIENT_DELETE_SUCCESS:
      return {loadingDelIngrd: false, successDelIngrd: true, ingredientDel: action.payload};
    case type.INGREDIENT_DELETE_FAIL:
      return {loadingDelIngrd: false, successDelIngrd: false, errorDelIngrd: action.payload};
    default:
      return state;
  }
}

const ingredientUpdateReducer = (state = { ingredientUpdt: {} }, action) => {
  switch(action.type){
    case type.INGREDIENT_UPDATE_REQUEST:
      return {loadingUpdtIngrd: true};
    case type.INGREDIENT_UPDATE_SUCCESS:
      return {loadingUpdtIngrd: false, successUpdtIngrd: true, ingredientUpdt: action.payload};
    case type.INGREDIENT_UPDATE_FAIL:
      return {loadingUpdtIngrd: false, successUpdtIngrd: false, errorUpdtIngrd: action.payload};
    default:
      return state;
  }
}

export { ingredientAddReducer, ingredientListReducer, ingredientDeleteReducer, ingredientUpdateReducer }
