import * as type from '../types'

const categoryAddReducer = (state = { categoryAdd: {} }, action) => {
  switch(action.type){
    case type.CATEGORY_ADD_REQUEST:
      return {loadingCatg: true};
    case type.CATEGORY_ADD_SUCCESS:
      return {loadingCatg: false, success: true, categoryAdd: action.payload};
    case type.CATEGORY_ADD_FAIL:
      return {loading: false, success: false, errorCatg: action.payload};
    default:
      return state;
  }
}

const categoryListReducer = (state = { categories: [] }, action) => {
  switch(action.type){
    case type.CATEGORY_LIST_REQUEST:
      return {loading: true};
    case type.CATEGORY_LIST_SUCCESS:
      return {loading: false, categories: action.payload};
    case type.CATEGORY_LIST_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
}

const categoryListPaginateReducer = (state = { categories: [] }, action) => {
  switch(action.type){
    case type.CATEGORY_LIST_REQUEST:
      return {loadingCategPag: true};
    case type.CATEGORY_LIST_SUCCESS:
      return {loadingCategPag: false, categories: action.payload};
    case type.CATEGORY_LIST_FAIL:
      return {loadingCategPag: false, errorCategPag: action.payload};
    default:
      return state;
  }
}

const categoryUpdateReducer = (state = { categoryUpdt: {} }, action) => {
  switch(action.type){
    case type.CATEGORY_UPDATE_REQUEST:
      return {loadingCategUpdt: true};
    case type.CATEGORY_UPDATE_SUCCESS:
      return {loadingCategUpdt: false, successCategUpdt: true, categoryUpdt: action.payload};
    case type.CATEGORY_UPDATE_FAIL:
      return {loadingCategUpdt: false, successCategUpdt: false, errorCategUpdt: action.payload};
    default:
      return state;
  }
}


const categoryDeleteReducer = (state = {categoryDel: {} }, action) => {
  switch(action.type){
    case type.CATEGORY_DEL_REQUEST:
      return {loadingDelCateg: true};
    case type.CATEGORY_DEL_SUCCESS:
      return {loadingDelCateg: false, successCategDel: true, categoryDel: action.payload};
    case type.CATEGORY_DEL_FAIL:
      return {loadingDelCateg: false, successCategDel: false, errorCategDel: action.payload};
    default:
      return state;
  }
}

export { categoryAddReducer, categoryListReducer, categoryListPaginateReducer, categoryUpdateReducer, categoryDeleteReducer }
