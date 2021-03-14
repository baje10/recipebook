import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import { recipeListReducer, recipeDetailsReducer, recipeUpdateReducer, recipeAddReducer, recipeAddReviewsReducer, recipeListAllReducer, recipeListRateReducer, recipeDeleteReducer } from './reducers/recipeReducers';
import { userRegisterReducer, userLoginReducer } from './reducers/userReducers';
import { categoryAddReducer, categoryListReducer } from './reducers/categoryReducers'
import Cookie from 'js-cookie';

const user = localStorage.getItem('jwt') && Cookie.getJSON('user');
const userInfo = localStorage.getItem('token') && Cookie.getJSON('userInfo');

const initialState = {
  userSignin: { user },
  userRegister: { userInfo },
};

const reducer = combineReducers({
  recipeList: recipeListReducer,
  recipeRate: recipeListRateReducer,
  recipeListAll: recipeListAllReducer,
  recipeDetails: recipeDetailsReducer,
  userRegister: userRegisterReducer,
  userSignin: userLoginReducer,
  recipeUpdate: recipeUpdateReducer,
  addCategory: categoryAddReducer,
  recipeDelete:recipeDeleteReducer,
  listCategories: categoryListReducer,
  addRecipe: recipeAddReducer,
  addReview: recipeAddReviewsReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
