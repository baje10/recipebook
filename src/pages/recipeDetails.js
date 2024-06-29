import React, { useEffect, useState, useRef } from 'react';

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


//PDF downloader
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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

  const [details, setDetails] = useState({});
  
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

  const { user } = useSelector((state) => state.userSignin);
  const { userInfo } = useSelector((state) => state.userRegister);
  const { errorReview, success: recipeReviewSave } = useSelector((state) => state.addReview);

  const dispatch = useDispatch();
  const classes = useStyles();
  const detailsRef = useRef(null); // Using useRef to reference the element

  useEffect(() => {
    if (recipeReviewSave) {
      setComment('');
      setRating(0);
    }
  
    dispatch(rbook.recipe.detailsRecipe(props.match.params.id)).then((data) => {
      setDetails(data);

      if (data.ingredients !== '') {
        dispatch(rbook.ingredient.detailsIngredient(data.ingredients)).then((data) => {
          setIngredients(data);
        });
      }

      if (data.ingredients1 !== '') {
        dispatch(rbook.ingredient.detailsIngredient(data.ingredients1)).then((data) => {
          setIngredients1(data);
        });
      }

      if (data.ingredients2 !== '') {
        dispatch(rbook.ingredient.detailsIngredient(data.ingredients2)).then((data) => {
          setIngredients2(data);
        });
      }

      if (data.ingredients3 !== '') {
        dispatch(rbook.ingredient.detailsIngredient(data.ingredients3)).then((data) => {
          setIngredients3(data);
        });
      }

      if (data.ingredients4 !== '') {
        dispatch(rbook.ingredient.detailsIngredient(data.ingredients4)).then((data) => {
          setIngredients4(data);
        });
      }

      if (data.ingredients5 !== '') {
        dispatch(rbook.ingredient.detailsIngredient(data.ingredients5)).then((data) => {
          setIngredients5(data);
        });
      }

      if (data.ingredients6 !== '') {
        dispatch(rbook.ingredient.detailsIngredient(data.ingredients6)).then((data) => {
          setIngredients6(data);
        });
      }

      if (data.ingredients7 !== '') {
        dispatch(rbook.ingredient.detailsIngredient(data.ingredients7)).then((data) => {
          setIngredients7(data);
        });
      }

      if (data.ingredients8 !== '') {
        dispatch(rbook.ingredient.detailsIngredient(data.ingredients8)).then((data) => {
          setIngredients8(data);
        });
      }

      if (data.ingredients9 !== '') {
        dispatch(rbook.ingredient.detailsIngredient(data.ingredients9)).then((data) => {
          setIngredients9(data);
        });
      }

      if (data.ingredients10 !== '') {
        dispatch(rbook.ingredient.detailsIngredient(data.ingredients10)).then((data) => {
          setIngredients10(data);
        });
      }

      if (data.ingredients11 !== '') {
        dispatch(rbook.ingredient.detailsIngredient(data.ingredients11)).then((data) => {
          setIngredients11(data);
        });
      }

      if (data.ingredients12 !== '') {
        dispatch(rbook.ingredient.detailsIngredient(data.ingredients12)).then((data) => {
          setIngredients12(data);
        });
      }

      if (data.ingredients13 !== '') {
        dispatch(rbook.ingredient.detailsIngredient(data.ingredients13)).then((data) => {
          setIngredients13(data);
        });
      }

      if (data.ingredients14 !== '') {
        dispatch(rbook.ingredient.detailsIngredient(data.ingredients14)).then((data) => {
          setIngredients14(data);
        });
      }

      if (data.ingredients15 !== '') {
        dispatch(rbook.ingredient.detailsIngredient(data.ingredients15)).then((data) => {
          setIngredients15(data);
        });
      }

      if (data.ingredients16 !== '') {
        dispatch(rbook.ingredient.detailsIngredient(data.ingredients16)).then((data) => {
          setIngredients16(data);
        });
      }

      if (data.ingredients17 !== '') {
        dispatch(rbook.ingredient.detailsIngredient(data.ingredients17)).then((data) => {
          setIngredients17(data);
        });
      }

      if (data.ingredients18 !== '') {
        dispatch(rbook.ingredient.detailsIngredient(data.ingredients18)).then((data) => {
          setIngredients18(data);
        });
      }

      if (data.ingredients19 !== '') {
        dispatch(rbook.ingredient.detailsIngredient(data.ingredients19)).then((data) => {
          setIngredients19(data);
        });
      }

      if (data.ingredients20 !== '') {
        dispatch(rbook.ingredient.detailsIngredient(data.ingredients20)).then((data) => {
          setIngredients20(data);
        });
      }

      if (data.ingredients21 !== '') {
        dispatch(rbook.ingredient.detailsIngredient(data.ingredients21)).then((data) => {
          setIngredients21(data);
        });
      }

      if (data.ingredients22 !== '') {
        dispatch(rbook.ingredient.detailsIngredient(data.ingredients22)).then((data) => {
          setIngredients22(data);
        });
      }

      if (data.ingredients23 !== '') {
        dispatch(rbook.ingredient.detailsIngredient(data.ingredients23)).then((data) => {
          setIngredients23(data);
        });
      }

      if (data.ingredients24 !== '') {
        dispatch(rbook.ingredient.detailsIngredient(data.ingredients24)).then((data) => {
          setIngredients24(data);
        });
      }

      if (data.ingredients25 !== '') {
        dispatch(rbook.ingredient.detailsIngredient(data.ingredients25)).then((data) => {
          setIngredients25(data);
        });
      }
    });
    
  
    // Cleanup function can be omitted if not used
  }, [recipeReviewSave, props.match.params.id]); 

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

