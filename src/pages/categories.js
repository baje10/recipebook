import React, { useState, useEffect, useCallback } from 'react';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { rbook } from '../redux/combineActions';

//navigation
import { Link, useLocation } from 'react-router-dom';

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
import { useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxHeight: "17rem",
    maxWidth: "8rem",
    marginLeft: '.7rem',
    whiteSpace: 'nowrap',
    marginTop: '1rem'
  },
  root1: {
    maxHeight: "35rem",
    width: "15rem",
    marginTop: '1rem',
    marginLeft: '.7rem',
    whiteSpace: 'nowrap'
  },
  paginator: {
    justifyContent: "center",
    padding: "10px",
    marginTop:'1%',
  },
  viewAllBtn: {
    marginTop: '2%',
    color: '#8b664c',
    border: '1px solid #8b664c',
    '&:hover': {
      borderColor: '#765742',
      color: '#765742',
    }
  }
});

const Categories = () => {
  const lowReso = useMediaQuery('(max-width: 519px)');

  const [pageDetails, setPageDetails] = useState(null);
  const [pageSize] = useState(5);
  const [categListPaginate, setCategListPaginate] = useState([]);

  document.title='Peso Palate | Categories';

  const { loading, error } = useSelector(state => state.listCategories);

  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const search = params.get('keyword') ?? '';


  const handleCategListPaginate = useCallback(
    (pageIndex = 1) => {
      dispatch(rbook.category.listAllCategorysPaginate(pageIndex, pageSize, search))
        .then((data) => {
          if (data) {
            console.log('DATAAA CATEGORY', data.docs)
            setCategListPaginate(data.docs);
            setPageDetails({
              pageIndex: data.page,
              pageSize: data.limit,
              totalPages: data.totalPages,
              totalDocs: data.totalDocs
            });
          }
        })
    },
    [dispatch, pageSize, search],
  );

  useEffect(() => {
    handleCategListPaginate();
  }, [handleCategListPaginate]);

  const handleChangePageIndex = (event, value) => {
    handleCategListPaginate(value);
  };


  const createBanana = (category, idx) => {
    if ( !lowReso ) {
      return (
        <Card style = {{ display: loading && 'none' }} key={idx} className={classes.root1}>
           <CardMedia
             component="img"
             alt={category.name}
             height="200"
             image={`/api/category/photo/${category._id}`}
             title={category.name}
           />
           <CardContent>
             <Typography gutterBottom variant="h6">
               <Box
                 component="p"
                 my={1}
                 textOverflow="ellipsis"
                 overflow="hidden"
               >
                 {category.name}
               </Box>
             </Typography>
           </CardContent>
           <CardActions>
             <Link to = {`/recipes?category=${category._id}`}>
               <Button className={classes.viewAllBtn} variant="outlined">Check it out</Button>
             </Link>
           </CardActions>
         </Card>
      );
    } else {
      return (
        <Card style = {{ display: loading && 'none' }} key={idx} className={classes.root}>
           <Link to = {`/recipes?category=${category._id}`}>
             <CardMedia
               component="img"
               alt={category.name}
               height="150"
               image={`/api/category/photo/${category._id}`}
               title={category.name}
             />
           </Link>
           <CardContent>
             <Typography>
                <Box
                    component="div"
                    my={0}
                    textOverflow="ellipsis"
                    overflow="hidden"
                    >
                    <b>{category.name}</b>
                </Box>
             </Typography>
           </CardContent>
         </Card>
      );
    }
  };


  return (
    <>
      <div className="homeSectionsContainer">
        <div className="woodContainer"> 
          <center className = 'welcomeTitleHome'>Categories</center>
          <div className = 'home-container'>

            {loading && <CircularProgress color='inherit' className = 'loading1' />}
            {error && <div>{error}</div>}

            {categListPaginate.length === 0 && !loading &&
              <div style = {{fontSize: '4rem'}} >No categories found</div>
            }
            {categListPaginate.map((category, index) => (
              createBanana(category, index)
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
        </div>
      </div>
    </>
  )
}

export default Categories;
