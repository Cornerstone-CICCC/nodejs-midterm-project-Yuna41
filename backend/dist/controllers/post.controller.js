"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_model_1 = __importDefault(require("../models/post.model"));
/**
 * Get all posts
 *
 * @route GET /posts
 * @param { Request } req
 * @param { Response } res
 * @returns { void }
 */
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield post_model_1.default.getAllPosts();
    res.status(200).json(posts);
});
/**
 * Get post by id
 *
 * @route GET /posts/:id
 * @param { Request } req
 * @param { Response } res
 * @returns { void }
 */
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const post = yield post_model_1.default.getPostById(id);
    if (!post) {
        res.status(404).json({
            message: "Post not found!"
        });
        return;
    }
    res.status(200).json(post);
});
/**
 * Search post by keyword
 *
 * @route GET
 * @param { Request } req
 * @param { Response } res
 * @returns { void }
 */
const searchPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyword = req.query.q;
    const posts = yield post_model_1.default.searchPosts(keyword);
    if (!posts || posts.length === 0) {
        res.status(404).json({
            message: "Post not found!"
        });
        return;
    }
    res.status(200).json(posts);
});
/**
 * Create post (add post)
 *
 * @route POST /posts/create
 * @param { Request<{}, {}, Omit<Post, 'id' || 'date'>> } req
 * @param { Response } res
 * @returns { void } Respond with success/fail.
 */
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, body } = req.body;
    if (!title.trim() || !body.trim()) {
        res.status(500).json({
            message: "Title or body is empty!"
        });
        return;
    }
    const post = yield post_model_1.default.createPost({ title, body });
    if (!post) {
        res.status(500).json({
            message: "Incorrect title or body!"
        });
        return;
    }
    res.status(200).json({
        message: "Post created successful!"
    });
});
/**
 * Update post
 *
 * @route PUT /posts/update
 * @param { Request<{id: string}, {}, Partial<Post>> } req
 * @param { Response } res
 * @returns { void }
 */
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { title, body } = req.body;
    const isSuccess = yield post_model_1.default.updatePost(id, { title, body });
    if (!isSuccess) {
        res.status(404).json({
            message: "Failed to update post!"
        });
        return;
    }
    res.status(200).json({
        message: "Post updated successful!"
    });
});
/**
 * Delete post
 *
 * @route DELETE /posts/delete
 * @param { Request } req
 * @param { Response } res
 * @returns { void }
 */
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const isSuccess = yield post_model_1.default.deletePost(id);
    if (!isSuccess) {
        res.status(404).json({
            message: "Failed to delete post!"
        });
        return;
    }
    res.status(200).json({
        message: "Post deleted successful!"
    });
});
exports.default = {
    getAllPosts,
    getPostById,
    searchPosts,
    createPost,
    updatePost,
    deletePost
};
