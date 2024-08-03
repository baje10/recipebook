import React, { useEffect, useState, useCallback } from 'react';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { rbook } from '../redux/combineActions';

//material-ui
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Select from '@material-ui/core/Select';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Pagination from "@material-ui/lab/Pagination";
import ListIcon from '@material-ui/icons/List';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import { useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width:'58rem',
  },
  paper1: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width:'58rem',
    height: "100%",
    overflow: "scroll"
  },
  textField: {
    marginTop: '3%',
    marginBottom: '3%',
    width: '100%',
    '& label.Mui-focused': {
      color: '#FF3F16',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#FF3F16',
    },
  },
  textField1: {
    marginTop: '3%',
    marginBottom: '3%',
    width: '50%',
    '& label.Mui-focused': {
      color: '#FF3F16',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#FF3F16',
    },
  },
  table: {
    width: '28rem',
  },
  paper2: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth:'100%',
    height: "100%",
    overflow: "scroll"
  },
  paper2LowReso: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth:'25rem',
    height: "100%",
    overflow: "scroll"
  },
  paper3: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width:'58rem',
    height: "100%",
    overflow: "scroll"
  },
  tableCell: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    width: "15rem",
    display: "block",
    overflow: "hidden"
  },
  tableCell1: {
    //whiteSpace: "nowrap",
    //textOverflow: "ellipsis",
    width: "10rem",
    //display: "block",
    //overflow: "hidden"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}));

const AdminPage = () => {
  const lowReso = useMediaQuery('(max-width: 718px)');

  const [openModalCategory, setOpenModalCategory] = useState(false);
  const [openModalRecipe, setOpenModalRecipe] = useState(false);
  const [openModalRecipeList, setOpenModalRecipeList] = useState(false);
  const [openModalIngredientsList, setOpenModalIngredientsList] = useState(false);
  const [openModalCategoryList, setOpenModalCategoryList] = useState(false);
  const [openModalIngredientAdd , setOpenModalIngredientAdd] = useState(false);
  const [openModalRecipeUpdate, setOpenModalRecipeUpdate] = useState(false);
  const [openModalIngredientUpdate, setOpenModalIngredientUpdate] = useState(false);
  const [openModalCategoryUpdate, setOpenModalCategoryUpdate] = useState(false);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [openSnackBarForAdd, setOpenSnackBarForAdd] = useState(false);
  const [openSnackBarForDel, setOpenSnackBarForDel] = useState(false);
  const [openSnackBarForUpdt, setOpenSnackBarForUpdt] = useState(false);

  const [openSnackBarForAddIng, setOpenSnackBarForAddIng] = useState(false);
  const [openSnackBarForDelIng, setOpenSnackBarForDelIng] = useState(false);
  const [openSnackBarForUpdtIng, setOpenSnackBarForUpdtIng] = useState(false);

  const [searchKeywordIng, setSearchKeywordIng] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchKeywordCat, setSearchKeywordCat] = useState('');

  const [categList, setCategList] = useState([]);
  const [categListPaginate, setCategListPaginate] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [ingredientsListPaginate, setIngredientsListPaginate] = useState([]);

  const [id, setId] = useState('');
  const [ingredientName, setIngredientName] = useState('');
  const [measurementCosting, setMeasurementCosting] = useState('');
  const [ingredientPrice, setIngredientPrice] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState([]);

  const [ingredients, setIngredients] = useState('');
  const [ingredients1, setIngredients1] = useState('');
  const [ingredients2, setIngredients2] = useState('');
  const [ingredients3, setIngredients3] = useState('');
  const [ingredients4, setIngredients4] = useState('');
  const [ingredients5, setIngredients5] = useState('');
  const [ingredients6, setIngredients6] = useState('');
  const [ingredients7, setIngredients7] = useState('');
  const [ingredients8, setIngredients8] = useState('');
  const [ingredients9, setIngredients9] = useState('');
  const [ingredients10, setIngredients10] = useState('');

  const [ingredients11, setIngredients11] = useState('');
  const [ingredients12, setIngredients12] = useState('');
  const [ingredients13, setIngredients13] = useState('');
  const [ingredients14, setIngredients14] = useState('');
  const [ingredients15, setIngredients15] = useState('');
  const [ingredients16, setIngredients16] = useState('');
  const [ingredients17, setIngredients17] = useState('');
  const [ingredients18, setIngredients18] = useState('');
  const [ingredients19, setIngredients19] = useState('');

  const [ingredients20, setIngredients20] = useState('');
  const [ingredients21, setIngredients21] = useState('');
  const [ingredients22, setIngredients22] = useState('');
  const [ingredients23, setIngredients23] = useState('');
  const [ingredients24, setIngredients24] = useState('');
  const [ingredients25, setIngredients25] = useState('');

  const [instruction, setInstruction] = useState('');
  const [instruction1, setInstruction1] = useState('');
  const [instruction2, setInstruction2] = useState('');
  const [instruction3, setInstruction3] = useState('');
  const [instruction4, setInstruction4] = useState('');
  const [instruction5, setInstruction5] = useState('');
  const [instruction6, setInstruction6] = useState('');
  const [instruction7, setInstruction7] = useState('');
  const [instruction8, setInstruction8] = useState('');
  const [instruction9, setInstruction9] = useState('');
  const [instruction10, setInstruction10] = useState('');

  const [instruction11, setInstruction11] = useState('');
  const [instruction12, setInstruction12] = useState('');
  const [instruction13, setInstruction13] = useState('');
  const [instruction14, setInstruction14] = useState('');
  const [instruction15, setInstruction15] = useState('');
  const [instruction16, setInstruction16] = useState('');
  const [instruction17, setInstruction17] = useState('');
  const [instruction18, setInstruction18] = useState('');
  const [instruction19, setInstruction19] = useState('');

  const [instruction20, setInstruction20] = useState('');
  const [instruction21, setInstruction21] = useState('');
  const [instruction22, setInstruction22] = useState('');
  const [instruction23, setInstruction23] = useState('');
  const [instruction24, setInstruction24] = useState('');
  const [instruction25, setInstruction25] = useState('');

  const [measurement, setMeasurement] = useState('');
  const [measurement1, setMeasurement1] = useState('');
  const [measurement2, setMeasurement2] = useState('');
  const [measurement3, setMeasurement3] = useState('');
  const [measurement4, setMeasurement4] = useState('');
  const [measurement5, setMeasurement5] = useState('');
  const [measurement6, setMeasurement6] = useState('');
  const [measurement7, setMeasurement7] = useState('');
  const [measurement8, setMeasurement8] = useState('');
  const [measurement9, setMeasurement9] = useState('');
  const [measurement10, setMeasurement10] = useState('');

  const [measurement11, setMeasurement11] = useState('');
  const [measurement12, setMeasurement12] = useState('');
  const [measurement13, setMeasurement13] = useState('');
  const [measurement14, setMeasurement14] = useState('');
  const [measurement15, setMeasurement15] = useState('');
  const [measurement16, setMeasurement16] = useState('');
  const [measurement17, setMeasurement17] = useState('');
  const [measurement18, setMeasurement18] = useState('');
  const [measurement19, setMeasurement19] = useState('');

  const [measurement20, setMeasurement20] = useState('');
  const [measurement21, setMeasurement21] = useState('');
  const [measurement22, setMeasurement22] = useState('');
  const [measurement23, setMeasurement23] = useState('');
  const [measurement24, setMeasurement24] = useState('');
  const [measurement25, setMeasurement25] = useState('');


  const [photo, setPhoto] = useState('');
  const [photo1, setPhoto1] = useState('');

  const [ingredientId, setIngredientId] = useState('');
  const [categoryId, setCategoryId] = useState('');


  //state for list Recipes
  const [recipeList, setRecipeList] = useState([]);
  const [pageDetails, setPageDetails] = useState(null);
  const [pageDetailsCat, setPageDetailsCat] = useState(null);
  const [pageDetailsIng, setPageDetailsIng] = useState(null);
  const [pageSize] = useState(7);

  const [showIngredient4, setShowIngredient4] = useState(false);
  const [showIngredient5, setShowIngredient5] = useState(false);
  const [showIngredient6, setShowIngredient6] = useState(false);
  const [showIngredient7, setShowIngredient7] = useState(false);
  const [showIngredient8, setShowIngredient8] = useState(false);
  const [showIngredient9, setShowIngredient9] = useState(false);
  const [showIngredient10, setShowIngredient10] = useState(false);
  const [showIngredient11, setShowIngredient11] = useState(false);
  const [showIngredient12, setShowIngredient12] = useState(false);
  const [showIngredient13, setShowIngredient13] = useState(false);
  const [showIngredient14, setShowIngredient14] = useState(false);
  const [showIngredient15, setShowIngredient15] = useState(false);
  const [showIngredient16, setShowIngredient16] = useState(false);
  const [showIngredient17, setShowIngredient17] = useState(false);
  const [showIngredient18, setShowIngredient18] = useState(false);
  const [showIngredient19, setShowIngredient19] = useState(false);
  const [showIngredient20, setShowIngredient20] = useState(false);
  const [showIngredient21, setShowIngredient21] = useState(false);
  const [showIngredient22, setShowIngredient22] = useState(false);
  const [showIngredient23, setShowIngredient23] = useState(false);
  const [showIngredient24, setShowIngredient24] = useState(false);
  const [showIngredient25, setShowIngredient25] = useState(false);
  const [showIngredient26, setShowIngredient26] = useState(false);

  const [showInstruction4, setShowInstruction4] = useState(false);
  const [showInstruction5, setShowInstruction5] = useState(false);
  const [showInstruction6, setShowInstruction6] = useState(false);
  const [showInstruction7, setShowInstruction7] = useState(false);
  const [showInstruction8, setShowInstruction8] = useState(false);
  const [showInstruction9, setShowInstruction9] = useState(false);
  const [showInstruction10, setShowInstruction10] = useState(false);
  const [showInstruction11, setShowInstruction11] = useState(false);
  const [showInstruction12, setShowInstruction12] = useState(false);
  const [showInstruction13, setShowInstruction13] = useState(false);
  const [showInstruction14, setShowInstruction14] = useState(false);
  const [showInstruction15, setShowInstruction15] = useState(false);
  const [showInstruction16, setShowInstruction16] = useState(false);
  const [showInstruction17, setShowInstruction17] = useState(false);
  const [showInstruction18, setShowInstruction18] = useState(false);
  const [showInstruction19, setShowInstruction19] = useState(false);
  const [showInstruction20, setShowInstruction20] = useState(false);
  const [showInstruction21, setShowInstruction21] = useState(false);
  const [showInstruction22, setShowInstruction22] = useState(false);
  const [showInstruction23, setShowInstruction23] = useState(false);
  const [showInstruction24, setShowInstruction24] = useState(false);
  const [showInstruction25, setShowInstruction25] = useState(false);
  const [showInstruction26, setShowInstruction26] = useState(false);

  const { loadingCatg, categoryAdd, errorCatg, success } = useSelector(state => state.addCategory);
  const { loadingCategPag, errorCategPag } = useSelector(state => state.categoryPaginate);
  const { loadingCategUpdt, categoryUpdt, errorCategUpdt, successCategUpdt } = useSelector(state => state.categoryUpdt);
  const { loadingDelCateg, errorCategDel, successCategDel } = useSelector(state => state.categoryDel);
  const { loadingIngrd, ingredientAdd, errorIngrd, successAddIngrd } = useSelector(state => state.addIngredient);
  const { user } = useSelector((state) => state.userSignin);
  const { loadingAdd, recipe, errorAdd, successAdd } = useSelector(state => state.addRecipe);
  const { loadingUpdt, recipeUpdt, errorUpdt, successUpdt } = useSelector(state => state.recipeUpdate);
  const { loadingUpdtIngrd, ingredientUpdt, errorUpdtIngrd, successUpdtIngrd } = useSelector(state => state.updateIngredient);
  const { loadingDel, errorDel, successDel } = useSelector(state => state.recipeDelete);
  const { loadingDelIngrd, errorDelIngrd, successDelIngrd } = useSelector(state => state.deleteIngredient);
  const { loading, error } = useSelector(state => state.recipeListAll);

  const dispatch = useDispatch();
  const classes = useStyles();
  const recipeBy = user.name;

  const handleIngredientsList = useCallback(() => {
      dispatch(rbook.ingredient.listAllIngredients())
        .then((data) => {
          if (data) {
            setIngredientsList(data);
          }
        })
    },
    [dispatch],
  );

  const handleIngredientsListPaginate = useCallback(
    (pageIndex = 1, searchKeywordIng) => {
      dispatch(rbook.ingredient.listAllIngredientsPaginate(pageIndex, pageSize, searchKeywordIng))
        .then((data) => {
          if (data) {
            setIngredientsListPaginate(data.docs);
            setPageDetailsIng({
              pageIndex: data.page,
              pageSize: data.limit,
              totalPages: data.totalPages,
              totalDocs: data.totalDocs
            });
          }
        })
    },
    [dispatch, pageSize],
  );


  const handleRecipeList = useCallback(
    (pageIndex = 1, searchKeyword) => {
      dispatch(rbook.recipe.listAllRecipes(pageIndex, pageSize, searchKeyword))
        .then((data) => {
          if (data) {
            setRecipeList(data.docs);
            setPageDetails({
              pageIndex: data.page,
              pageSize: data.limit,
              totalPages: data.totalPages,
              totalDocs: data.totalDocs,
            });
          }
        });
    },
    [dispatch, pageSize],
  );

  const handleCategoryListPaginate = useCallback(
    (pageIndex = 1, searchKeywordCat) => {
      dispatch(rbook.category.listAllCategorysPaginate(pageIndex, pageSize, searchKeywordCat))
        .then((data) => {
          if (data) {
            setCategListPaginate(data.docs);
            setPageDetailsCat({
              pageIndex: data.page,
              pageSize: data.limit,
              totalPages: data.totalPages,
              totalDocs: data.totalDocs,
            });
          }
        });
    },
    [dispatch, pageSize],
  );

  const submitHandlerForSearch = (event) => {
    event.preventDefault();
    handleRecipeList(1, searchKeyword);
  };

  const submitHandlerForSearchIng = (event) => {
    event.preventDefault();
    console.log('SearchKeywordIng', searchKeywordIng)
    handleIngredientsListPaginate(1, searchKeywordIng);
  };

  const submitHandlerForSearchCat = (event) => {
    event.preventDefault();
    handleCategoryListPaginate(1, searchKeywordCat);
  };


  const handleCategoryList = useCallback(
    () => {
      dispatch(rbook.category.listCategories())
        .then((data) => {
          if (data) {
            setCategList(data);
          }
        })
    },
    [dispatch],
  );

  useEffect(() => {
    if (categoryAdd) {
      //
    }
    return () => {
      //
    };
  }, [categoryAdd]);

  useEffect(() => {
    if (ingredientAdd) {
      //
    }
    return () => {
      //
    };
  }, [ingredientAdd]);

  useEffect(() => {
    if (recipe) {
      //
    }
    return () => {
      //
    };
  }, [recipe]);

  useEffect(() => {
   handleCategoryList();
  }, [handleCategoryList]);

  useEffect(() => {
    handleRecipeList();
  }, [handleRecipeList]);

  useEffect(() => {
    handleIngredientsList();
  }, [handleIngredientsList]);

  useEffect(() => {
    handleIngredientsListPaginate();
  }, [handleIngredientsListPaginate]);

  useEffect(() => {
    handleCategoryListPaginate();
  }, [handleCategoryListPaginate]);

  const handleChangePageIndex = (event, value) => {
    handleRecipeList(value);
  };

  const handleChangePageIndexIng = (event, value) => {
    console.log('VALYU', value)
    handleIngredientsListPaginate(value);
  };

  const handleChangePageIndexCat = (event, value) => {
    console.log('VALYU', value)
    handleCategoryListPaginate(value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const payload = { name, photo }
    dispatch(rbook.category.addCategory(payload)).then((data) => {
      if (data) {
        handleCategoryList();
        handleCategoryListPaginate();
      }
    });
    setOpenSnackBar(true);
    setOpenModalCategory(false);
  }

  const submitHandlerIngredient = (event) => {
    event.preventDefault();
    const parsedIngredientPrice = parseInt(ingredientPrice);
    const payload = { name: ingredientName, measurementCosting, price: parsedIngredientPrice }
    dispatch(rbook.ingredient.addIngredient(payload)).then((data) => {
      if (data) {
        console.log("SUCCESSORRRR")
        handleIngredientsListPaginate();
      }
    });
    setOpenSnackBarForAddIng(true);
    setOpenModalIngredientsList(false);
  }

  const submitHandlerForCategoryUpdate = (event) => {
    event.preventDefault();
    const payload = {
      id: categoryId,
      name
    }

    if (photo) {
      payload.photo = photo;
    }

    dispatch(rbook.category.updateCategory(payload)).then((data) => {
      if (data) {
        handleCategoryListPaginate();
        handleCategoryList();
      }
    });
    setOpenModalCategoryUpdate(false);
  }

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const submitHandlerForRecipe = (event) => {
    const categoryToString = category.toString();
    event.preventDefault();
    const payload = {
      name,
      description,
      category: categoryToString,
      recipeBy,
      ingredients,
      ingredients1,
      ingredients2,
      ingredients3,
      ingredients4,
      ingredients5,
      ingredients6,
      ingredients7,
      ingredients8,
      ingredients9,
      ingredients10,
      ingredients11,
      ingredients12,
      ingredients13,
      ingredients14,
      ingredients15,
      ingredients16,
      ingredients17,
      ingredients18,
      ingredients19,
      ingredients20,
      ingredients21,
      ingredients22,
      ingredients23,
      ingredients24,
      ingredients25,
      measurement,
      measurement1,
      measurement2,
      measurement3,
      measurement4,
      measurement5,
      measurement6,
      measurement7,
      measurement8,
      measurement9,
      measurement10,
      measurement11,
      measurement12,
      measurement13,
      measurement14,
      measurement15,
      measurement16,
      measurement17,
      measurement18,
      measurement19,
      measurement20,
      measurement21,
      measurement22,
      measurement23,
      measurement24,
      measurement25,
      instruction,
      instruction1,
      instruction2,
      instruction3,
      instruction4,
      instruction5,
      instruction6,
      instruction7,
      instruction8,
      instruction9,
      instruction10,
      instruction11,
      instruction12,
      instruction13,
      instruction14,
      instruction15,
      instruction16,
      instruction17,
      instruction18,
      instruction19,
      instruction20,
      instruction21,
      instruction22,
      instruction23,
      instruction24,
      instruction25,
      photo,
      photo1
    }
    dispatch(rbook.recipe.addRecipe(payload)).then((data) => {
      if (data) {
        handleRecipeList();
      }
    });
    setOpenSnackBarForAdd(true);
    setOpenModalRecipe(false);
  }

  const submitHandlerForRecipeUpdate = (event) => {
    const categoryToString = category.toString();
    event.preventDefault();
    const payload = {
      id,
      name,
      description,
      category: categoryToString,
      recipeBy,
      ingredients,
      ingredients1,
      ingredients2,
      ingredients3,
      ingredients4,
      ingredients5,
      ingredients6,
      ingredients7,
      ingredients8,
      ingredients9,
      ingredients10,
      ingredients11,
      ingredients12,
      ingredients13,
      ingredients14,
      ingredients15,
      ingredients16,
      ingredients17,
      ingredients18,
      ingredients19,
      ingredients20,
      ingredients21,
      ingredients22,
      ingredients23,
      ingredients24,
      ingredients25,
      measurement,
      measurement1,
      measurement2,
      measurement3,
      measurement4,
      measurement5,
      measurement6,
      measurement7,
      measurement8,
      measurement9,
      measurement10,
      measurement11,
      measurement12,
      measurement13,
      measurement14,
      measurement15,
      measurement16,
      measurement17,
      measurement18,
      measurement19,
      measurement20,
      measurement21,
      measurement22,
      measurement23,
      measurement24,
      measurement25,
      instruction,
      instruction1,
      instruction2,
      instruction3,
      instruction4,
      instruction5,
      instruction6,
      instruction7,
      instruction8,
      instruction9,
      instruction10,
      instruction11,
      instruction12,
      instruction13,
      instruction14,
      instruction15,
      instruction16,
      instruction17,
      instruction18,
      instruction19,
      instruction20,
      instruction21,
      instruction22,
      instruction23,
      instruction24,
      instruction25,
      //photo,
      //photo1
    }

    if (photo) {
      payload.photo = photo;
    }
  
    if (photo1) {
      payload.photo1 = photo1;
    }


    dispatch(rbook.recipe.updateRecipe(payload)).then((data) => {
      if (data) {
        handleRecipeList();
      }
    });
    setOpenSnackBarForUpdt(true);
    setOpenModalRecipeUpdate(false);
  }

  const submitHandlerForIngredientUpdate = (event) => {
    event.preventDefault();
    const payload = {
      id: ingredientId,
      name: ingredientName,
      measurementCosting,
      price: ingredientPrice,
    }

    dispatch(rbook.ingredient.updateIngredient(payload)).then((data) => {
      if (data) {
        handleIngredientsList();
        handleIngredientsListPaginate();
      }
    });
    setOpenSnackBarForUpdtIng(true);
    setOpenModalIngredientUpdate(false);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
    setOpenSnackBarForDel(false);
    setOpenSnackBarForAdd(false);
    setOpenSnackBarForUpdt(false);
    setOpenSnackBarForAddIng(false);
    setOpenSnackBarForDelIng(false);
    setOpenSnackBarForUpdtIng(false);
  };


  //modal for add category
  const handleOpenModalCategory = () => {
    setOpenModalCategory(true);
  };

  //modal for add category
  const handleOpenModalCategoryList = () => {
    setOpenModalCategoryList(true);
  };


  const handleCloseModalCategory = () => {
    setOpenModalCategory(false);
  };

  //modal for add recipe
  const handleOpenModalRecipe = () => {
    setOpenModalRecipe(true);
  };

  const handleCloseModalRecipe = () => {
    setOpenModalRecipe(false);
  };

  //modal for recipeList
  const handleOpenModalRecipeList = () => {
    setOpenModalRecipeList(true);
  };

  //modal for ingredientList
  const handleOpenModalIngredientsList = () => {
    setOpenModalIngredientsList(true);
  };

  const handleOpenModalIngredientAdd = () => {
    setOpenModalIngredientAdd(true);
  };

  //modal for recipe edit Modal
  const handleOpenModalRecipeUpdate = (recipe) => {
    setOpenModalRecipeUpdate(true);
    setId(recipe._id);
    setName(recipe.name);
    setDescription(recipe.description);
    setCategory(recipe.category);
    setIngredients(recipe.ingredients);
    setIngredients1(recipe.ingredients1);
    setIngredients2(recipe.ingredients2);
    setIngredients3(recipe.ingredients3);
    setIngredients4(recipe.ingredients4);
    setIngredients5(recipe.ingredients5);
    setIngredients6(recipe.ingredients6);
    setIngredients7(recipe.ingredients7);
    setIngredients8(recipe.ingredients8);
    setIngredients9(recipe.ingredients9);
    setIngredients10(recipe.ingredients10);
    setIngredients11(recipe.ingredients11);
    setIngredients12(recipe.ingredients12);
    setIngredients13(recipe.ingredients13);
    setIngredients14(recipe.ingredients14);
    setIngredients15(recipe.ingredients15);
    setIngredients16(recipe.ingredients16);
    setIngredients17(recipe.ingredients17);
    setIngredients18(recipe.ingredients18);
    setIngredients19(recipe.ingredients19);
    setIngredients20(recipe.ingredients20);
    setIngredients21(recipe.ingredients21);
    setIngredients22(recipe.ingredients22);
    setIngredients23(recipe.ingredients23);
    setIngredients24(recipe.ingredients24);
    setIngredients25(recipe.ingredients25);
    setMeasurement(recipe.measurement);
    setMeasurement1(recipe.measurement1);
    setMeasurement2(recipe.measurement2);
    setMeasurement3(recipe.measurement3);
    setMeasurement4(recipe.measurement4);
    setMeasurement5(recipe.measurement5);
    setMeasurement6(recipe.measurement6);
    setMeasurement7(recipe.measurement7);
    setMeasurement8(recipe.measurement8);
    setMeasurement9(recipe.measurement9);
    setMeasurement10(recipe.measurement10);
    setMeasurement11(recipe.measurement11);
    setMeasurement12(recipe.measurement12);
    setMeasurement13(recipe.measurement13);
    setMeasurement14(recipe.measurement14);
    setMeasurement15(recipe.measurement15);
    setMeasurement16(recipe.measurement16);
    setMeasurement17(recipe.measurement17);
    setMeasurement18(recipe.measurement18);
    setMeasurement19(recipe.measurement18);
    setMeasurement20(recipe.measurement20);
    setMeasurement21(recipe.measurement21);
    setMeasurement22(recipe.measurement22);
    setMeasurement23(recipe.measurement23);
    setMeasurement24(recipe.measurement24);
    setMeasurement25(recipe.measurement25);
    setInstruction(recipe.instruction);
    setInstruction1(recipe.instruction1);
    setInstruction2(recipe.instruction2);
    setInstruction3(recipe.instruction3);
    setInstruction4(recipe.instruction4);
    setInstruction5(recipe.instruction5);
    setInstruction6(recipe.instruction6);
    setInstruction7(recipe.instruction7);
    setInstruction8(recipe.instruction8);
    setInstruction9(recipe.instruction9);
    setInstruction10(recipe.instruction10);
    setInstruction11(recipe.instruction11);
    setInstruction12(recipe.instruction12);
    setInstruction13(recipe.instruction13);
    setInstruction14(recipe.instruction14);
    setInstruction15(recipe.instruction15);
    setInstruction16(recipe.instruction16);
    setInstruction17(recipe.instruction17);
    setInstruction18(recipe.instruction18);
    setInstruction19(recipe.instruction18);
    setInstruction20(recipe.instruction20);
    setInstruction21(recipe.instruction21);
    setInstruction22(recipe.instruction22);
    setInstruction23(recipe.instruction23);
    setInstruction24(recipe.instruction24);
    setInstruction25(recipe.instruction25);
    // setPhoto(recipe.photo);
    // setPhoto1(recipe.photo1);

    console.log('RECIPE CATEGORIES UPDATE', recipe.category)
  };
  
  const handleOpenModalIngredientUpdate = (ingredient) => {
    console.log('Ingredient_Id', ingredient);
    setOpenModalIngredientUpdate(true);
    setIngredientName(ingredient.name)
    setIngredientPrice(ingredient.price)
    setIngredientId(ingredient._id);
    setMeasurementCosting(ingredient.measurementCosting)
  };

  const handleOpenModalCategoryUpdate = (category) => {
    console.log('Category_Id', category);
    setOpenModalCategoryUpdate(true);
    setCategoryId(category._id);
    setName(category.name)
  };
  

  const handleCloseModalRecipeUpdate = () => {
    setOpenModalRecipeUpdate(false);
  };

  const handleCloseModalIngredientUpdate = () => {
    setOpenModalIngredientUpdate(false);
  };

  const handleCloseModalCategoryUpdate = () => {
    setOpenModalCategoryUpdate(false);
  };


  const handleCloseModalRecipeList = () => {
    setOpenModalRecipeList(false);
    setSearchKeyword('');
  };

  const handleCloseModalIngredientsList = () => {
    setOpenModalIngredientsList(false);
  };

  const handleCloseModalCategoryList = () => {
    setOpenModalCategoryList(false);
  };

  const handleCloseModalIngredientAdd = () => {
    setOpenModalIngredientAdd(false);
  };

  const handleDelete = (recipe) => {
    dispatch(rbook.recipe.deleteRecipe(recipe._id)).then((data) => {
      if (data) {
        handleRecipeList();
      }
    });
    setOpenSnackBarForDel(true);
  }

  const handleDeleteIngrd = (ingredient) => {
    dispatch(rbook.ingredient.deleteIngredient(ingredient._id)).then((data) => {
      if (data) {
        handleIngredientsList();
        handleIngredientsListPaginate();
      }
    });
    setOpenSnackBarForDelIng(true);
  }

  const handleDeleteCateg = (ingredient) => {
    dispatch(rbook.category.deleteCategory(ingredient._id)).then((data) => {
      if (data) {
        handleCategoryList();
        handleCategoryListPaginate();
      }
    });
    // setOpenSnackBarForDelIng(true);
  }


  const createBanana = (recipe, idx) => {
    if ( lowReso ) {
      return (
        <TableBody style = {{ display: loading || loadingDel && 'none'}} key={idx}>
          <TableCell onClick={() => handleOpenModalRecipeUpdate(recipe)} ><div className={classes.tableCell1}>{recipe.name}</div></TableCell>
          <TableCell><div className={classes.tableCell1}><DeleteIcon onClick={() => handleDelete(recipe)} color="secondary"/></div></TableCell>
        </TableBody>
      );
    } else {
      return (
        <TableBody style = {{ display: loading || loadingDel && 'none'}} key={idx}>
          <TableCell><div className={classes.tableCell}>{recipe._id}</div></TableCell>
          <TableCell><div className={classes.tableCell}>{recipe.name}</div></TableCell>
          <TableCell><div className={classes.tableCell}>{recipe.rating.toFixed(1)}</div></TableCell>
          <TableCell><div className={classes.tableCell}>{recipe.recipeBy}</div></TableCell>
          <TableCell><EditIcon onClick={() => handleOpenModalRecipeUpdate(recipe)} color="primary"/></TableCell>
          <TableCell><DeleteIcon onClick={() => handleDelete(recipe)} color="secondary"/></TableCell>
        </TableBody>
      );
    }

  };

  const createPotato = (ingredient, idx) => {
    if ( lowReso ) {
      return (
        <TableBody style = {{ display: loading || loadingDel && 'none'}} key={idx}>
          <TableCell onClick={() => handleOpenModalIngredientUpdate(ingredient)} ><div className={classes.tableCell1}>{ingredient.name}</div></TableCell>
          <TableCell><div className={classes.tableCell1}><DeleteIcon onClick={() => handleDeleteIngrd(ingredient)} color="secondary"/></div></TableCell>
        </TableBody>
      );
    } else {
      return (
        <TableBody style = {{ display: loading || loadingDel && 'none'}} key={idx}>
          <TableCell><div className={classes.tableCell}>{ingredient._id}</div></TableCell>
          <TableCell><div className={classes.tableCell}>{ingredient.name}</div></TableCell>
          <TableCell><div className={classes.tableCell}>{ingredient.measurementCosting}</div></TableCell>
          <TableCell><div className={classes.tableCell}>₱{parseFloat(ingredient.price).toFixed(2)}</div></TableCell>
          <TableCell><EditIcon onClick={() => handleOpenModalIngredientUpdate(ingredient)} color="primary"/></TableCell>
          <TableCell><DeleteIcon onClick={() => handleDeleteIngrd(ingredient)} color="secondary"/></TableCell>
        </TableBody>
      );
    }

  };
  
  const createKiwi = (category, idx) => {
    if ( lowReso ) {
      return (
        <TableBody style = {{ display: loading || loadingDel && 'none'}} key={idx}>
          <TableCell onClick={() => handleOpenModalCategoryUpdate(category)} ><div className={classes.tableCell1}>{category.name}</div></TableCell>
          <TableCell><div className={classes.tableCell1}><DeleteIcon onClick={() => handleDeleteCateg(category)} color="secondary"/></div></TableCell>
        </TableBody>
      );
    } else {
      return (
        <TableBody style = {{ display: loading || loadingDel && 'none'}} key={idx}>
          <TableCell><div className={classes.tableCell}>{category._id}</div></TableCell>
          <TableCell><div className={classes.tableCell}>{category.name}</div></TableCell>
          <TableCell><EditIcon onClick={() => handleOpenModalCategoryUpdate(category)} color="primary"/></TableCell>
          <TableCell><DeleteIcon onClick={() => handleDeleteCateg(category)} color="secondary"/></TableCell>
        </TableBody>
      );
    }
  };

  const showError = () => (
    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={openSnackBar} autoHideDuration={2000} onClose={handleClose}>
      <Alert severity="error">{errorCatg}</Alert>
    </Snackbar>
  );

  const showSuccess= () => (
    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={openSnackBar} autoHideDuration={2000} onClose={handleClose}>
      <Alert severity="success">{category && category.name}category created!</Alert>
    </Snackbar>
  );

  const showSuccessDelete = () => (
    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={openSnackBarForDel} autoHideDuration={2000} onClose={handleClose}>
      <Alert severity="success">Recipe Deleted!</Alert>
    </Snackbar>
  );

  const showErrorForAddRecipe = () => (
    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={openSnackBarForAdd} autoHideDuration={2000} onClose={handleClose}>
      <Alert severity="error">{errorAdd}</Alert>
    </Snackbar>
  );

  const showSuccessForAddRecipe = () => (
    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={openSnackBarForAdd} autoHideDuration={2000} onClose={handleClose}>
      <Alert severity="success">{recipe && recipe.name} added in recipes!</Alert>
    </Snackbar>
  );

  const showErrorForUpdateRecipe = () => (
    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={openSnackBarForUpdt} autoHideDuration={2000} onClose={handleClose}>
      <Alert severity="error">{errorUpdt}</Alert>
    </Snackbar>
  );

  const showSuccessForUpdateRecipe = () => (
    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={openSnackBarForUpdt} autoHideDuration={2000} onClose={handleClose}>
      <Alert severity="success">{recipeUpdt && recipeUpdt.name} updated!</Alert>
    </Snackbar>
  );

  const showErrorForUpdateIngredient = () => (
    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={openSnackBarForUpdt} autoHideDuration={2000} onClose={handleClose}>
      <Alert severity="error">{errorUpdtIngrd}</Alert>
    </Snackbar>
  );

  const showSuccessForUpdateIngredient = () => (
    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={openSnackBarForUpdtIng} autoHideDuration={2000} onClose={handleClose}>
      <Alert severity="success">{ingredientUpdt && ingredientUpdt.name} updated!</Alert>
    </Snackbar>
  );

  const showErrorForAddIngredient = () => (
    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={openSnackBarForUpdtIng} autoHideDuration={2000} onClose={handleClose}>
      <Alert severity="error">{errorIngrd}</Alert>
    </Snackbar>
  );

  const showSuccessDeleteIngrd = () => (
    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={openSnackBarForDelIng} autoHideDuration={2000} onClose={handleClose}>
      <Alert severity="success">Ingredient Deleted!</Alert>
    </Snackbar>
  );

  const showSuccessForAddIngredient = () => (
    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={openSnackBarForAddIng} autoHideDuration={2000} onClose={handleClose}>
      <Alert severity="success">{ingredientAdd && ingredientAdd.name} added in ingredients!</Alert>
    </Snackbar>
  );

  const handleShowIngredient4 = (event) => {
    if (event.target.value === '') {
      setShowIngredient4(false);
    } else {
      setShowIngredient4(true);
    }
  };

  const handleShowIngredient5 = (event) => {
    if (event.target.value === '') {
      setShowIngredient5(false);
    } else {
      setShowIngredient5(true);
    }
  };

  const handleShowIngredient6 = (event) => {
    if (event.target.value === '') {
      setShowIngredient6(false);
    } else {
      setShowIngredient6(true);
    }
  };

  const handleShowIngredient7 = (event) => {
    if (event.target.value === '') {
      setShowIngredient7(false);
    } else {
      setShowIngredient7(true);
    }
  };

  const handleShowIngredient8 = (event) => {
    if (event.target.value === '') {
      setShowIngredient8(false);
    } else {
      setShowIngredient8(true);
    }
  };

  const handleShowIngredient9 = (event) => {
    if (event.target.value === '') {
      setShowIngredient9(false);
    } else {
      setShowIngredient9(true);
    }
  };

  const handleShowIngredient10 = (event) => {
    if (event.target.value === '') {
      setShowIngredient10(false);
    } else {
      setShowIngredient10(true);
    }
  };

  const handleShowIngredient11 = (event) => {
    if (event.target.value === '') {
      setShowIngredient11(false);
    } else {
      setShowIngredient11(true);
    }
  };

  const handleShowIngredient12 = (event) => {
    if (event.target.value === '') {
      setShowIngredient12(false);
    } else {
      setShowIngredient12(true);
    }
  };

  const handleShowIngredient13 = (event) => {
    if (event.target.value === '') {
      setShowIngredient13(false);
    } else {
      setShowIngredient13(true);
    }
  };

  const handleShowIngredient14 = (event) => {
    if (event.target.value === '') {
      setShowIngredient14(false);
    } else {
      setShowIngredient14(true);
    }
  };

  const handleShowIngredient15 = (event) => {
    if (event.target.value === '') {
      setShowIngredient15(false);
    } else {
      setShowIngredient15(true);
    }
  };

  const handleShowIngredient16 = (event) => {
    if (event.target.value === '') {
      setShowIngredient16(false);
    } else {
      setShowIngredient16(true);
    }
  };

  const handleShowIngredient17 = (event) => {
    if (event.target.value === '') {
      setShowIngredient17(false);
    } else {
      setShowIngredient17(true);
    }
  };

  const handleShowIngredient18 = (event) => {
    if (event.target.value === '') {
      setShowIngredient18(false);
    } else {
      setShowIngredient18(true);
    }
  };

  const handleShowIngredient19 = (event) => {
    if (event.target.value === '') {
      setShowIngredient19(false);
    } else {
      setShowIngredient19(true);
    }
  };

  const handleShowIngredient20 = (event) => {
    if (event.target.value === '') {
      setShowIngredient20(false);
    } else {
      setShowIngredient20(true);
    }
  };

  const handleShowIngredient21 = (event) => {
    if (event.target.value === '') {
      setShowIngredient21(false);
    } else {
      setShowIngredient21(true);
    }
  };

  const handleShowIngredient22 = (event) => {
    if (event.target.value === '') {
      setShowIngredient22(false);
    } else {
      setShowIngredient22(true);
    }
  };

  const handleShowIngredient23 = (event) => {
    if (event.target.value === '') {
      setShowIngredient23(false);
    } else {
      setShowIngredient23(true);
    }
  };

  const handleShowIngredient24 = (event) => {
    if (event.target.value === '') {
      setShowIngredient24(false);
    } else {
      setShowIngredient24(true);
    }
  };

  const handleShowIngredient25 = (event) => {
    if (event.target.value === '') {
      setShowIngredient25(false);
    } else {
      setShowIngredient25(true);
    }
  };

  const handleShowIngredient26 = (event) => {
    if (event.target.value === '') {
      setShowIngredient26(false);
    } else {
      setShowIngredient26(true);
    }
  };

  const handleShowInstruction4 = (event) => {
    if (event.target.value === '') {
      setShowInstruction4(false);
    } else {
      setShowInstruction4(true);
    }
  };

  const handleShowInstruction5 = (event) => {
    if (event.target.value === '') {
      setShowInstruction5(false);
    } else {
      setShowInstruction5(true);
    }
  };

  const handleShowInstruction6 = (event) => {
    if (event.target.value === '') {
      setShowInstruction6(false);
    } else {
      setShowInstruction6(true);
    }
  };

  const handleShowInstruction7 = (event) => {
    if (event.target.value === '') {
      setShowInstruction7(false);
    } else {
      setShowInstruction7(true);
    }
  };

  const handleShowInstruction8 = (event) => {
    if (event.target.value === '') {
      setShowInstruction8(false);
    } else {
      setShowInstruction8(true);
    }
  };

  const handleShowInstruction9 = (event) => {
    if (event.target.value === '') {
      setShowInstruction9(false);
    } else {
      setShowInstruction9(true);
    }
  };

  const handleShowInstruction10 = (event) => {
    if (event.target.value === '') {
      setShowInstruction10(false);
    } else {
      setShowInstruction10(true);
    }
  };

  const handleShowInstruction11 = (event) => {
    if (event.target.value === '') {
      setShowInstruction11(false);
    } else {
      setShowInstruction11(true);
    }
  };

  const handleShowInstruction12 = (event) => {
    if (event.target.value === '') {
      setShowInstruction12(false);
    } else {
      setShowInstruction12(true);
    }
  };

  const handleShowInstruction13 = (event) => {
    if (event.target.value === '') {
      setShowInstruction13(false);
    } else {
      setShowInstruction13(true);
    }
  };

  const handleShowInstruction14 = (event) => {
    if (event.target.value === '') {
      setShowInstruction14(false);
    } else {
      setShowInstruction14(true);
    }
  };

  const handleShowInstruction15 = (event) => {
    if (event.target.value === '') {
      setShowInstruction15(false);
    } else {
      setShowInstruction15(true);
    }
  };

  const handleShowInstruction16 = (event) => {
    if (event.target.value === '') {
      setShowInstruction16(false);
    } else {
      setShowInstruction16(true);
    }
  };

  const handleShowInstruction17 = (event) => {
    if (event.target.value === '') {
      setShowInstruction17(false);
    } else {
      setShowInstruction17(true);
    }
  };

  const handleShowInstruction18 = (event) => {
    if (event.target.value === '') {
      setShowInstruction18(false);
    } else {
      setShowInstruction18(true);
    }
  };

  const handleShowInstruction19 = (event) => {
    if (event.target.value === '') {
      setShowInstruction19(false);
    } else {
      setShowInstruction19(true);
    }
  };

  const handleShowInstruction20 = (event) => {
    if (event.target.value === '') {
      setShowInstruction20(false);
    } else {
      setShowInstruction20(true);
    }
  };

  const handleShowInstruction21 = (event) => {
    if (event.target.value === '') {
      setShowInstruction21(false);
    } else {
      setShowInstruction21(true);
    }
  };

  const handleShowInstruction22 = (event) => {
    if (event.target.value === '') {
      setShowInstruction22(false);
    } else {
      setShowInstruction22(true);
    }
  };

  const handleShowInstruction23 = (event) => {
    if (event.target.value === '') {
      setShowInstruction23(false);
    } else {
      setShowInstruction23(true);
    }
  };

  const handleShowInstruction24 = (event) => {
    if (event.target.value === '') {
      setShowInstruction24(false);
    } else {
      setShowInstruction24(true);
    }
  };

  const handleShowInstruction25 = (event) => {
    if (event.target.value === '') {
      setShowInstruction25(false);
    } else {
      setShowInstruction25(true);
    }
  };

  const handleShowInstruction26 = (event) => {
    if (event.target.value === '') {
      setShowInstruction26(false);
    } else {
      setShowInstruction26(true);
    }
  };


  document.title = 'Peso Palate | Adminpage';

  return (
    loadingUpdt || loadingDel || loadingCatg || loadingIngrd || loadingAdd || loadingUpdtIngrd || loadingDelIngrd || loadingCategPag || loadingCategUpdt || loadingDelCateg ? <center className='loading1' ><CircularProgress color = 'inherit' /></center> :
    <>
      {successDel && !errorDel && showSuccessDelete()}
      {success && !errorCatg && showSuccess()}
      {!success && errorCatg && showError()}
      {successAdd && !errorAdd && showSuccessForAddRecipe()}
      {!successAdd && errorAdd && showErrorForAddRecipe()}
      {successUpdt && !errorUpdt && showSuccessForUpdateRecipe()}
      {successAddIngrd && !errorIngrd && showSuccessForAddIngredient()}
      {!successAddIngrd && errorIngrd && showErrorForAddIngredient()}
      {successDelIngrd && !errorDelIngrd && showSuccessDeleteIngrd()}
      {successUpdtIngrd && !errorUpdtIngrd && showSuccessForUpdateIngredient()}
      {!successUpdtIngrd && errorUpdtIngrd && showErrorForUpdateIngredient()}
      {!successUpdt && errorUpdt && showErrorForUpdateRecipe()}

      <center className = 'adminPageTitle'>
        Admin Dashboard
      </center>

      <div className="adminDashboardCont">
        <div className="adminDashboardLeftContent">
          <div>
            <div>Admin Id:</div> 
            <div style = {{ color:'red'}}>{user._id}</div>
          </div>
          <div style = {{marginTop: '1rem'}}>
            <div>Admin Name:</div> 
            <div style = {{ color:'red'}}>{user.name}</div>
          </div>
          <div style = {{marginTop: '1rem'}}>
            <div>Admin Email:</div> 
            <div style = {{ color:'red'}}>{user.email}</div>
          </div>
        </div>

        <div className="adminDashboardRightContent">
            <Button className="dashboardBtn" onClick={handleOpenModalCategory} startIcon={<AddIcon/>} variant="contained" type="submit">Add Category</Button>
            <Button className="dashboardBtn" onClick={handleOpenModalRecipe} startIcon={<AddIcon/>} variant="contained" type="submit">Add Recipe</Button>
            <Button className="dashboardBtn" onClick={handleOpenModalIngredientAdd} startIcon={<AddIcon/>} variant="contained" type="submit">Add Ingredient</Button>
            <Button className="dashboardBtn" onClick={handleOpenModalRecipeList} startIcon={<ListIcon/>} variant="contained" type="submit">Recipe List</Button>
            <Button className="dashboardBtn" onClick={handleOpenModalIngredientsList} startIcon={<ListIcon/>} variant="contained" type="submit">Ingredients List</Button>
            <Button className="dashboardBtn" onClick={handleOpenModalCategoryList} startIcon={<ListIcon/>} variant="contained" type="submit">Category List</Button>
        </div>
      </div>
      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModalCategory}
        onClose={handleCloseModalCategory}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
     >
       <Fade in={openModalCategory}>
         <div className={classes.paper}>
           <div  className = 'container'>
             <form onSubmit = {submitHandler} className = 'form-container'>
               <FormControl className={(classes.margin, classes.textField)}>
                 <InputLabel>Name of category</InputLabel>
                 <Input
                   type = "text"
                   onChange={(e) => setName(e.target.value)}
                   style = {{width: '100%'}}
                   required
                   label="category"
                   id = 'name'
                   name = 'name'
                 />
               </FormControl>
               <div className={classes.root}>
                 <input
                   accept="image/*"
                   className={classes.input}
                   id="photo"
                   required
                   type="file"
                   name = 'photo'
                   onChange={(e) => setPhoto(e.target.files[0])}
                 />
                 <label className="addButtons" htmlFor="photo">
                   <Button variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon />}>
                     Upload Category Photo
                   </Button>
                 </label>
               </div>
               <Button style={{width:'100%', marginTop: "1rem"}} startIcon={<SaveIcon />} variant="contained" type="submit">Save Category</Button>
               <Button onClick={handleCloseModalCategory} style={{width:'100%', marginTop: "1rem"}} color="primary" startIcon={<ClearIcon/>} variant="contained">Cancel</Button>
             </form>
           </div>
         </div>
       </Fade>
     </Modal>
     <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModalIngredientUpdate}
        onClose={handleCloseModalIngredientUpdate}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
     >
       <Fade in={openModalIngredientUpdate}>
         <div className={classes.paper}>
           <div  className = 'container'>
             <form onSubmit = {submitHandlerForIngredientUpdate} className = 'form-container'>
               <FormControl className={(classes.margin, classes.textField)}>
                 <InputLabel>Name of ingredient</InputLabel>
                 <Input
                   type = "text"
                   value={ingredientName}
                   onChange={(e) => setIngredientName(e.target.value)}
                   style = {{width: '100%'}}
                   required
                   label="ingredient"
                   id = 'ingredientName'
                   name = 'ingredientName'
                 />
               </FormControl>
               <FormControl className={(classes.margin, classes.textField)}>
                 <InputLabel>Measurement of ingredient (Eg. KG, G, Teaspoon)</InputLabel>
                 <Input
                   type = "text"
                   value={measurementCosting}
                   onChange={(e) => setMeasurementCosting(e.target.value)}
                   style = {{width: '100%'}}
                   required
                   label="measurementCosting"
                   id = 'measurementCosting'
                   name = 'measurementCosting'
                 />
               </FormControl>
               <FormControl className={(classes.margin, classes.textField)}>
                 <InputLabel>Price of ingredient</InputLabel>
                 <Input
                   type = "text"
                   value={ingredientPrice}
                   onChange={(e) => setIngredientPrice(e.target.value)}
                   style = {{width: '100%'}}
                   required
                   label="ingredient"
                   id = 'ingredientName'
                   name = 'ingredientName'
                 />
               </FormControl>
               <Button style={{width:'100%', marginTop: "1rem"}} startIcon={<SaveIcon />} variant="contained" type="submit">Save Ingredient</Button>
               <Button onClick={handleCloseModalIngredientUpdate} style={{width:'100%', marginTop: "1rem"}} color="primary" startIcon={<ClearIcon/>} variant="contained">Cancel</Button>
             </form>
           </div>
         </div>
       </Fade>
     </Modal>

     <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openModalIngredientAdd}
      onClose={handleCloseModalIngredientAdd}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModalIngredientAdd}>
        <div className={classes.paper}>
          <div  className = 'container'>
            <form onSubmit = {submitHandlerIngredient} className = 'form-container'>
              <FormControl className={(classes.margin, classes.textField)}>
                <InputLabel>Name of ingredient</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setIngredientName(e.target.value)}
                  style = {{width: '100%'}}
                  required
                  label="name"
                  id = 'ingredientName'
                  name = 'ingredientPrice'
                />
              </FormControl>
              <FormControl className={(classes.margin, classes.textField)}>
                <InputLabel>Measurement of ingredient (Eg. KG, G, Teaspoon)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setMeasurementCosting(e.target.value)}
                  style = {{width: '100%'}}
                  required
                  label="measurementCosting"
                  id = 'measurementCosting'
                  name = 'measurementCosting'
                />
              </FormControl>
              <FormControl className={(classes.margin, classes.textField)}>
                <InputLabel>Price of ingredient</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setIngredientPrice(e.target.value)}
                  style = {{width: '100%'}}
                  required
                  label="price"
                  id = 'ingredientPrice'
                  name = 'ingredientPrice'
                />
              </FormControl>
              <Button style={{width:'100%', marginTop: "1rem"}} startIcon={<SaveIcon />} variant="contained" type="submit">Save Ingredient</Button>
              <Button onClick={handleCloseModalIngredientAdd} style={{width:'100%', marginTop: "1rem"}} color="primary" startIcon={<ClearIcon/>} variant="contained">Cancel</Button>
            </form>
          </div>
        </div>
      </Fade>
    </Modal>

    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openModalCategoryUpdate}
      onClose={handleCloseModalCategoryUpdate}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModalCategoryUpdate}>
        <div className={classes.paper}>
          <div  className = 'container'>
            <form onSubmit = {submitHandlerForCategoryUpdate} className = 'form-container'>
              <FormControl className={(classes.margin, classes.textField)}>
                <InputLabel>Name of category</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setName(e.target.value)}
                  style = {{width: '100%'}}
                  required
                  value={name}
                  label="category"
                  id = 'name'
                  name = 'name'
                />
              </FormControl>
              <div className={classes.root}>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="photo"
                  type="file"
                  name = 'photo'
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
                <label className="addButtons" htmlFor="photo">
                  <Button variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon />}>
                    Upload Category Photo
                  </Button>
                </label>
              </div>
              <Button style={{width:'100%', marginTop: "1rem"}} startIcon={<SaveIcon />} variant="contained" type="submit">Save Category</Button>
              <Button onClick={handleCloseModalCategory} style={{width:'100%', marginTop: "1rem"}} color="primary" startIcon={<ClearIcon/>} variant="contained">Cancel</Button>
            </form>
          </div>
        </div>
      </Fade>
    </Modal>
     <Modal
       aria-labelledby="transition-modal-title"
       aria-describedby="transition-modal-description"
       className={classes.modal}
       open={openModalRecipeList}
       onClose={handleCloseModalRecipeList}
       closeAfterTransition
       BackdropComponent={Backdrop}
       BackdropProps={{
         timeout: 500,
       }}
    >
      <Fade in={openModalRecipeList}>
        <div className={ lowReso? classes.paper2LowReso : classes.paper2 }>
          <div>
          {loading && <center><CircularProgress color='inherit' className = 'loading1' /></center>}
          {loadingDel && <center><CircularProgress color='inherit' className = 'loading1' /></center>}
          {error && <div>{error}</div>}
          <ClearIcon onClick={handleCloseModalRecipeList} />
          <form style={{ marginTop: '3%', marginBottom: '3%' }} onSubmit={submitHandlerForSearch}>
            <TextField
              placeholder='Search for recipes?'
              className='searchBar'
              id="outlined-search"
              style={{ display: loadingUpdt && 'none' }}
              type="search"
              variant="outlined"
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              style={{ marginLeft: '10px' }}
            >
              Search
            </Button>
          </form>
          { lowReso ?
            <TableContainer style = {{ display: loading && 'none' }} component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow style={{ marginTop:"1rem" }} >
                    <TableCell><div className={classes.tableCell1}>Name</div></TableCell>
                    <TableCell><div className={classes.tableCell1}>Delete</div></TableCell>
                  </TableRow>
                </TableHead>
                {recipeList.map((recipe, index) => (
                  createBanana(recipe, index)
                ))}
              </Table>
            </TableContainer>
          :
          <TableContainer style = {{ display: loading && 'none' }} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow style={{ marginTop:"1rem" }} >
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              {recipeList.map((recipe, index) => (
                createBanana(recipe, index)
              ))}
            </Table>
          </TableContainer>
          }

          <Pagination
            style = {{ display: loading && 'none', marginTop: "1rem" }}
            count={pageDetails && pageDetails.totalPages}
            page={pageDetails && pageDetails.pageIndex}
            defaultPage={1}
            color="primary"
            size="large"
            onChange={handleChangePageIndex}
            classes={{ ul: classes.paginator }}
          />
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openModalRecipeUpdate}
            onClose={handleCloseModalRecipeUpdate}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
         >
           <Fade in={openModalRecipeUpdate}>
             <div className={classes.paper1}>
               <div className = 'container'>
                 <form onSubmit = {submitHandlerForRecipeUpdate} className = 'form-container'>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Name of the recipe</InputLabel>
                     <Input
                       type = "text"
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                       required
                       id = 'name'
                       name = 'name'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <TextField
                       id="description"
                       label="Description"
                       value={description}
                       multiline
                       name="description"
                       onChange={(e) => setDescription(e.target.value)}
                       variant="outlined"
                       rows={4}
                     />
                   </FormControl>
                   <FormControl className={classes.formControl}>
                      <InputLabel id="category-label">Select Category</InputLabel>
                      <Select
                        labelId="category-label"
                        id="category"
                        multiple
                        required
                        value={category}
                        onChange={handleChange}
                        renderValue={(selected) => (
                          <div className={classes.chips}>
                            {selected.map((value) => (
                              <Chip key={value} label={categList.find(c => c._id === value)?.name} className={classes.chip} />
                            ))}
                          </div>
                        )}
                      >
                        {categList.map((c) => (
                          <MenuItem key={c._id} value={c._id}>
                            {c.name}
                          </MenuItem>
                        ))}
                      </Select>
                   </FormControl>

                   <div className='selectOneLiner'>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                      <Input
                        type = "text"
                        onChange={(e) => setMeasurement(e.target.value)}
                        value={measurement}
                        required
                        id = 'measurement'
                        name = 'measurement'
                      />
                    </FormControl>
                    <FormControl required className={(classes.margin, classes.textField1)}>
                      <Select
                        native
                        variant="outlined"
                        onChange={(e) => setIngredients(e.target.value)}
                        value={ingredients}
                        inputProps={{
                          name: 'ingredients',
                          id: 'ingredients',
                        }}
                      >
                        <option value = "">Select Ingredient 1 (Required)</option>
                        {
                        ingredientsList.map((ing, indx) => (
                          <option key={indx} value={ing._id}>
                              {ing.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className='selectOneLiner'>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                      <Input
                        type = "text"
                        onChange={(e) => setMeasurement1(e.target.value)}
                        value={measurement1}
                        required
                        id = 'measurement'
                        name = 'measurement'
                      />
                    </FormControl>
                    <FormControl required className={(classes.margin, classes.textField1)}>
                      <Select
                        native
                        variant="outlined"
                        onChange={(e) => setIngredients1(e.target.value)}
                        value={ingredients1}
                        inputProps={{
                          name: 'ingredients',
                          id: 'ingredients',
                        }}
                      >
                        <option value = "">Select Ingredient 2 (Required)</option>
                        {
                        ingredientsList.map((ing, indx) => (
                          <option key={indx} value={ing._id}>
                              {ing.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className='selectOneLiner'>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                      <Input
                        type = "text"
                        onChange={(e) => setMeasurement2(e.target.value)}
                        value={measurement2}
                        required
                        id = 'measurement'
                        name = 'measurement'
                      />
                    </FormControl>
                    <FormControl required className={(classes.margin, classes.textField1)}>
                      <Select
                        native
                        variant="outlined"
                        onChange={(e) => setIngredients2(e.target.value)}
                        value={ingredients2}
                        inputProps={{
                          name: 'ingredients',
                          id: 'ingredients',
                        }}
                      >
                        <option value = "">Select Ingredient 3 (Required)</option>
                        {
                        ingredientsList.map((ing, indx) => (
                          <option key={indx} value={ing._id}>
                              {ing.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className='selectOneLiner'>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                      <Input
                        type = "text"
                        onChange={(e) => setMeasurement3(e.target.value)}
                        value={measurement3}
                        id = 'measurement'
                        name = 'measurement'
                      />
                    </FormControl>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <Select
                        native
                        variant="outlined"
                        onChange={(e) => setIngredients3(e.target.value)}
                        value={ingredients3}
                        inputProps={{
                          name: 'ingredients3',
                          id: 'ingredients3',
                        }}
                      >
                        <option value = "">Select Ingredient 4 (Unneed)</option>
                        {
                        ingredientsList.map((ing, indx) => (
                          <option key={indx} value={ing._id}>
                              {ing.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className='selectOneLiner'>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                      <Input
                        type = "text"
                        onChange={(e) => setMeasurement4(e.target.value)}
                        value={measurement4}
                        id = 'measurement'
                        name = 'measurement'
                      />
                    </FormControl>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <Select
                        native
                        variant="outlined"
                        onChange={(e) => setIngredients4(e.target.value)}
                        value={ingredients4}
                        inputProps={{
                          name: 'ingredients4',
                          id: 'ingredients4',
                        }}
                      >
                        <option value = "">Select Ingredient 5 (Unneed)</option>
                        {
                        ingredientsList.map((ing, indx) => (
                          <option key={indx} value={ing._id}>
                              {ing.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className='selectOneLiner'>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                      <Input
                        type = "text"
                        onChange={(e) => setMeasurement5(e.target.value)}
                        value={measurement5}
                        id = 'measurement'
                        name = 'measurement'
                      />
                    </FormControl>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <Select
                        native
                        variant="outlined"
                        onChange={(e) => setIngredients5(e.target.value)}
                        value={ingredients5}
                        inputProps={{
                          name: 'ingredients5',
                          id: 'ingredients5',
                        }}
                      >
                        <option value = "">Select Ingredient 6 (Unneed)</option>
                        {
                        ingredientsList.map((ing, indx) => (
                          <option key={indx} value={ing._id}>
                              {ing.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className='selectOneLiner'>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                      <Input
                        type = "text"
                        onChange={(e) => setMeasurement6(e.target.value)}
                        value={measurement6}
                        id = 'measurement'
                        name = 'measurement'
                      />
                    </FormControl>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <Select
                        native
                        variant="outlined"
                        onChange={(e) => setIngredients6(e.target.value)}
                        value={ingredients6}
                        inputProps={{
                          name: 'ingredients6',
                          id: 'ingredients6',
                        }}
                      >
                        <option value = "">Select Ingredient 7 (Unneed)</option>
                        {
                        ingredientsList.map((ing, indx) => (
                          <option key={indx} value={ing._id}>
                              {ing.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className='selectOneLiner'>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                      <Input
                        type = "text"
                        onChange={(e) => setMeasurement7(e.target.value)}
                        value={measurement7}
                        id = 'measurement'
                        name = 'measurement'
                      />
                    </FormControl>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <Select
                        native
                        variant="outlined"
                        onChange={(e) => setIngredients7(e.target.value)}
                        value={ingredients7}
                        inputProps={{
                          name: 'ingredients7',
                          id: 'ingredients7',
                        }}
                      >
                        <option value = "">Select Ingredient 8 (Unneed)</option>
                        {
                        ingredientsList.map((ing, indx) => (
                          <option key={indx} value={ing._id}>
                              {ing.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className='selectOneLiner'>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                      <Input
                        type = "text"
                        onChange={(e) => setMeasurement8(e.target.value)}
                        value={measurement8}
                        id = 'measurement'
                        name = 'measurement'
                      />
                    </FormControl>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <Select
                        native
                        variant="outlined"
                        onChange={(e) => setIngredients8(e.target.value)}
                        value={ingredients8}
                        inputProps={{
                          name: 'ingredients8',
                          id: 'ingredients8',
                        }}
                      >
                        <option value = "">Select Ingredient 9 (Unneed)</option>
                        {
                        ingredientsList.map((ing, indx) => (
                          <option key={indx} value={ing._id}>
                              {ing.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className='selectOneLiner'>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                      <Input
                        type = "text"
                        onChange={(e) => setMeasurement9(e.target.value)}
                        value={measurement9}
                        id = 'measurement'
                        name = 'measurement'
                      />
                    </FormControl>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <Select
                        native
                        variant="outlined"
                        onChange={(e) => setIngredients9(e.target.value)}
                        value={ingredients9}
                        inputProps={{
                          name: 'ingredients8',
                          id: 'ingredients8',
                        }}
                      >
                        <option value = "">Select Ingredient 10 (Unneed)</option>
                        {
                        ingredientsList.map((ing, indx) => (
                          <option key={indx} value={ing._id}>
                              {ing.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className='selectOneLiner'>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                      <Input
                        type = "text"
                        onChange={(e) => setMeasurement10(e.target.value)}
                        value={measurement10}
                        id = 'measurement'
                        name = 'measurement'
                      />
                    </FormControl>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <Select
                        native
                        variant="outlined"
                        onChange={(e) => setIngredients10(e.target.value)}
                        value={ingredients10}
                        inputProps={{
                          name: 'ingredients8',
                          id: 'ingredients8',
                        }}
                      >
                        <option value = "">Select Ingredient 11 (Unneed)</option>
                        {
                        ingredientsList.map((ing, indx) => (
                          <option key={indx} value={ing._id}>
                              {ing.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className='selectOneLiner'>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                      <Input
                        type = "text"
                        onChange={(e) => setMeasurement11(e.target.value)}
                        value={measurement11}
                        id = 'measurement'
                        name = 'measurement'
                      />
                    </FormControl>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <Select
                        native
                        variant="outlined"
                        onChange={(e) => setIngredients11(e.target.value)}
                        value={ingredients11}
                        inputProps={{
                          name: 'ingredients8',
                          id: 'ingredients8',
                        }}
                      >
                        <option value = "">Select Ingredient 12 (Unneed)</option>
                        {
                        ingredientsList.map((ing, indx) => (
                          <option key={indx} value={ing._id}>
                              {ing.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className='selectOneLiner'>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                      <Input
                        type = "text"
                        onChange={(e) => setMeasurement12(e.target.value)}
                        value={measurement12}
                        id = 'measurement'
                        name = 'measurement'
                      />
                    </FormControl>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <Select
                        native
                        variant="outlined"
                        onChange={(e) => setIngredients12(e.target.value)}
                        value={ingredients12}
                        inputProps={{
                          name: 'ingredients8',
                          id: 'ingredients8',
                        }}
                      >
                        <option value = "">Select Ingredient 13 (Unneed)</option>
                        {
                        ingredientsList.map((ing, indx) => (
                          <option key={indx} value={ing._id}>
                              {ing.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className='selectOneLiner'>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                      <Input
                        type = "text"
                        onChange={(e) => setMeasurement13(e.target.value)}
                        value={measurement13}
                        id = 'measurement'
                        name = 'measurement'
                      />
                    </FormControl>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <Select
                        native
                        variant="outlined"
                        onChange={(e) => setIngredients13(e.target.value)}
                        value={ingredients13}
                        inputProps={{
                          name: 'ingredients8',
                          id: 'ingredients8',
                        }}
                      >
                        <option value = "">Select Ingredient 14 (Unneed)</option>
                        {
                        ingredientsList.map((ing, indx) => (
                          <option key={indx} value={ing._id}>
                              {ing.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className='selectOneLiner'>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                      <Input
                        type = "text"
                        onChange={(e) => setMeasurement14(e.target.value)}
                        value={measurement14}
                        id = 'measurement'
                        name = 'measurement'
                      />
                    </FormControl>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <Select
                        native
                        variant="outlined"
                        onChange={(e) => setIngredients14(e.target.value)}
                        value={ingredients14}
                        inputProps={{
                          name: 'ingredients8',
                          id: 'ingredients8',
                        }}
                      >
                        <option value = "">Select Ingredient 15 (Unneed)</option>
                        {
                        ingredientsList.map((ing, indx) => (
                          <option key={indx} value={ing._id}>
                              {ing.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className='selectOneLiner'>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                      <Input
                        type = "text"
                        onChange={(e) => setMeasurement15(e.target.value)}
                        value={measurement15}
                        id = 'measurement'
                        name = 'measurement'
                      />
                    </FormControl>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <Select
                        native
                        variant="outlined"
                        onChange={(e) => setIngredients15(e.target.value)}
                        value={ingredients15}
                        inputProps={{
                          name: 'ingredients8',
                          id: 'ingredients8',
                        }}
                      >
                        <option value = "">Select Ingredient 16 (Unneed)</option>
                        {
                        ingredientsList.map((ing, indx) => (
                          <option key={indx} value={ing._id}>
                              {ing.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className='selectOneLiner'>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                      <Input
                        type = "text"
                        onChange={(e) => setMeasurement16(e.target.value)}
                        value={measurement16}
                        id = 'measurement'
                        name = 'measurement'
                      />
                    </FormControl>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <Select
                        native
                        variant="outlined"
                        onChange={(e) => setIngredients16(e.target.value)}
                        value={ingredients16}
                        inputProps={{
                          name: 'ingredients8',
                          id: 'ingredients8',
                        }}
                      >
                        <option value = "">Select Ingredient 17 (Unneed)</option>
                        {
                        ingredientsList.map((ing, indx) => (
                          <option key={indx} value={ing._id}>
                              {ing.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className='selectOneLiner'>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                      <Input
                        type = "text"
                        onChange={(e) => setMeasurement17(e.target.value)}
                        value={measurement17}
                        id = 'measurement'
                        name = 'measurement'
                      />
                    </FormControl>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <Select
                        native
                        variant="outlined"
                        onChange={(e) => setIngredients17(e.target.value)}
                        value={ingredients17}
                        inputProps={{
                          name: 'ingredients8',
                          id: 'ingredients8',
                        }}
                      >
                        <option value = "">Select Ingredient 18 (Unneed)</option>
                        {
                        ingredientsList.map((ing, indx) => (
                          <option key={indx} value={ing._id}>
                              {ing.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className='selectOneLiner'>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                      <Input
                        type = "text"
                        onChange={(e) => setMeasurement18(e.target.value)}
                        value={measurement18}
                        id = 'measurement'
                        name = 'measurement'
                      />
                    </FormControl>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <Select
                        native
                        variant="outlined"
                        onChange={(e) => setIngredients18(e.target.value)}
                        value={ingredients18}
                        inputProps={{
                          name: 'ingredients8',
                          id: 'ingredients8',
                        }}
                      >
                        <option value = "">Select Ingredient 19 (Unneed)</option>
                        {
                        ingredientsList.map((ing, indx) => (
                          <option key={indx} value={ing._id}>
                              {ing.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className='selectOneLiner'>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                      <Input
                        type = "text"
                        onChange={(e) => setMeasurement19(e.target.value)}
                        value={measurement19}
                        id = 'measurement'
                        name = 'measurement'
                      />
                    </FormControl>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <Select
                        native
                        variant="outlined"
                        onChange={(e) => setIngredients19(e.target.value)}
                        value={ingredients19}
                        inputProps={{
                          name: 'ingredients8',
                          id: 'ingredients8',
                        }}
                      >
                        <option value = "">Select Ingredient 20 (Unneed)</option>
                        {
                        ingredientsList.map((ing, indx) => (
                          <option key={indx} value={ing._id}>
                              {ing.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className='selectOneLiner'>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                      <Input
                        type = "text"
                        onChange={(e) => setMeasurement20(e.target.value)}
                        value={measurement20}
                        id = 'measurement'
                        name = 'measurement'
                      />
                    </FormControl>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <Select
                        native
                        variant="outlined"
                        onChange={(e) => setIngredients20(e.target.value)}
                        value={ingredients20}
                        inputProps={{
                          name: 'ingredients8',
                          id: 'ingredients8',
                        }}
                      >
                        <option value = "">Select Ingredient 21 (Unneed)</option>
                        {
                        ingredientsList.map((ing, indx) => (
                          <option key={indx} value={ing._id}>
                              {ing.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className='selectOneLiner'>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                      <Input
                        type = "text"
                        onChange={(e) => setMeasurement21(e.target.value)}
                        value={measurement21}
                        id = 'measurement'
                        name = 'measurement'
                      />
                    </FormControl>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <Select
                        native
                        variant="outlined"
                        onChange={(e) => setIngredients21(e.target.value)}
                        value={ingredients21}
                        inputProps={{
                          name: 'ingredients8',
                          id: 'ingredients8',
                        }}
                      >
                        <option value = "">Select Ingredient 22 (Unneed)</option>
                        {
                        ingredientsList.map((ing, indx) => (
                          <option key={indx} value={ing._id}>
                              {ing.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className='selectOneLiner'>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                      <Input
                        type = "text"
                        onChange={(e) => setMeasurement22(e.target.value)}
                        value={measurement22}
                        id = 'measurement'
                        name = 'measurement'
                      />
                    </FormControl>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <Select
                        native
                        variant="outlined"
                        onChange={(e) => setIngredients22(e.target.value)}
                        value={ingredients22}
                        inputProps={{
                          name: 'ingredients8',
                          id: 'ingredients8',
                        }}
                      >
                        <option value = "">Select Ingredient 23 (Unneed)</option>
                        {
                        ingredientsList.map((ing, indx) => (
                          <option key={indx} value={ing._id}>
                              {ing.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className='selectOneLiner'>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                      <Input
                        type = "text"
                        onChange={(e) => setMeasurement23(e.target.value)}
                        value={measurement23}
                        id = 'measurement'
                        name = 'measurement'
                      />
                    </FormControl>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <Select
                        native
                        variant="outlined"
                        onChange={(e) => setIngredients23(e.target.value)}
                        value={ingredients23}
                        inputProps={{
                          name: 'ingredients8',
                          id: 'ingredients8',
                        }}
                      >
                        <option value = "">Select Ingredient 24 (Unneed)</option>
                        {
                        ingredientsList.map((ing, indx) => (
                          <option key={indx} value={ing._id}>
                              {ing.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className='selectOneLiner'>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                      <Input
                        type = "text"
                        onChange={(e) => setMeasurement24(e.target.value)}
                        value={measurement24}
                        id = 'measurement'
                        name = 'measurement'
                      />
                    </FormControl>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <Select
                        native
                        variant="outlined"
                        onChange={(e) => setIngredients24(e.target.value)}
                        value={ingredients24}
                        inputProps={{
                          name: 'ingredients8',
                          id: 'ingredients8',
                        }}
                      >
                        <option value = "">Select Ingredient 25 (Unneed)</option>
                        {
                        ingredientsList.map((ing, indx) => (
                          <option key={indx} value={ing._id}>
                              {ing.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className='selectOneLiner'>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                      <Input
                        type = "text"
                        onChange={(e) => setMeasurement25(e.target.value)}
                        value={measurement25}
                        id = 'measurement'
                        name = 'measurement'
                      />
                    </FormControl>
                    <FormControl className={(classes.margin, classes.textField1)}>
                      <Select
                        native
                        variant="outlined"
                        onChange={(e) => setIngredients25(e.target.value)}
                        value={ingredients25}
                        inputProps={{
                          name: 'ingredients8',
                          id: 'ingredients8',
                        }}
                      >
                        <option value = "">Select Ingredient 26 (Unneed)</option>
                        {
                        ingredientsList.map((ing, indx) => (
                          <option key={indx} value={ing._id}>
                              {ing.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>


                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 1 (required)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction}
                       onChange={(e) => setInstruction(e.target.value)}
                       required
                       id = 'instruction'
                       name = 'instruction'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 2 (required)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction1}
                       onChange={(e) => setInstruction1(e.target.value)}
                       required
                       id = 'instruction1'
                       name = 'instruction1'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 3 (required)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction2}
                       onChange={(e) => setInstruction2(e.target.value)}
                       required
                       id = 'instruction2'
                       name = 'instruction2'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 4 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction3}
                       onChange={(e) => setInstruction3(e.target.value)}
                       id = 'instruction3'
                       name = 'instruction3'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 5 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction4}
                       onChange={(e) => setInstruction4(e.target.value)}
                       id = 'instruction4'
                       name = 'instruction4'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 6 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction5}
                       onChange={(e) => setInstruction5(e.target.value)}
                       id = 'instruction5'
                       name = 'instruction5'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 7 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction6}
                       onChange={(e) => setInstruction6(e.target.value)}
                       id = 'instruction6'
                       name = 'instruction6'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 8 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction7}
                       onChange={(e) => setInstruction7(e.target.value)}
                       id = 'instruction7'
                       name = 'instruction7'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 9 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction8}
                       onChange={(e) => setInstruction8(e.target.value)}
                       id = 'instruction8'
                       name = 'instruction8'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 10 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction9}
                       onChange={(e) => setInstruction9(e.target.value)}
                       id = 'instruction9'
                       name = 'instruction9'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 11 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction10}
                       onChange={(e) => setInstruction10(e.target.value)}
                       id = 'instruction10'
                       name = 'instruction10'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 12 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction11}
                       onChange={(e) => setInstruction11(e.target.value)}
                       id = 'instruction11'
                       name = 'instruction11'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 13 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction12}
                       onChange={(e) => setInstruction12(e.target.value)}
                       id = 'instruction12'
                       name = 'instruction12'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 14 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction13}
                       onChange={(e) => setInstruction13(e.target.value)}
                       id = 'instruction13'
                       name = 'instruction13'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 15 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction14}
                       onChange={(e) => setInstruction14(e.target.value)}
                       id = 'instruction14'
                       name = 'instruction14'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 16 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction15}
                       onChange={(e) => setInstruction15(e.target.value)}
                       id = 'instruction15'
                       name = 'instruction15'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 17 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction16}
                       onChange={(e) => setInstruction16(e.target.value)}
                       id = 'instruction16'
                       name = 'instruction16'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 18 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction17}
                       onChange={(e) => setInstruction17(e.target.value)}
                       id = 'instruction17'
                       name = 'instruction17'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 19 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction18}
                       onChange={(e) => setInstruction18(e.target.value)}
                       id = 'instruction18'
                       name = 'instruction18'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 20 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction19}
                       onChange={(e) => setInstruction19(e.target.value)}
                       id = 'instruction19'
                       name = 'instruction19'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 21 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction20}
                       onChange={(e) => setInstruction20(e.target.value)}
                       id = 'instruction20'
                       name = 'instruction20'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 22 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction21}
                       onChange={(e) => setInstruction21(e.target.value)}
                       id = 'instruction21'
                       name = 'instruction21'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 23 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction22}
                       onChange={(e) => setInstruction22(e.target.value)}
                       id = 'instruction22'
                       name = 'instruction22'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 24 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction23}
                       onChange={(e) => setInstruction23(e.target.value)}
                       id = 'instruction23'
                       name = 'instruction23'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 25 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction24}
                       onChange={(e) => setInstruction24(e.target.value)}
                       id = 'instruction24'
                       name = 'instruction24'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 26 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction25}
                       onChange={(e) => setInstruction25(e.target.value)}
                       id = 'instruction25'
                       name = 'instruction25'
                     />
                   </FormControl>
                   <div style={{marginTop: "1rem"}} className={classes.root}>
                     <input
                       accept="image/*"
                       className={classes.input}
                       id="photo"
                       type="file"
                       name = 'photo'
                       onChange={(e) => setPhoto(e.target.files[0])}
                     />
                     <label className="addButtons" htmlFor="photo">
                       <Button variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon />}>
                         Upload Recipe Photo
                       </Button>
                     </label>
                   </div>
                   <Button style={{width:'100%', marginTop: "1rem"}} startIcon={<SaveIcon />} variant="contained" type="submit">Save Recipe</Button>
                   <Button onClick={handleCloseModalRecipeUpdate} style={{width:'100%', marginTop: "1rem"}} color="primary" startIcon={<ClearIcon/>} variant="contained">Cancel</Button>
                 </form>
               </div>
             </div>
           </Fade>
         </Modal>
          </div>
        </div>
      </Fade>
    </Modal>
    <Modal
       aria-labelledby="transition-modal-title"
       aria-describedby="transition-modal-description"
       className={classes.modal}
       open={openModalIngredientsList}
       onClose={handleCloseModalIngredientsList}
       closeAfterTransition
       BackdropComponent={Backdrop}
       BackdropProps={{
         timeout: 500,
       }}
    >
      <Fade in={openModalIngredientsList}>
        <div className={ lowReso? classes.paper2LowReso : classes.paper2 }>
          <div>
          {loadingIngrd && <center><CircularProgress color='inherit' className = 'loading1' /></center>}
          {loadingDel && <center><CircularProgress color='inherit' className = 'loading1' /></center>}
          {error && <div>{error}</div>}
          <ClearIcon onClick={handleCloseModalIngredientsList} />
          <form style = {{ marginTop: '3%', marginBottom: '3%' }} onSubmit={submitHandlerForSearchIng}>
            <TextField
              placeholder = 'Search for ingredients?'
              className = 'searchBar'
              id="outlined-search"
              style = {{ display: loadingUpdt && 'none' }}
              type="search"
              variant="outlined"
              name="searchKeywordIng"
              onChange={(e) => setSearchKeywordIng(e.target.value)}
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              style={{ marginLeft: '10px' }}
            >
              Search
            </Button>
          </form>
          {lowReso ?
            <TableContainer style = {{ display: loading && 'none' }} component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow style={{ marginTop:"1rem" }} >
                    <TableCell><div className={classes.tableCell1}>Name</div></TableCell>
                    <TableCell><div className={classes.tableCell1}>Delete</div></TableCell>
                  </TableRow>
                </TableHead>
                {ingredientsListPaginate.map((ingredient, index) => (
                  createPotato(ingredient, index)
                ))}
              </Table>
            </TableContainer>
          :
          <TableContainer style = {{ display: loading && 'none' }} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow style={{ marginTop:"1rem" }} >
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Measurement</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              {ingredientsListPaginate.map((ingredient, index) => (
                createPotato(ingredient, index)
              ))}
            </Table>
          </TableContainer>
          }

          <Pagination
            style = {{ display: loading && 'none', marginTop: "1rem" }}
            count={pageDetailsIng && pageDetailsIng.totalPages}
            page={pageDetailsIng && pageDetailsIng.pageIndex}
            defaultPage={1}
            color="primary"
            size="large"
            onChange={handleChangePageIndexIng}
            classes={{ ul: classes.paginator }}
          />
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openModalRecipeUpdate}
            onClose={handleCloseModalRecipeUpdate}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
         >
           <Fade in={openModalRecipeUpdate}>
             <div className={classes.paper1}>
               <div className = 'container'>
                 <form onSubmit = {submitHandlerForRecipeUpdate} className = 'form-container'>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Name of the recipe</InputLabel>
                     <Input
                       type = "text"
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                       required
                       id = 'name'
                       name = 'name'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <TextField
                       id="description"
                       label="Description"
                       value={description}
                       multiline
                       name="description"
                       onChange={(e) => setDescription(e.target.value)}
                       variant="outlined"
                       rows={4}
                     />
                   </FormControl>
                   <FormControl className={classes.formControl}>
                      <InputLabel id="category-label">Select Category</InputLabel>
                      <Select
                        labelId="category-label"
                        id="category"
                        multiple
                        required
                        value={category}
                        onChange={handleChange}
                        renderValue={(selected) => (
                          <div className={classes.chips}>
                            <option value = "">Select Category</option>
                            {selected.map((value) => (
                              <Chip key={value} label={categList.find(c => c._id === value)?.name} className={classes.chip} />
                            ))}
                          </div>
                        )}
                      >
                        {categList.map((c) => (
                          <MenuItem key={c._id} value={c._id}>
                            {c.name}
                          </MenuItem>
                        ))}
                      </Select>
                   </FormControl>
                   {/*<FormControl required className={(classes.margin, classes.textField)}>
                     <Select
                       native
                       required
                       variant="outlined"
                       onChange={(e) => setCategory(e.target.value)}
                       value={category}
                       inputProps={{
                         name: 'category',
                         id: 'category',
                       }}
                     >
                       <option value = "">Select Category</option>
                       {
                        categList.map((c, i) => (
                          <option key={i} value={c._id}>
                              {c.name}
                          </option>
                       ))}
                     </Select>
                   </FormControl>*/}
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Ingredient 2 (required)</InputLabel>
                     <Input
                       type = "text"
                       value={ingredients1}
                       onChange={(e) => setIngredients1(e.target.value)}
                       required
                       id = 'ingredients1'
                       name = 'ingredients1'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Ingredient 3 (required)</InputLabel>
                     <Input
                       type = "text"
                       value={ingredients2}
                       onChange={(e) => setIngredients2(e.target.value)}
                       required
                       id = 'ingredients2'
                       name = 'ingredients2'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Ingredient 4 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={ingredients3}
                       onChange={(e) => setIngredients3(e.target.value)}
                       id = 'ingredients3'
                       name = 'ingredients3'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Ingredient 5 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={ingredients4}
                       onChange={(e) => setIngredients4(e.target.value)}
                       id = 'ingredients4'
                       name = 'ingredients4'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Ingredient 6 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={ingredients5}
                       onChange={(e) => setIngredients5(e.target.value)}
                       id = 'ingredients5'
                       name = 'ingredients5'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Ingredient 7 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={ingredients6}
                       onChange={(e) => setIngredients6(e.target.value)}
                       id = 'ingredients6'
                       name = 'ingredients6'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Ingredient 8 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={ingredients7}
                       onChange={(e) => setIngredients7(e.target.value)}
                       id = 'ingredients7'
                       name = 'ingredients7'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Ingredient 9 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={ingredients8}
                       onChange={(e) => setIngredients8(e.target.value)}
                       id = 'ingredients8'
                       name = 'ingredients8'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Ingredient 10 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={ingredients9}
                       onChange={(e) => setIngredients9(e.target.value)}
                       id = 'ingredients9'
                       name = 'ingredients9'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Ingredient 11 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={ingredients10}
                       onChange={(e) => setIngredients10(e.target.value)}
                       id = 'ingredients10'
                       name = 'ingredients10'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Ingredient 12 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={ingredients11}
                       onChange={(e) => setIngredients11(e.target.value)}
                       id = 'ingredients11'
                       name = 'ingredients11'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Ingredient 13 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={ingredients12}
                       onChange={(e) => setIngredients12(e.target.value)}
                       id = 'ingredients12'
                       name = 'ingredients12'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Ingredient 14 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={ingredients13}
                       onChange={(e) => setIngredients13(e.target.value)}
                       id = 'ingredients13'
                       name = 'ingredients13'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Ingredient 15 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={ingredients14}
                       onChange={(e) => setIngredients14(e.target.value)}
                       id = 'ingredients14'
                       name = 'ingredients14'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Ingredient 16 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={ingredients15}
                       onChange={(e) => setIngredients15(e.target.value)}
                       id = 'ingredients15'
                       name = 'ingredients15'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Ingredient 17 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={ingredients16}
                       onChange={(e) => setIngredients16(e.target.value)}
                       id = 'ingredients16'
                       name = 'ingredients16'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Ingredient 18 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={ingredients17}
                       onChange={(e) => setIngredients17(e.target.value)}
                       id = 'ingredients17'
                       name = 'ingredients17'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Ingredient 19 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={ingredients18}
                       onChange={(e) => setIngredients18(e.target.value)}
                       id = 'ingredients18'
                       name = 'ingredients18'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Ingredient 20 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={ingredients19}
                       onChange={(e) => setIngredients19(e.target.value)}
                       id = 'ingredients19'
                       name = 'ingredients19'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Ingredient 21 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={ingredients20}
                       onChange={(e) => setIngredients20(e.target.value)}
                       id = 'ingredients20'
                       name = 'ingredients20'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Ingredient 22 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={ingredients21}
                       onChange={(e) => setIngredients21(e.target.value)}
                       id = 'ingredients21'
                       name = 'ingredients21'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Ingredient 23 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={ingredients22}
                       onChange={(e) => setIngredients22(e.target.value)}
                       id = 'ingredients22'
                       name = 'ingredients22'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Ingredient 24 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={ingredients23}
                       onChange={(e) => setIngredients23(e.target.value)}
                       id = 'ingredients23'
                       name = 'ingredients23'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Ingredient 25 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={ingredients24}
                       onChange={(e) => setIngredients24(e.target.value)}
                       id = 'ingredients24'
                       name = 'ingredients24'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Ingredient 26 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={ingredients25}
                       onChange={(e) => setIngredients25(e.target.value)}
                       id = 'ingredients25'
                       name = 'ingredients25'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 1 (required)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction}
                       onChange={(e) => setInstruction(e.target.value)}
                       required
                       id = 'instruction'
                       name = 'instruction'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 2 (required)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction1}
                       onChange={(e) => setInstruction1(e.target.value)}
                       required
                       id = 'instruction1'
                       name = 'instruction1'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 3 (required)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction2}
                       onChange={(e) => setInstruction2(e.target.value)}
                       required
                       id = 'instruction2'
                       name = 'instruction2'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 4 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction3}
                       onChange={(e) => setInstruction3(e.target.value)}
                       id = 'instruction3'
                       name = 'instruction3'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 5 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction4}
                       onChange={(e) => setInstruction4(e.target.value)}
                       id = 'instruction4'
                       name = 'instruction4'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 6 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction5}
                       onChange={(e) => setInstruction5(e.target.value)}
                       id = 'instruction5'
                       name = 'instruction5'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 7 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction6}
                       onChange={(e) => setInstruction6(e.target.value)}
                       id = 'instruction6'
                       name = 'instruction6'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 8 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction7}
                       onChange={(e) => setInstruction7(e.target.value)}
                       id = 'instruction7'
                       name = 'instruction7'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 9 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction8}
                       onChange={(e) => setInstruction8(e.target.value)}
                       id = 'instruction8'
                       name = 'instruction8'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 10 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction9}
                       onChange={(e) => setInstruction9(e.target.value)}
                       id = 'instruction9'
                       name = 'instruction9'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 11 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction10}
                       onChange={(e) => setInstruction10(e.target.value)}
                       id = 'instruction10'
                       name = 'instruction10'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 12 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction11}
                       onChange={(e) => setInstruction11(e.target.value)}
                       id = 'instruction11'
                       name = 'instruction11'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 13 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction12}
                       onChange={(e) => setInstruction12(e.target.value)}
                       id = 'instruction12'
                       name = 'instruction12'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 14 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction13}
                       onChange={(e) => setInstruction13(e.target.value)}
                       id = 'instruction13'
                       name = 'instruction13'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 15 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction14}
                       onChange={(e) => setInstruction14(e.target.value)}
                       id = 'instruction14'
                       name = 'instruction14'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 16 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction15}
                       onChange={(e) => setInstruction15(e.target.value)}
                       id = 'instruction15'
                       name = 'instruction15'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 17 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction16}
                       onChange={(e) => setInstruction16(e.target.value)}
                       id = 'instruction16'
                       name = 'instruction16'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 18 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction17}
                       onChange={(e) => setInstruction17(e.target.value)}
                       id = 'instruction17'
                       name = 'instruction17'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 19 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction18}
                       onChange={(e) => setInstruction18(e.target.value)}
                       id = 'instruction18'
                       name = 'instruction18'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 20 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction19}
                       onChange={(e) => setInstruction19(e.target.value)}
                       id = 'instruction19'
                       name = 'instruction19'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 21 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction20}
                       onChange={(e) => setInstruction20(e.target.value)}
                       id = 'instruction20'
                       name = 'instruction20'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 22 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction21}
                       onChange={(e) => setInstruction21(e.target.value)}
                       id = 'instruction21'
                       name = 'instruction21'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 23 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction22}
                       onChange={(e) => setInstruction22(e.target.value)}
                       id = 'instruction22'
                       name = 'instruction22'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 24 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction23}
                       onChange={(e) => setInstruction23(e.target.value)}
                       id = 'instruction23'
                       name = 'instruction23'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 25 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction24}
                       onChange={(e) => setInstruction24(e.target.value)}
                       id = 'instruction24'
                       name = 'instruction24'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 26 (unneed)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction25}
                       onChange={(e) => setInstruction25(e.target.value)}
                       id = 'instruction25'
                       name = 'instruction25'
                     />
                   </FormControl>
                   <div style={{marginTop: "1rem"}} className={classes.root}>
                     <input
                       accept="image/*"
                       className={classes.input}
                       id="photo"
                       required
                       type="file"
                       name = 'photo'
                       onChange={(e) => setPhoto(e.target.files[0])}
                     />
                     <label className="addButtons" htmlFor="photo">
                       <Button variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon />}>
                         Upload Recipe Photo
                       </Button>
                     </label>
                   </div>
                   <Button style={{width:'100%', marginTop: "1rem"}} startIcon={<SaveIcon />} variant="contained" type="submit">Save Recipe</Button>
                   <Button onClick={handleCloseModalRecipeUpdate} style={{width:'100%', marginTop: "1rem"}} color="primary" startIcon={<ClearIcon/>} variant="contained">Cancel</Button>
                 </form>
               </div>
             </div>
           </Fade>
         </Modal>
          </div>
        </div>
      </Fade>
    </Modal>

    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openModalCategoryList}
      onClose={handleCloseModalCategoryList}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModalCategoryList}>
        <div className={ lowReso? classes.paper2LowReso : classes.paper2 }>
          <div>
          {loadingCategPag && <center><CircularProgress color='inherit' className = 'loading1' /></center>}
          {loadingDelCateg && <center><CircularProgress color='inherit' className = 'loading1' /></center>}
          {errorCategPag && <div>{errorCategPag}</div>}
          <ClearIcon onClick={handleCloseModalCategoryList} />
          <form style = {{ marginTop: '3%', marginBottom: '3%' }} onSubmit={submitHandlerForSearchCat}>
            <TextField
              placeholder = 'Search for categories?'
              className = 'searchBar'
              id="outlined-search"
              style = {{ display: loadingUpdt && 'none' }}
              type="search"
              variant="outlined"
              name="searchKeywordCat"
              onChange={(e) => setSearchKeywordCat(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginLeft: '10px' }}
            >
              Search
            </Button>
          </form>
          {lowReso ?
            <TableContainer style = {{ display: loadingCategPag && 'none' }} component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow style={{ marginTop:"1rem" }} >
                    <TableCell><div className={classes.tableCell1}>Name</div></TableCell>
                    <TableCell><div className={classes.tableCell1}>Delete</div></TableCell>
                  </TableRow>
                </TableHead>
                {categListPaginate.map((categ, index) => (
                  createKiwi(categ, index)
                ))}
              </Table>
            </TableContainer>
          :
          <TableContainer style = {{ display: loadingCategPag && 'none' }} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow style={{ marginTop:"1rem" }} >
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              {categListPaginate.map((categ, index) => (
                createKiwi(categ, index)
              ))}
            </Table>
          </TableContainer>
          }

          <Pagination
            style = {{ display: loading && 'none', marginTop: "1rem" }}
            count={pageDetailsCat && pageDetailsCat.totalPages}
            page={pageDetailsCat && pageDetailsCat.pageIndex}
            defaultPage={1}
            color="primary"
            size="large"
            onChange={handleChangePageIndexCat}
            classes={{ ul: classes.paginator }}
          />
          </div>
        </div>
      </Fade>
    </Modal>

    
     <Modal
       aria-labelledby="transition-modal-title"
       aria-describedby="transition-modal-description"
       className={classes.modal}
       open={openModalRecipe}
       onClose={handleCloseModalRecipe}
       closeAfterTransition
       BackdropComponent={Backdrop}
       BackdropProps={{
         timeout: 500,
       }}
    >
      <Fade in={openModalRecipe}>
        <div className={classes.paper1}>
          <div className = 'container'>
            <form onSubmit = {submitHandlerForRecipe} className = 'form-container'>
              <FormControl className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Name of the recipe</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setName(e.target.value)}
                  required
                  id = 'name'
                  name = 'name'
                />
              </FormControl>
              <FormControl className={(classes.margin, classes.textField)}>
                <TextField
                  id="description"
                  label="Description"
                  multiline
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                  variant="outlined"
                  rows={4}
                />
              </FormControl>
              {/*<FormControl required className={(classes.margin, classes.textField)}>
                <Select
                  native
                  variant="outlined"
                  onChange={(e) => setCategory(e.target.value)}
                  inputProps={{
                    name: 'category',
                    id: 'category',
                  }}
                >
                  <option value = "">Select Category</option>
                  {
                   categList.map((c, i) => (
                     <option key={i} value={c._id}>
                         {c.name}
                     </option>
                  ))}
                </Select>
              </FormControl>*/}
              <FormControl className={classes.formControl}>
                <InputLabel id="category-label">Select Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  multiple
                  required
                  value={category}
                  onChange={handleChange}
                  renderValue={(selected) => (
                    <div className={classes.chips}>
                      {selected.map((value) => (
                        <Chip key={value} label={categList.find(c => c._id === value)?.name} className={classes.chip} />
                      ))}
                    </div>
                  )}
                >
                  {categList.map((c) => (
                    <MenuItem key={c._id} value={c._id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div className='selectOneLiner'> 
                <FormControl className={(classes.margin, classes.textField1)}>
                  <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                  <Input
                    type = "text"
                    onChange={(e) => setMeasurement(e.target.value)}
                    required
                    id = 'measurement'
                    name = 'measurement'
                  />
                </FormControl>
                <FormControl required className={(classes.margin, classes.textField1)}>
                  <Select
                    native
                    variant="outlined"
                    onChange={(e) => setIngredients(e.target.value)}
                    inputProps={{
                      name: 'ingredients',
                      id: 'ingredients',
                    }}
                  >
                    <option value = "">Select Ingredient 1 (Required)</option>
                    {
                    ingredientsList.map((ing, indx) => (
                      <option key={indx} value={ing._id}>
                          {ing.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='selectOneLiner'> 
                <FormControl className={(classes.margin, classes.textField1)}>
                  <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                  <Input
                    type = "text"
                    onChange={(e) => setMeasurement1(e.target.value)}
                    required
                    id = 'measurement'
                    name = 'measurement'
                  />
                </FormControl>
                <FormControl required className={(classes.margin, classes.textField1)}>
                  <Select
                    native
                    variant="outlined"
                    onChange={(e) => setIngredients1(e.target.value)}
                    inputProps={{
                      name: 'ingredients',
                      id: 'ingredients',
                    }}
                  >
                    <option value = "">Select Ingredient 2 (Required)</option>
                    {
                    ingredientsList.map((ing, indx) => (
                      <option key={indx} value={ing._id}>
                          {ing.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='selectOneLiner'> 
                <FormControl className={(classes.margin, classes.textField1)}>
                  <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                  <Input
                    type = "text"
                    onChange={(e) => setMeasurement2(e.target.value)}
                    required
                    id = 'measurement'
                    name = 'measurement'
                  />
                </FormControl>
                <FormControl onChange={handleShowIngredient4} required className={(classes.margin, classes.textField1)}>
                  <Select
                    native
                    variant="outlined"
                    onChange={(e) => setIngredients2(e.target.value)}
                    inputProps={{
                      name: 'ingredients',
                      id: 'ingredients',
                    }}
                  >
                    <option value = "">Select Ingredient 3 (Required)</option>
                    {
                    ingredientsList.map((ing, indx) => (
                      <option key={indx} value={ing._id}>
                          {ing.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='selectOneLiner' hidden={!showIngredient4}> 
                <FormControl className={(classes.margin, classes.textField1)}>
                  <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                  <Input
                    type = "text"
                    onChange={(e) => setMeasurement3(e.target.value)}
                    id = 'measurement'
                    name = 'measurement'
                  />
                </FormControl>
                <FormControl onChange={handleShowIngredient5} className={(classes.margin, classes.textField1)}>
                  <Select
                    native
                    variant="outlined"
                    onChange={(e) => setIngredients3(e.target.value)}
                    inputProps={{
                      name: 'ingredients3',
                      id: 'ingredients3',
                    }}
                  >
                    <option value = "">Select Ingredient 4 (Unneed)</option>
                    {
                    ingredientsList.map((ing, indx) => (
                      <option key={indx} value={ing._id}>
                          {ing.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='selectOneLiner' hidden={!showIngredient5}> 
                <FormControl className={(classes.margin, classes.textField1)}>
                  <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                  <Input
                    type = "text"
                    onChange={(e) => setMeasurement4(e.target.value)}
                    id = 'measurement'
                    name = 'measurement'
                  />
                </FormControl>
                <FormControl onChange={handleShowIngredient6} className={(classes.margin, classes.textField1)}>
                  <Select
                    native
                    variant="outlined"
                    onChange={(e) => setIngredients4(e.target.value)}
                    inputProps={{
                      name: 'ingredients4',
                      id: 'ingredients4',
                    }}
                  >
                    <option value = "">Select Ingredient 5 (Unneed)</option>
                    {
                    ingredientsList.map((ing, indx) => (
                      <option key={indx} value={ing._id}>
                          {ing.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='selectOneLiner' hidden={!showIngredient6}> 
                <FormControl className={(classes.margin, classes.textField1)}>
                  <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                  <Input
                    type = "text"
                    onChange={(e) => setMeasurement5(e.target.value)}
                    id = 'measurement'
                    name = 'measurement'
                  />
                </FormControl>
                <FormControl onChange={handleShowIngredient7} className={(classes.margin, classes.textField1)}>
                  <Select
                    native
                    variant="outlined"
                    onChange={(e) => setIngredients5(e.target.value)}
                    inputProps={{
                      name: 'ingredients5',
                      id: 'ingredients5',
                    }}
                  >
                    <option value = "">Select Ingredient 6 (Unneed)</option>
                    {
                    ingredientsList.map((ing, indx) => (
                      <option key={indx} value={ing._id}>
                          {ing.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='selectOneLiner' hidden={!showIngredient7}> 
                <FormControl className={(classes.margin, classes.textField1)}>
                  <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                  <Input
                    type = "text"
                    onChange={(e) => setMeasurement6(e.target.value)}
                    id = 'measurement'
                    name = 'measurement'
                  />
                </FormControl>
                <FormControl onChange={handleShowIngredient8} className={(classes.margin, classes.textField1)}>
                  <Select
                    native
                    variant="outlined"
                    onChange={(e) => setIngredients6(e.target.value)}
                    inputProps={{
                      name: 'ingredients6',
                      id: 'ingredients6',
                    }}
                  >
                    <option value = "">Select Ingredient 7 (Unneed)</option>
                    {
                    ingredientsList.map((ing, indx) => (
                      <option key={indx} value={ing._id}>
                          {ing.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='selectOneLiner' hidden={!showIngredient8}> 
                <FormControl className={(classes.margin, classes.textField1)}>
                  <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                  <Input
                    type = "text"
                    onChange={(e) => setMeasurement7(e.target.value)}
                    id = 'measurement'
                    name = 'measurement'
                  />
                </FormControl>
                <FormControl onChange={handleShowIngredient9} className={(classes.margin, classes.textField1)}>
                  <Select
                    native
                    variant="outlined"
                    onChange={(e) => setIngredients7(e.target.value)}
                    inputProps={{
                      name: 'ingredients7',
                      id: 'ingredients7',
                    }}
                  >
                    <option value = "">Select Ingredient 8 (Unneed)</option>
                    {
                    ingredientsList.map((ing, indx) => (
                      <option key={indx} value={ing._id}>
                          {ing.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='selectOneLiner' hidden={!showIngredient9}> 
                <FormControl className={(classes.margin, classes.textField1)}>
                  <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                  <Input
                    type = "text"
                    onChange={(e) => setMeasurement8(e.target.value)}
                    id = 'measurement'
                    name = 'measurement'
                  />
                </FormControl>
                <FormControl onChange={handleShowIngredient10} className={(classes.margin, classes.textField1)}>
                  <Select
                    native
                    variant="outlined"
                    onChange={(e) => setIngredients8(e.target.value)}
                    inputProps={{
                      name: 'ingredients8',
                      id: 'ingredients8',
                    }}
                  >
                    <option value = "">Select Ingredient 9 (Unneed)</option>
                    {
                    ingredientsList.map((ing, indx) => (
                      <option key={indx} value={ing._id}>
                          {ing.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='selectOneLiner' hidden={!showIngredient10}> 
                <FormControl className={(classes.margin, classes.textField1)}>
                  <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                  <Input
                    type = "text"
                    onChange={(e) => setMeasurement9(e.target.value)}
                    id = 'measurement'
                    name = 'measurement'
                  />
                </FormControl>
                <FormControl onChange={handleShowIngredient11} className={(classes.margin, classes.textField1)}>
                  <Select
                    native
                    variant="outlined"
                    onChange={(e) => setIngredients9(e.target.value)}
                    inputProps={{
                      name: 'ingredients8',
                      id: 'ingredients8',
                    }}
                  >
                    <option value = "">Select Ingredient 10 (Unneed)</option>
                    {
                    ingredientsList.map((ing, indx) => (
                      <option key={indx} value={ing._id}>
                          {ing.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='selectOneLiner' hidden={!showIngredient11}> 
                <FormControl className={(classes.margin, classes.textField1)}>
                  <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                  <Input
                    type = "text"
                    onChange={(e) => setMeasurement10(e.target.value)}
                    id = 'measurement'
                    name = 'measurement'
                  />
                </FormControl>
                <FormControl onChange={handleShowIngredient12} className={(classes.margin, classes.textField1)}>
                  <Select
                    native
                    variant="outlined"
                    onChange={(e) => setIngredients10(e.target.value)}
                    inputProps={{
                      name: 'ingredients8',
                      id: 'ingredients8',
                    }}
                  >
                    <option value = "">Select Ingredient 11 (Unneed)</option>
                    {
                    ingredientsList.map((ing, indx) => (
                      <option key={indx} value={ing._id}>
                          {ing.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='selectOneLiner' hidden={!showIngredient12}> 
                <FormControl className={(classes.margin, classes.textField1)}>
                  <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                  <Input
                    type = "text"
                    onChange={(e) => setMeasurement11(e.target.value)}
                    id = 'measurement'
                    name = 'measurement'
                  />
                </FormControl>
                <FormControl onChange={handleShowIngredient13} className={(classes.margin, classes.textField1)}>
                  <Select
                    native
                    variant="outlined"
                    onChange={(e) => setIngredients11(e.target.value)}
                    inputProps={{
                      name: 'ingredients8',
                      id: 'ingredients8',
                    }}
                  >
                    <option value = "">Select Ingredient 12 (Unneed)</option>
                    {
                    ingredientsList.map((ing, indx) => (
                      <option key={indx} value={ing._id}>
                          {ing.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='selectOneLiner' hidden={!showIngredient13}> 
                <FormControl className={(classes.margin, classes.textField1)}>
                  <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                  <Input
                    type = "text"
                    onChange={(e) => setMeasurement12(e.target.value)}
                    id = 'measurement'
                    name = 'measurement'
                  />
                </FormControl>
                <FormControl onChange={handleShowIngredient14} className={(classes.margin, classes.textField1)}>
                  <Select
                    native
                    variant="outlined"
                    onChange={(e) => setIngredients12(e.target.value)}
                    inputProps={{
                      name: 'ingredients8',
                      id: 'ingredients8',
                    }}
                  >
                    <option value = "">Select Ingredient 13 (Unneed)</option>
                    {
                    ingredientsList.map((ing, indx) => (
                      <option key={indx} value={ing._id}>
                          {ing.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='selectOneLiner' hidden={!showIngredient14}> 
                <FormControl className={(classes.margin, classes.textField1)}>
                  <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                  <Input
                    type = "text"
                    onChange={(e) => setMeasurement13(e.target.value)}
                    id = 'measurement'
                    name = 'measurement'
                  />
                </FormControl>
                <FormControl onChange={handleShowIngredient15} className={(classes.margin, classes.textField1)}>
                  <Select
                    native
                    variant="outlined"
                    onChange={(e) => setIngredients13(e.target.value)}
                    inputProps={{
                      name: 'ingredients8',
                      id: 'ingredients8',
                    }}
                  >
                    <option value = "">Select Ingredient 14 (Unneed)</option>
                    {
                    ingredientsList.map((ing, indx) => (
                      <option key={indx} value={ing._id}>
                          {ing.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='selectOneLiner' hidden={!showIngredient15}> 
                <FormControl className={(classes.margin, classes.textField1)}>
                  <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                  <Input
                    type = "text"
                    onChange={(e) => setMeasurement14(e.target.value)}
                    id = 'measurement'
                    name = 'measurement'
                  />
                </FormControl>
                <FormControl onChange={handleShowIngredient16} className={(classes.margin, classes.textField1)}>
                  <Select
                    native
                    variant="outlined"
                    onChange={(e) => setIngredients14(e.target.value)}
                    inputProps={{
                      name: 'ingredients8',
                      id: 'ingredients8',
                    }}
                  >
                    <option value = "">Select Ingredient 15 (Unneed)</option>
                    {
                    ingredientsList.map((ing, indx) => (
                      <option key={indx} value={ing._id}>
                          {ing.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='selectOneLiner' hidden={!showIngredient16}> 
                <FormControl className={(classes.margin, classes.textField1)}>
                  <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                  <Input
                    type = "text"
                    onChange={(e) => setMeasurement15(e.target.value)}
                    id = 'measurement'
                    name = 'measurement'
                  />
                </FormControl>
                <FormControl onChange={handleShowIngredient17} className={(classes.margin, classes.textField1)}>
                  <Select
                    native
                    variant="outlined"
                    onChange={(e) => setIngredients15(e.target.value)}
                    inputProps={{
                      name: 'ingredients8',
                      id: 'ingredients8',
                    }}
                  >
                    <option value = "">Select Ingredient 16 (Unneed)</option>
                    {
                    ingredientsList.map((ing, indx) => (
                      <option key={indx} value={ing._id}>
                          {ing.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='selectOneLiner' hidden={!showIngredient17}> 
                <FormControl className={(classes.margin, classes.textField1)}>
                  <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                  <Input
                    type = "text"
                    onChange={(e) => setMeasurement16(e.target.value)}
                    id = 'measurement'
                    name = 'measurement'
                  />
                </FormControl>
                <FormControl onChange={handleShowIngredient18} className={(classes.margin, classes.textField1)}>
                  <Select
                    native
                    variant="outlined"
                    onChange={(e) => setIngredients16(e.target.value)}
                    inputProps={{
                      name: 'ingredients8',
                      id: 'ingredients8',
                    }}
                  >
                    <option value = "">Select Ingredient 17 (Unneed)</option>
                    {
                    ingredientsList.map((ing, indx) => (
                      <option key={indx} value={ing._id}>
                          {ing.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='selectOneLiner' hidden={!showIngredient18}> 
                <FormControl className={(classes.margin, classes.textField1)}>
                  <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                  <Input
                    type = "text"
                    onChange={(e) => setMeasurement17(e.target.value)}
                    id = 'measurement'
                    name = 'measurement'
                  />
                </FormControl>
                <FormControl onChange={handleShowIngredient19} className={(classes.margin, classes.textField1)}>
                  <Select
                    native
                    variant="outlined"
                    onChange={(e) => setIngredients17(e.target.value)}
                    inputProps={{
                      name: 'ingredients8',
                      id: 'ingredients8',
                    }}
                  >
                    <option value = "">Select Ingredient 18 (Unneed)</option>
                    {
                    ingredientsList.map((ing, indx) => (
                      <option key={indx} value={ing._id}>
                          {ing.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='selectOneLiner' hidden={!showIngredient19}> 
                <FormControl className={(classes.margin, classes.textField1)}>
                  <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                  <Input
                    type = "text"
                    onChange={(e) => setMeasurement18(e.target.value)}
                    id = 'measurement'
                    name = 'measurement'
                  />
                </FormControl>
                <FormControl onChange={handleShowIngredient20} className={(classes.margin, classes.textField1)}>
                  <Select
                    native
                    variant="outlined"
                    onChange={(e) => setIngredients18(e.target.value)}
                    inputProps={{
                      name: 'ingredients8',
                      id: 'ingredients8',
                    }}
                  >
                    <option value = "">Select Ingredient 19 (Unneed)</option>
                    {
                    ingredientsList.map((ing, indx) => (
                      <option key={indx} value={ing._id}>
                          {ing.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='selectOneLiner' hidden={!showIngredient20}> 
                <FormControl className={(classes.margin, classes.textField1)}>
                  <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                  <Input
                    type = "text"
                    onChange={(e) => setMeasurement19(e.target.value)}
                    id = 'measurement'
                    name = 'measurement'
                  />
                </FormControl>
                <FormControl onChange={handleShowIngredient21} className={(classes.margin, classes.textField1)}>
                  <Select
                    native
                    variant="outlined"
                    onChange={(e) => setIngredients19(e.target.value)}
                    inputProps={{
                      name: 'ingredients8',
                      id: 'ingredients8',
                    }}
                  >
                    <option value = "">Select Ingredient 20 (Unneed)</option>
                    {
                    ingredientsList.map((ing, indx) => (
                      <option key={indx} value={ing._id}>
                          {ing.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='selectOneLiner' hidden={!showIngredient21}> 
                <FormControl className={(classes.margin, classes.textField1)}>
                  <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                  <Input
                    type = "text"
                    onChange={(e) => setMeasurement20(e.target.value)}
                    id = 'measurement'
                    name = 'measurement'
                  />
                </FormControl>
                <FormControl onChange={handleShowIngredient22} className={(classes.margin, classes.textField1)}>
                  <Select
                    native
                    variant="outlined"
                    onChange={(e) => setIngredients20(e.target.value)}
                    inputProps={{
                      name: 'ingredients8',
                      id: 'ingredients8',
                    }}
                  >
                    <option value = "">Select Ingredient 21 (Unneed)</option>
                    {
                    ingredientsList.map((ing, indx) => (
                      <option key={indx} value={ing._id}>
                          {ing.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='selectOneLiner' hidden={!showIngredient22}> 
                <FormControl className={(classes.margin, classes.textField1)}>
                  <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                  <Input
                    type = "text"
                    onChange={(e) => setMeasurement21(e.target.value)}
                    id = 'measurement'
                    name = 'measurement'
                  />
                </FormControl>
                <FormControl onChange={handleShowIngredient23} className={(classes.margin, classes.textField1)}>
                  <Select
                    native
                    variant="outlined"
                    onChange={(e) => setIngredients21(e.target.value)}
                    inputProps={{
                      name: 'ingredients8',
                      id: 'ingredients8',
                    }}
                  >
                    <option value = "">Select Ingredient 22 (Unneed)</option>
                    {
                    ingredientsList.map((ing, indx) => (
                      <option key={indx} value={ing._id}>
                          {ing.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='selectOneLiner' hidden={!showIngredient23}> 
                <FormControl className={(classes.margin, classes.textField1)}>
                  <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                  <Input
                    type = "text"
                    onChange={(e) => setMeasurement22(e.target.value)}
                    id = 'measurement'
                    name = 'measurement'
                  />
                </FormControl>
                <FormControl onChange={handleShowIngredient24} className={(classes.margin, classes.textField1)}>
                  <Select
                    native
                    variant="outlined"
                    onChange={(e) => setIngredients22(e.target.value)}
                    inputProps={{
                      name: 'ingredients8',
                      id: 'ingredients8',
                    }}
                  >
                    <option value = "">Select Ingredient 23 (Unneed)</option>
                    {
                    ingredientsList.map((ing, indx) => (
                      <option key={indx} value={ing._id}>
                          {ing.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='selectOneLiner' hidden={!showIngredient24}> 
                <FormControl className={(classes.margin, classes.textField1)}>
                  <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                  <Input
                    type = "text"
                    onChange={(e) => setMeasurement23(e.target.value)}
                    id = 'measurement'
                    name = 'measurement'
                  />
                </FormControl>
                <FormControl onChange={handleShowIngredient25} className={(classes.margin, classes.textField1)}>
                  <Select
                    native
                    variant="outlined"
                    onChange={(e) => setIngredients23(e.target.value)}
                    inputProps={{
                      name: 'ingredients8',
                      id: 'ingredients8',
                    }}
                  >
                    <option value = "">Select Ingredient 24 (Unneed)</option>
                    {
                    ingredientsList.map((ing, indx) => (
                      <option key={indx} value={ing._id}>
                          {ing.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='selectOneLiner' hidden={!showIngredient25}> 
                <FormControl className={(classes.margin, classes.textField1)}>
                  <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                  <Input
                    type = "text"
                    onChange={(e) => setMeasurement24(e.target.value)}
                    id = 'measurement'
                    name = 'measurement'
                  />
                </FormControl>
                <FormControl onChange={handleShowIngredient26} className={(classes.margin, classes.textField1)}>
                  <Select
                    native
                    variant="outlined"
                    onChange={(e) => setIngredients24(e.target.value)}
                    inputProps={{
                      name: 'ingredients8',
                      id: 'ingredients8',
                    }}
                  >
                    <option value = "">Select Ingredient 25 (Unneed)</option>
                    {
                    ingredientsList.map((ing, indx) => (
                      <option key={indx} value={ing._id}>
                          {ing.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='selectOneLiner' hidden={!showIngredient26}> 
                <FormControl className={(classes.margin, classes.textField1)}>
                  <InputLabel color="primary">Input Measurement (Number only)</InputLabel>
                  <Input
                    type = "text"
                    onChange={(e) => setMeasurement25(e.target.value)}
                    id = 'measurement'
                    name = 'measurement'
                  />
                </FormControl>
                <FormControl className={(classes.margin, classes.textField1)}>
                  <Select
                    native
                    variant="outlined"
                    onChange={(e) => setIngredients25(e.target.value)}
                    inputProps={{
                      name: 'ingredients8',
                      id: 'ingredients8',
                    }}
                  >
                    <option value = "">Select Ingredient 26 (Unneed)</option>
                    {
                    ingredientsList.map((ing, indx) => (
                      <option key={indx} value={ing._id}>
                          {ing.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <FormControl className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 1 (required)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction(e.target.value)}
                  required
                  id = 'instruction'
                  name = 'instruction'
                />
              </FormControl>
              <FormControl className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 2 (required)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction1(e.target.value)}
                  required
                  id = 'instruction1'
                  name = 'instruction1'
                />
              </FormControl>
              <FormControl onChange={handleShowInstruction4} className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 3 (required)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction2(e.target.value)}
                  required
                  id = 'instruction2'
                  name = 'instruction2'
                />
              </FormControl>
              <FormControl onChange={handleShowInstruction5} hidden={!showInstruction4} className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 4 (unneed)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction3(e.target.value)}
                  id = 'instruction3'
                  name = 'instruction3'
                />
              </FormControl>
              <FormControl onChange={handleShowInstruction6} hidden={!showInstruction5} className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 5 (unneed)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction4(e.target.value)}
                  id = 'instruction4'
                  name = 'instruction4'
                />
              </FormControl>
              <FormControl onChange={handleShowInstruction7} hidden={!showInstruction6} className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 6 (unneed)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction5(e.target.value)}
                  id = 'instruction5'
                  name = 'instruction5'
                />
              </FormControl>
              <FormControl onChange={handleShowInstruction8} hidden={!showInstruction7} className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 7 (unneed)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction6(e.target.value)}
                  id = 'instruction6'
                  name = 'instruction6'
                />
              </FormControl>
              <FormControl onChange={handleShowInstruction9} hidden={!showInstruction8} className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 8 (unneed)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction7(e.target.value)}
                  id = 'instruction7'
                  name = 'instruction7'
                />
              </FormControl>
              <FormControl onChange={handleShowInstruction10} hidden={!showInstruction9} className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 9 (unneed)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction8(e.target.value)}
                  id = 'instruction8'
                  name = 'instruction8'
                />
              </FormControl>
              <FormControl onChange={handleShowInstruction11} hidden={!showInstruction10} className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 10 (unneed)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction9(e.target.value)}
                  id = 'instruction9'
                  name = 'instruction9'
                />
              </FormControl>
              <FormControl onChange={handleShowInstruction12} hidden={!showInstruction11} className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 11 (unneed)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction10(e.target.value)}
                  id = 'instruction10'
                  name = 'instruction10'
                />
              </FormControl>
              <FormControl onChange={handleShowInstruction13} hidden={!showInstruction12} className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 12 (unneed)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction11(e.target.value)}
                  id = 'instruction11'
                  name = 'instruction11'
                />
              </FormControl>
              <FormControl onChange={handleShowInstruction14} hidden={!showInstruction13} className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 13 (unneed)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction12(e.target.value)}
                  id = 'instruction12'
                  name = 'instruction12'
                />
              </FormControl>
              <FormControl onChange={handleShowInstruction15} hidden={!showInstruction14} className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 14 (unneed)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction13(e.target.value)}
                  id = 'instruction13'
                  name = 'instruction13'
                />
              </FormControl>
              <FormControl onChange={handleShowInstruction16} hidden={!showInstruction15} className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 15 (unneed)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction14(e.target.value)}
                  id = 'instruction14'
                  name = 'instruction14'
                />
              </FormControl>
              <FormControl onChange={handleShowInstruction17} hidden={!showInstruction16} className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 16 (unneed)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction15(e.target.value)}
                  id = 'instruction15'
                  name = 'instruction15'
                />
              </FormControl>
              <FormControl onChange={handleShowInstruction18} hidden={!showInstruction17} className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 17 (unneed)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction16(e.target.value)}
                  id = 'instruction16'
                  name = 'instruction16'
                />
              </FormControl>
              <FormControl onChange={handleShowInstruction19} hidden={!showInstruction18} className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 18 (unneed)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction17(e.target.value)}
                  id = 'instruction17'
                  name = 'instruction17'
                />
              </FormControl>
              <FormControl onChange={handleShowInstruction20} hidden={!showInstruction19} className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 19 (unneed)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction18(e.target.value)}
                  id = 'instruction18'
                  name = 'instruction18'
                />
              </FormControl>
              <FormControl onChange={handleShowInstruction21} hidden={!showInstruction20} className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 20 (unneed)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction19(e.target.value)}
                  id = 'instruction19'
                  name = 'instruction19'
                />
              </FormControl>
              <FormControl onChange={handleShowInstruction22} hidden={!showInstruction21} className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 21 (unneed)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction20(e.target.value)}
                  id = 'instruction20'
                  name = 'instruction20'
                />
              </FormControl>
              <FormControl onChange={handleShowInstruction23} hidden={!showInstruction22} className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 22 (unneed)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction21(e.target.value)}
                  id = 'instruction21'
                  name = 'instruction21'
                />
              </FormControl>
              <FormControl onChange={handleShowInstruction24} hidden={!showInstruction23} className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 23 (unneed)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction22(e.target.value)}
                  id = 'instruction22'
                  name = 'instruction22'
                />
              </FormControl>
              <FormControl onChange={handleShowInstruction25} hidden={!showInstruction24} className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 24 (unneed)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction23(e.target.value)}
                  id = 'instruction23'
                  name = 'instruction23'
                />
              </FormControl>
              <FormControl onChange={handleShowInstruction26} hidden={!showInstruction25} className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 25 (unneed)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction24(e.target.value)}
                  id = 'instruction24'
                  name = 'instruction24'
                />
              </FormControl>
              <FormControl hidden={!showInstruction26} className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 26 (unneed)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction25(e.target.value)}
                  id = 'instruction25'
                  name = 'instruction25'
                />
              </FormControl>
              <div style={{marginTop: "1rem"}} className={classes.root}>
                <input
                  accept="image/*"
                  required
                  className={classes.input}
                  id="photo"
                  type="file"
                  name = 'photo'
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
                <label className="addButtons" htmlFor="photo">
                  <Button variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon />}>
                    Upload Recipe Photo
                  </Button>
                </label>
              </div>
              <Button style={{width:'100%', marginTop: "1rem"}} startIcon={<SaveIcon />} variant="contained" type="submit">Save Recipe</Button>
              <Button onClick={handleCloseModalRecipe} style={{width:'100%', marginTop: "1rem"}} color="primary" startIcon={<ClearIcon/>} variant="contained">Cancel</Button>
            </form>
          </div>
        </div>
      </Fade>
    </Modal>
    </>
  )
}

export default AdminPage;
