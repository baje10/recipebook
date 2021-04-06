import React, { useEffect, useState } from 'react';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { rbook } from '../redux/combineActions';

//navigation
import { Link } from 'react-router-dom';

//material-ui
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import CreateIcon from '@material-ui/icons/Create';
import DescriptionIcon from '@material-ui/icons/Description';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { makeStyles } from '@material-ui/core/styles';

//styling for material-ui
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '100%',
    '& label.Mui-focused': {
      color: '#FF3F16',
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: '#FF3F16',
        },
    },
  },
}));

const RecipeDetails = (props) => {
  const {recipe, loading, error} = useSelector(state => state.recipeDetails);

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const { user } = useSelector((state) => state.userSignin);
  const { userInfo } = useSelector((state) => state.userRegister);
  const { errorReview, success: recipeReviewSave } = useSelector((state) => state.addReview);

  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (recipeReviewSave) {
      setComment('');
      setRating(0);
    }
    dispatch(rbook.recipe.detailsRecipe(props.match.params.id));
    return () => {
      //
    };
  }, [recipeReviewSave]);

  const submitHandler = (e) => {
  e.preventDefault();
  if(user) {
    dispatch(
      rbook.recipe.saveRecipeReview(props.match.params.id, {
        name: user.name,
        rating: rating,
        comment: comment,
        userRole: user.role
      })
    );
  } else {
    dispatch(
      rbook.recipe.saveRecipeReview(props.match.params.id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
        userRole: userInfo.role
      })
    );
  }
  setOpenSnackBar(true);
};

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
    setOpenSnackBar(false);
};

