import { Post } from '../types/post'
import { v4 as uuidv4 } from 'uuid'

class PostModel {
  private posts: Post[] = []

  // Get all posts
  async getAllPosts(){
    return this.posts
  }

  // Get post By Id
  async getPostById(id: string){
    const post = this.posts.find(p => p.id === id)
    if(!post) return false
    return post
  }

  // Search post
  async searchPosts(keyword?: string){
    // console.log(keyword)
    // console.log(this.posts)

    if(!keyword || !keyword.trim()) return this.posts
    const keywordLower = keyword.toLowerCase()
    const results = this.posts.filter(
      (p) => p.title.toLowerCase().includes(keywordLower) || p.body.toLowerCase().includes(keywordLower)
    )
    // console.log(results)
    return results
  }

  // Create post
  async createPost(newPost: Omit<Post, 'id' | 'date'>){
    const { title, body } = newPost
    this.posts.push({
      id: uuidv4(),
      title,
      body,
      date: new Date()
    })
    return true
  }

  // Update post
  async updatePost(id: string, updatedCont: Partial<Post>){
    const foundIndex = this.posts.findIndex(p => p.id === id)
    if(foundIndex === -1) return false

    this.posts[foundIndex] = {
      ...this.posts[foundIndex],
      ...updatedCont,
      id: this.posts[foundIndex].id
    }
    return true
  }

  // Delete post
  async deletePost(id: string){
    const foundIndex = this.posts.findIndex(p => p.id === id)
    if(foundIndex === -1) return false
    this.posts.splice(foundIndex, 1)
    return true
  }
}

export default new PostModel