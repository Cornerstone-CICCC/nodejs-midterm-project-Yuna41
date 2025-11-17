"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
// Create server
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: "http://localhost:4321",
    credentials: true
}));
if (!process.env.COOKIE_PRIMARY_KEY || !process.env.COOKIE_SECONDARY_KEY) {
    throw new Error("Missing cookie keys!");
}
app.use((0, cookie_session_1.default)({
    name: "session",
    keys: [
        process.env.COOKIE_PRIMARY_KEY,
        process.env.COOKIE_SECONDARY_KEY
    ],
    maxAge: 3 * 60 * 1000
}));
app.use(express_1.default.json()); // Allow and parse JSON body
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use('/users', user_routes_1.default);
app.use('/posts', post_routes_1.default);
// app.get('/',(req: Request, res: Response, next: NextFunction) => {
//   res.status(200).send('Welcome to my server!')
// })
// Fallback / 404
app.use((req, res, next) => {
    res.status(404).json({
        message: "Invalid route!"
    });
});
// Start server
const PORT = process.env.PORT;
if (!PORT) {
    throw new Error("Missing port!");
}
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
