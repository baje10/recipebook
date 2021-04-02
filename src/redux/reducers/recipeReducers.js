import * as type from '../types'

const recipeListReducer = (state = {recipes: [] }, action) => {
  switch(action.type){
    case type.RECIPE_LIST_REQUEST:
      return {loading: true};
    case type.RECIPE_LIST_SUCCESS:
      return {loading: false, recipes: action.payload};
    case type.RECIPE_LIST_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
}

const recipeListRateReducer = (state = {recipes: [] }, action) => {
  switch(action.type){
    case type.RECIPE_LIST_MRATE_REQUEST:
      return {loading: true};
    case type.RECIPE_LIST_MRATE_SUCCESS:
      return {loading: false, recipes: action.payload};
    case type.RECIPE_LIST_MRATE_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
}

const recipeListAllReducer = (state = {recipes: [] }, action) => {
  switch(action.type){
    case type.RECIPE_LIST_ALL_REQUEST:
      return {loading: true};
    case type.RECIPE_LIST_ALL_SUCCESS:
      return {loading: false, recipes: action.payload};
    case type.RECIPE_LIST_ALL_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
}

const recipeAddReducer = (state = { recipe: {} }, action) => {
  switch(action.type){
    case type.RECIPE_ADD_REQUEST:
      return {loadingAdd: true};
    case type.RECIPE_ADD_SUCCESS:
      return {loadingAdd: false, successAdd: true, recipe: action.payload};
    case type.RECIPE_ADD_FAIL:
      return {loadingAdd: false, successAdd: false, errorAdd: action.payload};
    default:
      return state;
  }
}

const recipeUpdateReducer = (state = { recipeUpdt: {} }, action) => {
  switch(action.type){
    case type.RECIPE_UPDATE_REQUEST:
      return {loadingUpdt: true};
    case type.RECIPE_UPDATE_SUCCESS:
      return {loadingUpdt: false, successUpdt: true, recipeUpdt: action.payload};
    case type.RECIPE_UPDATE_FAIL:
      return {loadingUpdt: false, successUpdt: false, errorUpdt: action.payload};
    default:
      return state;
  }
}

const recipeDetailsReducer = (state = {recipe: {} }, action) => {
  switch(action.type){
    case type.RECIPE_DETAIL_REQUEST:
      return {loading: true};
    case type.RECIPE_DETAIL_SUCCESS:
      return {loading: false, recipe: action.payload};
    case type.RECIPE_DETAIL_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
}

const recipeDeleteReducer = (state = {recipeDel: {} }, action) => {
  switch(action.type){
    case type.RECIPE_DELETE_REQUEST:
      return {loadingDel: true};
    case type.RECIPE_DELETE_SUCCESS:
      return {loadingDel: false, successDel: true, recipeDel: action.payload};
    case type.RECIPE_DELETE_FAIL:
      return {loadingDel: false, successDel: false, errorDel: action.payload};
    default:
      return state;
  }
}

const recipeAddReviewsReducer = (state = {}, action) => {
   switch (action.type)  {
   case type.RECIPE_REVIEWS_ADD_REQUEST:
     return { loading: true };
   case type.RECIPE_REVIEWS_ADD_SUCCESS:
     return { loading: false, review: action.payload, success: true };
   case type.RECIPE_REVIEWS_ADD_FAIL:
     return { loading: false, errorReview: action.payload };
   case type.RECIPE_REVIEWS_ADD_RESET:
     return {};
   default:
     return state;
  }
}

export { recipeListReducer, recipeDetailsReducer, recipeAddReducer, recipeUpdateReducer, recipeAddReviewsReducer, recipeListAllReducer, recipeListRateReducer, recipeDeleteReducer }
