import React, { useState, useEffect, useCallback } from 'react';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { rbook } from '../redux/combineActions';

//navigation
import { Link, useHistory, useLocation } from 'react-router-dom';

//material-ui
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from "@material-ui/lab/Pagination";
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles({
  root: {
    maxHeight: "33rem",
    maxWidth: "15rem",
    marginLeft: '.7rem',
    marginTop: "1rem",
    whiteSpace: 'nowrap'
  },
  paginator: {
    justifyContent: "center",
    padding: "10px",
    marginTop:'1%',
    backgroundColor: "#FEFFE4",
  }
});

const AllRecipe = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [pageDetails, setPageDetails] = useState(null);
  const [pageSize] = useState(5);
  const [categList, setCategList] = useState([]);
  const [category, setCategory] = useState('');

  document.title='Recipebook | All Recipes';

  const { loading, error } = useSelector(state => state.recipeListAll);

  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const search = params.get('keyword') ?? '';
  const categ = params.get('category') ?? '';

  const handleRecipeList = useCallback(
    (pageIndex = 1) => {
      dispatch(rbook.recipe.listAllRecipes(pageIndex, pageSize, search, categ))
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
    [dispatch, pageSize, search, categ],
  );

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
    handleCategoryList();
  }, [handleCategoryList]);

  useEffect(() => {
    handleRecipeList();
  }, [handleRecipeList]);

  const handleChangePageIndex = (event, value) => {
    handleRecipeList(value);
  };

  const handleCategoryHandler = (e) => {
    if(search === '') {
      history.push('/recipes?category=' + e.target.value);
    } else {
      history.push('/recipes?keyword=' + search + '&category=' + e.target.value);
    }
    setCategory(e.target.value);
    console.log('CATEGORY NAME', e.target.value);
  }

  const createBanana = (recipe, idx) => {
    return (
      <Card style = {{ display: loading && 'none' }} key={idx} className={classes.root}>
         <CardMedia
           component="img"
           alt={recipe.name}
           height="200"
           image={`/api/recipe/photo/${recipe._id}`}
           title={recipe.name}
         />
         <CardContent>
           <Typography gutterBottom variant="h6">
             <Box
               component="p"
               my={2}
               textOverflow="ellipsis"
               overflow="hidden"
             >
               {recipe.name}
             </Box>
           </Typography>
           <Typography variant="body2" color="textSecondary" component="p">
             <Rating precision={.2} readOnly value={recipe.rating.toFixed(1)}/> <div style = {{fontSize: "1.5rem"}}>{recipe.rating.toFixed(1)}</div>
           </Typography>
           <Typography variant="body2" color="textSecondary" component="p">
             <div style = {{fontSize: "1rem"}}>Number of reviews: {recipe.numReviews}</div>
           </Typography>
         </CardContent>
         <CardActions>
           <Link to = {`/detail/${recipe._id}`}>
             <Button size="small" color="primary">
               Read more
             </Button>
           </Link>
         </CardActions>
       </Card>
    );
  };

  return (
    <>
      <center className = 'welcomeTitle'>All recipes</center>
      <center style={{ display: loading && 'none' }} >
        <Select
          style= {{width: "50%"}}
          native
          required
          variant="outlined"
          onChange={handleCategoryHandler}
          value={categ}
          inputProps={{
            name: 'category',
            id: 'category',
          }}
        >
          <option value = "">Category Filter</option>
          {
           categList.map((c, i) => (
             <option key={i} value={c._id}>
                 {c.name}
             </option>
          ))}
        </Select>
      </center>
      <div className = 'home-container'>

        {loading && <CircularProgress color='inherit' className = 'loading1' />}
        {error && <div>{error}</div>}

        {recipeList.length === 0 && !loading &&
          <div style = {{fontSize: '4rem'}} >No recipes found</div>
        }
        {recipeList.map((recipe, index) => (
          createBanana(recipe, index)
        ))}
      </div>

      {pageDetails && pageDetails.totalDocs <= pageDetails.pageSize ?
        (
         null
        ) : (
          <Pagination
            style = {{ display: loading && 'none' }}
            count={pageDetails && pageDetails.totalPages}
            page={pageDetails && pageDetails.pageIndex}
            defaultPage={1}
            color="primary"
            size="large"
            onChange={handleChangePageIndex}
            classes={{ ul: classes.paginator }}
          />
        )
      }
    </>
  )
}

export default AllRecipe;
