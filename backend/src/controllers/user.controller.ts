import { Request, Response } from 'express'
import userModel from '../models/user.model'
import { User } from '../types/user'

/**
 * Sign up (add user)
 * 
 * @route POST /users/signup
 * @param { Request<{}, {}, Omit<User, 'id'>> } req
 * @param { Response } res
 * @returns { void } Respond with success/fail.
 */
const signup = async(req: Request<{}, {}, Omit<User, 'id'>>, res: Response) => {
  const { username, password } = req.body
  if(!username.trim() || !password.trim()){
    res.status(500).json({
      message: "Missing username or password!"
    })
    return
  }

  const isSuccess: boolean = await userModel.createUser({ username, password })
  if(!isSuccess){
    res.status(409).json({
      message: "Username is taken!"
    })
    return
  }
  res.status(201).json({
    message: "User successfully added!"
  })
}

/**
 * Log in (check user)
 * 
 * @route POST /users/login
 * @param { Request<{}, {}, Omit<User, 'id'>> } req
 * @param { Response } res
 * @returns { void } Returns success and cookie.
 */
const login = async(req: Request<{}, {}, Omit<User, 'id'>>, res: Response) => {
  const { username, password } = req.body
  if(!username.trim() || !password.trim()){
    res.status(500).json({
      message: "Username or password is empty!"
    })
    return
  }
  const user = await userModel.loginUser({ username, password })
  if(!user){
    res.status(500).json({
      message: "Incorrect username or password!"
    })
    return
  }
  if(req.session){
    req.session.isLoggedIn = true
    req.session.username = user.username
  }
  res.status(200).json({
    message: "Login successful!"
  })
}

/**
 * get username
 * 
 * @route GET /users/check-auth
 */
const getUsername = async(req: Request, res: Response) => {
  if(!req.session || !req.session.username){
    res.status(401).json({
      message: "Not logged in!"
    })
    return
  }
  res.status(200).json({
    username: req.session.username
  })
}


/**
 * Log out
 * 
 * @route GET /users/logout
 * @param { Request } req
 * @param { Response } res
 * @returns { void } Clear session cookie.
 */
const logout = (req: Request, res: Response) => {
  if(req.session){
    req.session = null // clear the session cookie
  }
  res.status(200).json({
    message: "Logout successful!"
  })
}

export default {
  signup,
  login,
  logout,
  getUsername
}