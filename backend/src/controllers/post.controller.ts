import { Request, Response } from 'express'
import postModel from '../models/post.model'
import { Post } from '../types/post'

/**
 * Get all posts
 * 
 * @route GET /posts
 * @param { Request } req
 * @param { Response } res
 * @returns { void } 
 */
const getAllPosts = async(req: Request, res: Response) => {
  const posts = await postModel.getAllPosts()
  res.status(200).json(posts)
}

/**
 * Get post by id
 * 
 * @route GET /posts/:id
 * @param { Request } req
 * @param { Response } res
 * @returns { void } 
 */
const getPostById = async(req: Request, res: Response) => {
  const id = req.params.id
  const post = await postModel.getPostById(id)
  if(!post){
    res.status(404).json({
      message: "Post not found!"
    })
    return
  }
  res.status(200).json(post)
}

/**
 * Search post by keyword
 * 
 * @route GET
 * @param { Request } req
 * @param { Response } res
 * @returns { void }
 */
const searchPosts = async(req: Request, res: Response) => {
  const keyword = req.query.q as string
  const posts = await postModel.searchPosts(keyword)
  if(!posts || posts.length === 0){
    res.status(404).json({
      message: "Post not found!"
    })
    return
  }
  res.status(200).json(posts)
}

/**
 * Create post (add post)
 * 
 * @route POST /posts/create
 * @param { Request<{}, {}, Omit<Post, 'id' || 'date'>> } req
 * @param { Response } res
 * @returns { void } Respond with success/fail.
 */
const createPost = async(req: Request<{}, {}, Omit<Post, 'id' | 'date'>>, res: Response) => {
  const { title, body } = req.body
  if(!title.trim() || !body.trim()){
    res.status(500).json({
      message: "Title or body is empty!"
    })
    return
  }
  const post = await postModel.createPost({ title, body })
  if(!post){
    res.status(500).json({
      message: "Incorrect title or body!"
    })
    return
  }
  res.status(200).json({
    message: "Post created successful!"
  })
}

/**
 * Update post
 * 
 * @route PUT /posts/update
 * @param { Request<{id: string}, {}, Partial<Post>> } req
 * @param { Response } res
 * @returns { void }
 */
const updatePost = async(req: Request<{id: string}, {}, Partial<Post>>, res: Response) => {
  const id = req.params.id
  const { title, body } = req.body
  const isSuccess: boolean = await postModel.updatePost(id, { title, body })
  if(!isSuccess){
    res.status(404).json({
      message: "Failed to update post!"
    })
    return
  }
  res.status(200).json({
    message: "Post updated successful!"
  })
}

/**
 * Delete post
 * 
 * @route DELETE /posts/delete
 * @param { Request } req
 * @param { Response } res
 * @returns { void }
 */
const deletePost = async(req: Request, res: Response) => {
  const id = req.params.id
  const isSuccess: boolean = await postModel.deletePost(id)
  if(!isSuccess){
    res.status(404).json({
      message: "Failed to delete post!"
    })
    return
  }
  res.status(200).json({
    message: "Post deleted successful!"
  })
}

export default {
  getAllPosts,
  getPostById,
  searchPosts,
  createPost,
  updatePost,
  deletePost
}