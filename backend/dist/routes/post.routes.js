"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = __importDefault(require("../controllers/post.controller"));
const postRouter = (0, express_1.Router)();
postRouter.post('/create', post_controller_1.default.createPost);
postRouter.get('/list', post_controller_1.default.getAllPosts);
postRouter.get('/search', post_controller_1.default.searchPosts);
postRouter.get('/:id', post_controller_1.default.getPostById);
postRouter.put('/:id', post_controller_1.default.updatePost);
postRouter.delete('/:id', post_controller_1.default.deletePost);
exports.default = postRouter;
// Search: GET /posts/search?q=keyword
