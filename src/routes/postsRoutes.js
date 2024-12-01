import cors from "cors";
import express from "express";
import multer from "multer";
import { createPost, listPosts, uploadImage, updatePost } from '../controllers/postsController.js ';

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions))
    app.get("/posts", listPosts);
    app.post("/posts", createPost);
    app.post("/upload", upload.single("image"), uploadImage);
    app.put("/upload/:id", updatePost)
};

export default routes;