const showSuccess = () => (
  <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={openSnackBar} autoHideDuration={3000} onClose={handleClose}>
    <Alert severity="success">Comment added</Alert>
  </Snackbar>
);
const showError = () => (
  <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={openSnackBar} autoHideDuration={3000} onClose={handleClose}>
    <Alert severity="error">{errorReview}</Alert>
  </Snackbar>
);

  return (
    loading? <center className='loading1' ><CircularProgress color = 'inherit' /></center> : error? <div>{error}</div> :
    <>
      <center className = 'recipeName'>{recipe.name}</center>
      <div className="details-container">
        {recipeReviewSave && showSuccess()}
        {errorReview && showError()}
        {
        recipe.name === undefined ? (
          <div style = {{display: 'none'}}>loading</div>
          ) : (
          <div style = {{display: 'none'}}>{document.title=recipe.name}</div>
         )
        }
        <div className="detailsCol">
          <Box
            boxShadow={0}
            m={1}
            p={1}
          >
            <img
              alt={recipe.name}
              src={`/api/recipe/photo1/${recipe._id}`}
              title={recipe.name}
            />
          </Box>
          <Box
            boxShadow={0}
            m={1}
            p={1}
          >
            <img
              alt={recipe.name}
              src={`/api/recipe/photo/${recipe._id}`}
              title={recipe.name}
            />
          </Box>
        </div>
        <div className="detailsCol1">
          <Box
            boxShadow={0}
            m={0}
            p={0}
          >
            <div style = {{ fontSize: '1.5rem', marginTop: '.5rem' }} ><b><CreateIcon/> Author:</b></div>
            <div style = {{ fontSize: '1rem' }}>{recipe.recipeBy}</div>
          </Box>
          <Box
            boxShadow={0}
            m={0}
            p={0}
          >
            <div style = {{ fontSize: '1.5rem', marginTop: "1.5rem" }} ><b><DescriptionIcon/> Description:</b></div>
            <div style = {{ fontSize: '1rem' }}>{recipe.description}</div>
          </Box>
          <Box
            boxShadow={0}
            m={0}
            p={0}
          >
            <div className="instruction-container">
            <div className="listCont">
              <div style = {{ fontSize: '1.5rem', marginTop: "1.5rem" }} ><b><FastfoodIcon/> Ingredients:</b></div>
              <li style = {{ display: recipe.ingredients ? '' : 'none' }} ><i className = 'instructions'>{recipe.ingredients}</i></li>
              <li style = {{ display: recipe.ingredients1 ? '' : 'none' }} ><i className = 'instructions'>{recipe.ingredients1}</i></li>
              <li style = {{ display: recipe.ingredients2 ? '' : 'none' }} ><i className = 'instructions'>{recipe.ingredients2}</i></li>
              <li style = {{ display: recipe.ingredients3 ? '' : 'none' }} ><i className = 'instructions'>{recipe.ingredients3}</i></li>
              <li style = {{ display: recipe.ingredients4 ? '' : 'none' }} ><i className = 'instructions'>{recipe.ingredients4}</i></li>
              <li style = {{ display: recipe.ingredients5 ? '' : 'none' }} ><i className = 'instructions'>{recipe.ingredients5}</i></li>
              <li style = {{ display: recipe.ingredients6 ? '' : 'none' }} ><i className = 'instructions'>{recipe.ingredients6}</i></li>
              <li style = {{ display: recipe.ingredients7 ? '' : 'none' }} ><i className = 'instructions'>{recipe.ingredients7}</i></li>
              <li style = {{ display: recipe.ingredients8 ? '' : 'none' }} ><i className = 'instructions'>{recipe.ingredients8}</i></li>
              <li style = {{ display: recipe.ingredients9 ? '' : 'none' }} ><i className = 'instructions'>{recipe.ingredients9}</i></li>
              <li style = {{ display: recipe.ingredients10 ? '' : 'none' }} ><i className = 'instructions'>{recipe.ingredients10}</i></li>
              <li style = {{ display: recipe.ingredients11 ? '' : 'none' }} ><i className = 'instructions'>{recipe.ingredients11}</i></li>
              <li style = {{ display: recipe.ingredients12 ? '' : 'none' }} ><i className = 'instructions'>{recipe.ingredients12}</i></li>
              <li style = {{ display: recipe.ingredients13 ? '' : 'none' }} ><i className = 'instructions'>{recipe.ingredients13}</i></li>
              <li style = {{ display: recipe.ingredients14 ? '' : 'none' }} ><i className = 'instructions'>{recipe.ingredients14}</i></li>
              <li style = {{ display: recipe.ingredients15 ? '' : 'none' }} ><i className = 'instructions'>{recipe.ingredients15}</i></li>
              <li style = {{ display: recipe.ingredients16 ? '' : 'none' }} ><i className = 'instructions'>{recipe.ingredients16}</i></li>
              <li style = {{ display: recipe.ingredients17 ? '' : 'none' }} ><i className = 'instructions'>{recipe.ingredients17}</i></li>
              <li style = {{ display: recipe.ingredients18 ? '' : 'none' }} ><i className = 'instructions'>{recipe.ingredients18}</i></li>
              <li style = {{ display: recipe.ingredients19 ? '' : 'none' }} ><i className = 'instructions'>{recipe.ingredients19}</i></li>
              <li style = {{ display: recipe.ingredients20 ? '' : 'none' }} ><i className = 'instructions'>{recipe.ingredients20}</i></li>
              <li style = {{ display: recipe.ingredients21 ? '' : 'none' }} ><i className = 'instructions'>{recipe.ingredients21}</i></li>
              <li style = {{ display: recipe.ingredients22 ? '' : 'none' }} ><i className = 'instructions'>{recipe.ingredients22}</i></li>
              <li style = {{ display: recipe.ingredients23 ? '' : 'none' }} ><i className = 'instructions'>{recipe.ingredients23}</i></li>
              <li style = {{ display: recipe.ingredients24 ? '' : 'none' }} ><i className = 'instructions'>{recipe.ingredients24}</i></li>
              <li style = {{ display: recipe.ingredients25 ? '' : 'none' }} ><i className = 'instructions'>{recipe.ingredients25}</i></li>
            </div>
            <div className="listCont">
              <div style = {{ fontSize: '1.5rem', marginTop: "1.5rem" }} ><b><RestaurantIcon/> Instructions:</b></div>
              <li style = {{ display: recipe.instruction ? '' : 'none' }} ><i className = 'instructions'>{recipe.instruction}</i></li>
              <li style = {{ display: recipe.instruction1 ? '' : 'none' }} ><i className = 'instructions'>{recipe.instruction1}</i></li>
              <li style = {{ display: recipe.instruction2 ? '' : 'none' }} ><i className = 'instructions'>{recipe.instruction2}</i></li>
              <li style = {{ display: recipe.instruction3 ? '' : 'none' }} ><i className = 'instructions'>{recipe.instruction3}</i></li>
              <li style = {{ display: recipe.instruction4 ? '' : 'none' }} ><i className = 'instructions'>{recipe.instruction4}</i></li>
              <li style = {{ display: recipe.instruction5 ? '' : 'none' }} ><i className = 'instructions'>{recipe.instruction5}</i></li>
              <li style = {{ display: recipe.instruction6 ? '' : 'none' }} ><i className = 'instructions'>{recipe.instruction6}</i></li>
              <li style = {{ display: recipe.instruction7 ? '' : 'none' }} ><i className = 'instructions'>{recipe.instruction7}</i></li>
              <li style = {{ display: recipe.instruction8 ? '' : 'none' }} ><i className = 'instructions'>{recipe.instruction8}</i></li>
              <li style = {{ display: recipe.instruction9 ? '' : 'none' }} ><i className = 'instructions'>{recipe.instruction9}</i></li>
              <li style = {{ display: recipe.instruction10 ? '' : 'none' }} ><i className = 'instructions'>{recipe.instruction10}</i></li>
              <li style = {{ display: recipe.instruction11 ? '' : 'none' }} ><i className = 'instructions'>{recipe.instruction11}</i></li>
              <li style = {{ display: recipe.instruction12 ? '' : 'none' }} ><i className = 'instructions'>{recipe.instruction12}</i></li>
              <li style = {{ display: recipe.instruction13 ? '' : 'none' }} ><i className = 'instructions'>{recipe.instruction13}</i></li>
              <li style = {{ display: recipe.instruction14 ? '' : 'none' }} ><i className = 'instructions'>{recipe.instruction14}</i></li>
              <li style = {{ display: recipe.instruction15 ? '' : 'none' }} ><i className = 'instructions'>{recipe.instruction15}</i></li>
              <li style = {{ display: recipe.instruction16 ? '' : 'none' }} ><i className = 'instructions'>{recipe.instruction16}</i></li>
              <li style = {{ display: recipe.instruction17 ? '' : 'none' }} ><i className = 'instructions'>{recipe.instruction17}</i></li>
              <li style = {{ display: recipe.instruction18 ? '' : 'none' }} ><i className = 'instructions'>{recipe.instruction18}</i></li>
              <li style = {{ display: recipe.instruction19 ? '' : 'none' }} ><i className = 'instructions'>{recipe.instruction19}</i></li>
              <li style = {{ display: recipe.instruction20 ? '' : 'none' }} ><i className = 'instructions'>{recipe.instruction20}</i></li>
              <li style = {{ display: recipe.instruction21 ? '' : 'none' }} ><i className = 'instructions'>{recipe.instruction21}</i></li>
              <li style = {{ display: recipe.instruction22 ? '' : 'none' }} ><i className = 'instructions'>{recipe.instruction22}</i></li>
              <li style = {{ display: recipe.instruction23 ? '' : 'none' }} ><i className = 'instructions'>{recipe.instruction23}</i></li>
              <li style = {{ display: recipe.instruction24 ? '' : 'none' }} ><i className = 'instructions'>{recipe.instruction24}</i></li>
              <li style = {{ display: recipe.instruction25 ? '' : 'none' }} ><i className = 'instructions'>{recipe.instruction25}</i></li>
            </div>
            </div>
          </Box>
        </div>
      </div>
      <hr/>
      <div className="reviews1">
        <div className = 'reviewsTitle'>Rate this recipe</div>
        <Rating
          name="rating"
          id='rating'
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
    </div>
    {userInfo || user ? (
     <>
       <div className = 'reviews1'>
         <form className = 'form-container' onSubmit = {submitHandler}>
           <div class="reviewForm">
            <Box
              boxShadow={0}
              bgcolor="background.paper"
              m={0}
              p={0}
              style={{ width: '100%', height: '100&' }}
            >
              <FormControl className={(classes.margin, classes.textField)}>
                <TextField
                  id="comment"
                  label="Write your comment here"
                  multiline
                  name="comment"
                  onChange={(e) => setComment(e.target.value)}
                  variant="outlined"
                  rows={4}
                />
               <Button style={{ marginTop: '2%' }} variant="contained" type="submit">Comment</Button>
             </FormControl>
          </Box>
        </div>
      </form>
    </div>
  </>
  ) : (
   <div style={{fontSize: "1.5rem"}} className = 'reviews1'>
     <Link to = "/signin">Please Sign-in to write a review.</Link>
   </div>
  )}
    <div className="reviews" >
    <div className = 'reviewsTitle'>Reviews</div>
      {recipe.reviews && recipe.reviews.length > 0 ? (
         <div>
           {recipe.reviews && recipe.reviews
             .map((review) => (
              <>
             <div style={{marginTop:'2.5rem'}} key={review._id}>
               { review.userRole === 1 ? (
                 <b style = {{ fontSize: '1.1rem' }} >{review.name} (Admin)</b>
               ) : (
               <b style = {{ fontSize: '1.1rem' }} >{review.name}</b>
               ) }
               <div><Rating precision={.1} readOnly value={review.rating}/></div>
               <div style = {{ fontSize: '1rem' }} >{review.comment}</div>
             </div>
             </>
           ))}
         </div>
        ) : (
       <h5>
        There are no reviews in this recipe. Write the first one
       </h5>
      )}
      </div>
    </>
  )
}

export default RecipeDetails;
