import { Router } from 'express'
import postController from '../controllers/post.controller'

const postRouter = Router()

postRouter.post('/create', postController.createPost)
postRouter.get('/list', postController.getAllPosts)
postRouter.get('/search', postController.searchPosts)
postRouter.get('/:id', postController.getPostById)
postRouter.put('/:id', postController.updatePost)
postRouter.delete('/:id', postController.deletePost)

export default postRouter

// Search: GET /posts/search?q=keyword
