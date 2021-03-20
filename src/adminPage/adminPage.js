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
import ClearIcon from '@material-ui/icons/Clear';
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
  table: {
    minWidth: '100%',
  },
  paper2: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width:'65rem',
    height: "100%",
  },
}));

const AdminPage = () => {
  const [openModalCategory, setOpenModalCategory] = useState(false);
  const [openModalRecipe, setOpenModalRecipe] = useState(false);
  const [openModalRecipeList, setOpenModalRecipeList] = useState(false);
  const [openModalRecipeUpdate, setOpenModalRecipeUpdate] = useState(false);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [openSnackBarForAdd, setOpenSnackBarForAdd] = useState(false);
  const [openSnackBarForDel, setOpenSnackBarForDel] = useState(false);
  const [openSnackBarForUpdt, setOpenSnackBarForUpdt] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const [categList, setCategList] = useState([]);

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
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
  const [photo, setPhoto] = useState('');
  const [photo1, setPhoto1] = useState('');

  //state for list Recipes
  const [recipeList, setRecipeList] = useState([]);
  const [pageDetails, setPageDetails] = useState(null);
  const [pageSize] = useState(7);

  const { loadingCatg, categoryAdd, errorCatg, success } = useSelector(state => state.addCategory);
  const { user } = useSelector((state) => state.userSignin);
  const { loadingAdd, recipe, errorAdd, successAdd } = useSelector(state => state.addRecipe);
  const { loadingUpdt, recipeUpdt, errorUpdt, successUpdt } = useSelector(state => state.recipeUpdate);
  const { loadingDel, errorDel, successDel } = useSelector(state => state.recipeDelete);
  const { loading, error } = useSelector(state => state.recipeListAll);

  const dispatch = useDispatch();
  const classes = useStyles();
  const recipeBy = user.name;

  const handleRecipeList = useCallback(
    (pageIndex = 1) => {
      dispatch(rbook.recipe.listAllRecipes(pageIndex, pageSize, searchKeyword))
        .then((data) => {
          if (data) {
            setRecipeList(data.docs);
            setPageDetails({
              pageIndex: data.page,
              pageSize: data.limit,
              totalPages: data.totalPages,
              totalDocs: data.totalDocs
            });
          }
        })
    },
    [dispatch, pageSize, searchKeyword],
  );

  const submitHandlerForSearch = (e) => {
    e.preventDefault();
    dispatch(rbook.recipe.listAllRecipes(searchKeyword));
  };

  const handleCategoryList = useCallback(
    () => {
      dispatch(rbook.category.listCategories())
        .then((data) => {
          if (data) {
            setCategList(data);
            console.log('CATEGORY DATA', data)
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

  const handleChangePageIndex = (event, value) => {
    handleRecipeList(value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const payload = { name, photo }
    dispatch(rbook.category.addCategory(payload)).then((data) => {
      if (data) {
        handleCategoryList();
      }
    });
    console.log('CATEGORY LIST', categList);
    setOpenSnackBar(true);
    setOpenModalCategory(false);
  }

  const submitHandlerForRecipe = (event) => {
    event.preventDefault();
    const payload = {
      name,
      description,
      category,
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
    event.preventDefault();
    const payload = {
      id,
      name,
      description,
      category,
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
      photo,
      photo1
    }
    dispatch(rbook.recipe.updateRecipe(payload)).then((data) => {
      if (data) {
        handleRecipeList();
      }
    });
    setOpenSnackBarForUpdt(true);
    setOpenModalRecipeUpdate(false);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
    setOpenSnackBarForDel(false);
    setOpenSnackBarForAdd(false);
    setOpenSnackBarForUpdt(false);
  };


  //modal for add category
  const handleOpenModalCategory = () => {
    setOpenModalCategory(true);
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
    setPhoto(recipe.photo);
    setPhoto1(recipe.photo1);
  };

  const handleCloseModalRecipeUpdate = () => {
    setOpenModalRecipeUpdate(false);
  };

  const handleCloseModalRecipeList = () => {
    setOpenModalRecipeList(false);
    setSearchKeyword('');
  };

  const handleDelete = (recipe) => {
    dispatch(rbook.recipe.deleteRecipe(recipe._id)).then((data) => {
      if (data) {
        handleRecipeList();
      }
    });
    setOpenSnackBarForDel(true);
  }

  const createBanana = (recipe, idx) => {
    return (
      <TableBody style = {{ display: loading || loadingDel && 'none' }} key={idx}>
        <TableCell>{recipe._id}</TableCell>
        <TableCell>{recipe.name}</TableCell>
        <TableCell>{recipe.rating.toFixed(1)}</TableCell>
        <TableCell>{recipe.recipeBy}</TableCell>
        <TableCell><EditIcon onClick={() => handleOpenModalRecipeUpdate(recipe)} color="primary"/></TableCell>
        <TableCell><DeleteIcon onClick={() => handleDelete(recipe)} color="secondary"/></TableCell>
      </TableBody>
    );
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
    console.log('UPDATE SUCCESSSS'),
    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={openSnackBarForUpdt} autoHideDuration={2000} onClose={handleClose}>
      <Alert severity="success">{recipeUpdt && recipeUpdt.name} updated!</Alert>
    </Snackbar>
  );

  document.title = 'Recipebook | Adminpage';

  return (
    loadingUpdt || loadingDel || loadingCatg || loadingAdd ? <center className='loading1' ><CircularProgress color = 'inherit' /></center> :
    <>
      {successDel && !errorDel && showSuccessDelete()}
      {success && !errorCatg && showSuccess()}
      {!success && errorCatg && showError()}
      {successAdd && !errorAdd && showSuccessForAddRecipe()}
      {!successAdd && errorAdd && showErrorForAddRecipe()}
      {successUpdt && !errorUpdt && showSuccessForUpdateRecipe()}
      {!successUpdt && errorUpdt && showErrorForUpdateRecipe()}
      <div style = {{ fontSize: 25 }}>
        <center className = 'adminPageTitle'>
          Admin Profile
        </center>
        <center style = {{marginTop: '1rem'}}>
          Admin Id: <div style = {{ color:'red' }}>{user._id}</div>
        </center>
        <center style = {{marginTop: '1rem'}}>
          Admin Name: <div style = {{ color:'red' }}>{user.name}</div>
        </center>
        <center style = {{marginTop: '1rem'}}>
          Admin Email: <div style = {{ color:'red' }}>{user.email}</div>
        </center>
      </div>
      <center style = {{marginTop: '1rem'}}>
        <Button onClick={handleOpenModalCategory} startIcon={<AddIcon/>} variant="contained" type="submit">Add Category</Button>
      </center>
      <center style = {{marginTop: '1rem'}}>
        <Button onClick={handleOpenModalRecipe} startIcon={<AddIcon/>} variant="contained" type="submit">Add Recipe</Button>
      </center>
      <center style = {{marginTop: '1rem'}}>
        <Button onClick={handleOpenModalRecipeList} startIcon={<ListIcon/>} variant="contained" type="submit">Recipe List</Button>
      </center>
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
       open={openModalRecipeList}
       onClose={handleCloseModalRecipeList}
       closeAfterTransition
       BackdropComponent={Backdrop}
       BackdropProps={{
         timeout: 500,
       }}
    >
      <Fade in={openModalRecipeList}>
        <div className={classes.paper2}>
          <div>
          {loading && <center><CircularProgress color='inherit' className = 'loading1' /></center>}
          {loadingDel && <center><CircularProgress color='inherit' className = 'loading1' /></center>}
          {error && <div>{error}</div>}
          <form style = {{ marginTop: '3%', marginBottom: '3%', display: loading || loadingDel || loadingUpdt && 'none' }} onSubmit={submitHandlerForSearch}>
            <TextField
              placeholder = 'Search for recipes?'
              className = 'searchBar'
              id="outlined-search"
              type="search"
              variant="outlined"
              name="searchKeyword"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </form>
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
                   <FormControl required className={(classes.margin, classes.textField)}>
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
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Ingredient 1 (required)</InputLabel>
                     <Input
                       type = "text"
                       value={ingredients}
                       onChange={(e) => setIngredients(e.target.value)}
                       required
                       id = 'ingredients'
                       name = 'ingredients'
                     />
                   </FormControl>
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
                     <InputLabel color="primary">Ingredient 4 (if necesarry)</InputLabel>
                     <Input
                       type = "text"
                       value={ingredients3}
                       onChange={(e) => setIngredients3(e.target.value)}
                       id = 'ingredients3'
                       name = 'ingredients3'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Ingredient 5 (if necesarry)</InputLabel>
                     <Input
                       type = "text"
                       value={ingredients4}
                       onChange={(e) => setIngredients4(e.target.value)}
                       id = 'ingredients4'
                       name = 'ingredients4'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Ingredient 6 (if necesarry)</InputLabel>
                     <Input
                       type = "text"
                       value={ingredients5}
                       onChange={(e) => setIngredients5(e.target.value)}
                       id = 'ingredients5'
                       name = 'ingredients5'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Ingredient 7 (if necesarry)</InputLabel>
                     <Input
                       type = "text"
                       value={ingredients6}
                       onChange={(e) => setIngredients6(e.target.value)}
                       id = 'ingredients6'
                       name = 'ingredients6'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Ingredient 8 (if necesarry)</InputLabel>
                     <Input
                       type = "text"
                       value={ingredients7}
                       onChange={(e) => setIngredients7(e.target.value)}
                       id = 'ingredients7'
                       name = 'ingredients7'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Ingredient 9 (if necesarry)</InputLabel>
                     <Input
                       type = "text"
                       value={ingredients8}
                       onChange={(e) => setIngredients8(e.target.value)}
                       id = 'ingredients8'
                       name = 'ingredients8'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Ingredient 10 (if necesarry)</InputLabel>
                     <Input
                       type = "text"
                       value={ingredients9}
                       onChange={(e) => setIngredients9(e.target.value)}
                       id = 'ingredients9'
                       name = 'ingredients9'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Ingredient 11 (if necesarry)</InputLabel>
                     <Input
                       type = "text"
                       value={ingredients10}
                       onChange={(e) => setIngredients10(e.target.value)}
                       id = 'ingredients10'
                       name = 'ingredients10'
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
                     <InputLabel color="primary">Instruction 4 (if necesarry)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction3}
                       onChange={(e) => setInstruction3(e.target.value)}
                       id = 'instruction3'
                       name = 'instruction3'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 5 (if necesarry)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction4}
                       onChange={(e) => setInstruction4(e.target.value)}
                       id = 'instruction4'
                       name = 'instruction4'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 6 (if necesarry)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction5}
                       onChange={(e) => setInstruction5(e.target.value)}
                       id = 'instruction5'
                       name = 'instruction5'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 7 (if necesarry)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction6}
                       onChange={(e) => setInstruction6(e.target.value)}
                       id = 'instruction6'
                       name = 'instruction6'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 8 (if necesarry)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction7}
                       onChange={(e) => setInstruction7(e.target.value)}
                       id = 'instruction7'
                       name = 'instruction7'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 9 (if necesarry)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction8}
                       onChange={(e) => setInstruction8(e.target.value)}
                       id = 'instruction8'
                       name = 'instruction8'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 10 (if necesarry)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction9}
                       onChange={(e) => setInstruction9(e.target.value)}
                       id = 'instruction9'
                       name = 'instruction9'
                     />
                   </FormControl>
                   <FormControl className={(classes.margin, classes.textField)}>
                     <InputLabel color="primary">Instruction 11 (if necesarry)</InputLabel>
                     <Input
                       type = "text"
                       value={instruction10}
                       onChange={(e) => setInstruction10(e.target.value)}
                       id = 'instruction10'
                       name = 'instruction10'
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
                         Upload Recipe Photo
                       </Button>
                     </label>
                   </div>
                   <div className={classes.root}>
                     <input
                       accept="image/*"
                       className={classes.input}
                       id="photo1"
                       required
                       type="file"
                       name = 'photo1'
                       onChange={(e) => setPhoto1(e.target.files[0])}
                     />
                     <label className="addButtons" htmlFor="photo1">
                       <Button variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon />}>
                         Upload Details Photo
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
              <FormControl required className={(classes.margin, classes.textField)}>
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
              </FormControl>
              <FormControl className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Ingredient 1 (required)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setIngredients(e.target.value)}
                  required
                  id = 'ingredients'
                  name = 'ingredients'
                />
              </FormControl>
              <FormControl className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Ingredient 2 (required)</InputLabel>
                <Input
                  type = "text"
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
                  onChange={(e) => setIngredients2(e.target.value)}
                  required
                  id = 'ingredients2'
                  name = 'ingredients2'
                />
              </FormControl>
              <FormControl className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Ingredient 4 (if necesarry)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setIngredients3(e.target.value)}
                  id = 'ingredients3'
                  name = 'ingredients3'
                />
              </FormControl>
              <FormControl className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Ingredient 5 (if necesarry)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setIngredients4(e.target.value)}
                  id = 'ingredients4'
                  name = 'ingredients4'
                />
              </FormControl>
              <FormControl className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Ingredient 6 (if necesarry)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setIngredients5(e.target.value)}
                  id = 'ingredients5'
                  name = 'ingredients5'
                />
              </FormControl>
              <FormControl className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Ingredient 7 (if necesarry)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setIngredients6(e.target.value)}
                  id = 'ingredients6'
                  name = 'ingredients6'
                />
              </FormControl>
              <FormControl className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Ingredient 8 (if necesarry)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setIngredients7(e.target.value)}
                  id = 'ingredients7'
                  name = 'ingredients7'
                />
              </FormControl>
              <FormControl className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Ingredient 9 (if necesarry)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setIngredients8(e.target.value)}
                  id = 'ingredients8'
                  name = 'ingredients8'
                />
              </FormControl>
              <FormControl className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Ingredient 10 (if necesarry)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setIngredients9(e.target.value)}
                  id = 'ingredients9'
                  name = 'ingredients9'
                />
              </FormControl>
              <FormControl className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Ingredient 11 (if necesarry)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setIngredients10(e.target.value)}
                  id = 'ingredients10'
                  name = 'ingredients10'
                />
              </FormControl>
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
              <FormControl className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 3 (required)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction2(e.target.value)}
                  required
                  id = 'instruction2'
                  name = 'instruction2'
                />
              </FormControl>
              <FormControl className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 4 (if necesarry)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction3(e.target.value)}
                  id = 'instruction3'
                  name = 'instruction3'
                />
              </FormControl>
              <FormControl className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 5 (if necesarry)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction4(e.target.value)}
                  id = 'instruction4'
                  name = 'instruction4'
                />
              </FormControl>
              <FormControl className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 6 (if necesarry)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction5(e.target.value)}
                  id = 'instruction5'
                  name = 'instruction5'
                />
              </FormControl>
              <FormControl className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 7 (if necesarry)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction6(e.target.value)}
                  id = 'instruction6'
                  name = 'instruction6'
                />
              </FormControl>
              <FormControl className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 8 (if necesarry)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction7(e.target.value)}
                  id = 'instruction7'
                  name = 'instruction7'
                />
              </FormControl>
              <FormControl className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 9 (if necesarry)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction8(e.target.value)}
                  id = 'instruction8'
                  name = 'instruction8'
                />
              </FormControl>
              <FormControl className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 10 (if necesarry)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction9(e.target.value)}
                  id = 'instruction9'
                  name = 'instruction9'
                />
              </FormControl>
              <FormControl className={(classes.margin, classes.textField)}>
                <InputLabel color="primary">Instruction 11 (if necesarry)</InputLabel>
                <Input
                  type = "text"
                  onChange={(e) => setInstruction10(e.target.value)}
                  id = 'instruction10'
                  name = 'instruction10'
                />
              </FormControl>
              <div className={classes.root}>
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
              <div className={classes.root}>
                <input
                accept="image/*"
                required
                className={classes.input}
                id="photo1"
                type="file"
                name = 'photo1'
                onChange={(e) => setPhoto1(e.target.files[0])}
                />
                <label className="addButtons" htmlFor="photo1">
                  <Button variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon />}>
                    Upload Details Photo
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