const downloadPDF = () => {
  const input = detailsRef.current;
  if (!input) {
    console.error("Element not found");
    return;
  }

  html2canvas(input)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      
      console.log('PDF WIDTH', pdfWidth)
      console.log('PDF HEIGHT', pdfHeight);

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Convert the PDF to a blob
      const pdfBlob = pdf.output('blob');

      // Create a download link for the blob
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${recipe.name}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url); // Clean up the URL.createObjectURL reference
    })
    .catch((error) => {
      console.error("Error capturing the canvas:", error);
    });
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
      <div ref={detailsRef}> 
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
                <li style = {{ display: recipe.ingredients ? '' : 'none' }} ><i className = 'instructions'>{ingredients.name} - ₱{parseFloat(ingredients.price).toFixed(2)}</i></li>
                <li style = {{ display: recipe.ingredients1 ? '' : 'none' }} ><i className = 'instructions'>{ingredients1.name} - ₱{parseFloat(ingredients1.price).toFixed(2)}</i></li>
                <li style = {{ display: recipe.ingredients2 ? '' : 'none' }} ><i className = 'instructions'>{ingredients2.name} - ₱{parseFloat(ingredients2.price).toFixed(2)}</i></li>
                <li style = {{ display: recipe.ingredients3 ? '' : 'none' }} ><i className = 'instructions'>{ingredients3.name} - ₱{parseFloat(ingredients3.price).toFixed(2)}</i></li>
                <li style = {{ display: recipe.ingredients4 ? '' : 'none' }} ><i className = 'instructions'>{ingredients4.name} - ₱{parseFloat(ingredients4.price).toFixed(2)}</i></li>
                <li style = {{ display: recipe.ingredients5 ? '' : 'none' }} ><i className = 'instructions'>{ingredients5.name} - ₱{parseFloat(ingredients5.price).toFixed(2)}</i></li>
                <li style = {{ display: recipe.ingredients6 ? '' : 'none' }} ><i className = 'instructions'>{ingredients6.name} - ₱{parseFloat(ingredients6.price).toFixed(2)}</i></li>
                <li style = {{ display: recipe.ingredients7 ? '' : 'none' }} ><i className = 'instructions'>{ingredients7.name} - ₱{parseFloat(ingredients7.price).toFixed(2)}</i></li>
                <li style = {{ display: recipe.ingredients8 ? '' : 'none' }} ><i className = 'instructions'>{ingredients8.name} - ₱{parseFloat(ingredients8.price).toFixed(2)}</i></li>
                <li style = {{ display: recipe.ingredients9 ? '' : 'none' }} ><i className = 'instructions'>{ingredients9.name} - ₱{parseFloat(ingredients9.price).toFixed(2)}</i></li>
                <li style = {{ display: recipe.ingredients10 ? '' : 'none' }} ><i className = 'instructions'>{ingredients10.name} - ₱{parseFloat(ingredients10.price).toFixed(2)}</i></li>
                <li style = {{ display: recipe.ingredients11 ? '' : 'none' }} ><i className = 'instructions'>{ingredients11.name} - ₱{parseFloat(ingredients11.price).toFixed(2)}</i></li>
                <li style = {{ display: recipe.ingredients12 ? '' : 'none' }} ><i className = 'instructions'>{ingredients12.name} - ₱{parseFloat(ingredients12.price).toFixed(2)}</i></li>
                <li style = {{ display: recipe.ingredients13 ? '' : 'none' }} ><i className = 'instructions'>{ingredients13.name} - ₱{parseFloat(ingredients13.price).toFixed(2)}</i></li>
                <li style = {{ display: recipe.ingredients14 ? '' : 'none' }} ><i className = 'instructions'>{ingredients14.name} - ₱{parseFloat(ingredients14.price).toFixed(2)}</i></li>
                <li style = {{ display: recipe.ingredients15 ? '' : 'none' }} ><i className = 'instructions'>{ingredients15.name} - ₱{parseFloat(ingredients15.price).toFixed(2)}</i></li>
                <li style = {{ display: recipe.ingredients16 ? '' : 'none' }} ><i className = 'instructions'>{ingredients16.name} - ₱{parseFloat(ingredients16.price).toFixed(2)}</i></li>
                <li style = {{ display: recipe.ingredients17 ? '' : 'none' }} ><i className = 'instructions'>{ingredients17.name} - ₱{parseFloat(ingredients17.price).toFixed(2)}</i></li>
                <li style = {{ display: recipe.ingredients18 ? '' : 'none' }} ><i className = 'instructions'>{ingredients18.name} - ₱{parseFloat(ingredients18.price).toFixed(2)}</i></li>
                <li style = {{ display: recipe.ingredients19 ? '' : 'none' }} ><i className = 'instructions'>{ingredients19.name} - ₱{parseFloat(ingredients19.price).toFixed(2)}</i></li>
                <li style = {{ display: recipe.ingredients20 ? '' : 'none' }} ><i className = 'instructions'>{ingredients20.name} - ₱{parseFloat(ingredients20.price).toFixed(2)}</i></li>
                <li style = {{ display: recipe.ingredients21 ? '' : 'none' }} ><i className = 'instructions'>{ingredients21.name} - ₱{parseFloat(ingredients21.price).toFixed(2)}</i></li>
                <li style = {{ display: recipe.ingredients22 ? '' : 'none' }} ><i className = 'instructions'>{ingredients22.name} - ₱{parseFloat(ingredients22.price).toFixed(2)}</i></li>
                <li style = {{ display: recipe.ingredients23 ? '' : 'none' }} ><i className = 'instructions'>{ingredients23.name} - ₱{parseFloat(ingredients23.price).toFixed(2)}</i></li>
                <li style = {{ display: recipe.ingredients24 ? '' : 'none' }} ><i className = 'instructions'>{ingredients24.name} - ₱{parseFloat(ingredients24.price).toFixed(2)}</i></li>
                <li style = {{ display: recipe.ingredients25 ? '' : 'none' }} ><i className = 'instructions'>{ingredients25.name} - ₱{parseFloat(ingredients25.price).toFixed(2)}</i></li>
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
      </div>
      <hr/>
      <div className="reviews1">
        <Button variant="contained" color="primary" onClick={downloadPDF}>
          Download This Recipe (PDF)
        </Button>
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
