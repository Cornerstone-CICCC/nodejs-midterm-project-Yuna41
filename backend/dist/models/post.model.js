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
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class PostModel {
    constructor() {
        this.posts = [];
    }
    // Get all posts
    getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.posts;
        });
    }
    // Get post By Id
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = this.posts.find(p => p.id === id);
            if (!post)
                return false;
            return post;
        });
    }
    // Search post
    searchPosts(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(keyword)
            // console.log(this.posts)
            if (!keyword || !keyword.trim())
                return this.posts;
            const keywordLower = keyword.toLowerCase();
            const results = this.posts.filter((p) => p.title.toLowerCase().includes(keywordLower) || p.body.toLowerCase().includes(keywordLower));
            // console.log(results)
            return results;
        });
    }
    // Create post
    createPost(newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, body } = newPost;
            this.posts.push({
                id: (0, uuid_1.v4)(),
                title,
                body,
                date: new Date()
            });
            return true;
        });
    }
    // Update post
    updatePost(id, updatedCont) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundIndex = this.posts.findIndex(p => p.id === id);
            if (foundIndex === -1)
                return false;
            this.posts[foundIndex] = Object.assign(Object.assign(Object.assign({}, this.posts[foundIndex]), updatedCont), { id: this.posts[foundIndex].id });
            return true;
        });
    }
    // Delete post
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundIndex = this.posts.findIndex(p => p.id === id);
            if (foundIndex === -1)
                return false;
            this.posts.splice(foundIndex, 1);
            return true;
        });
    }
}
exports.default = new PostModel;
