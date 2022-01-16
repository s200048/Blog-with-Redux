import React, { useState, useEffect } from "react";
import { Container, Grow, Grid, Button, Paper, TextField, AppBar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getPostBySearch, getPosts } from "../../actions/posts";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { mergeClasses } from "@material-ui/styles";
import Paginate from "../Pagination";
import { useHistory, useLocation } from "react-router-dom";
// useLocation --> know which page are we currently
// useHistory --> can re-navigate to certain pages and search items
import ChipInput from "material-ui-chip-input";
// 係search tags 果到將啲tags整得好啲

import useStyles from "./styles";

// 搵到現時嘅Search query
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  // declair 兩種要search query 情況
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const classes = useStyles();

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [currentId, dispatch]);

  // const location = useLocation();
  // console.log(location);
  // console.log(history);
  // console.log(typeof page);
  // console.log(query);

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      //saearch post
      // key code 13 --> Enter
      // keyCode is deprecated
      searchPost();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));
  const searchPost = () => {
    // if (search.trim() === null || tags.length < 0) {
    //   history.push("/");
    // } else

    if (search.trim() || tags) {
      // dispatch --> fetch search function
      // e.g. [europe, usa] --> "europe,usa"
      dispatch(getPostBySearch({ search, tags: tags.join(",") }));
      // In order to send to someone only the specific search item
      history.push(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid className={classes.gridContainer} container justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField name="search" label="Search Memories" value={search} fullWidth variant="outlined" onChange={(e) => setSearch(e.target.value)} onKeyPress={handleKeyPress} />
              <ChipInput style={{ margin: "10px 0" }} value={tags} onAdd={handleAdd} onDelete={handleDelete} label="Search Tags" variant={"outlined"} />
              <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper elevation={6} className={classes.pagination}>
                <Paginate page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
