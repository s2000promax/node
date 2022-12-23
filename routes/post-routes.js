const express = require('express');
const router = express.Router()

const { getPost, getEditPost, editPost, getPosts, getAddPost, addPost, deletePost } = require('../controllers/post-controller');

router.get('/posts/:id', getPost);
router.delete('/posts/:id', deletePost);
router.get('/edit/:id', getEditPost);
router.put('/edit/:id', editPost);
router.get('/posts', getPosts);
router.get('/add-post', getAddPost);
router.post('/add-post', addPost);

module.exports = router;
