import fs from 'fs'
import { getAllPosts, modelPost, modelPostUpdate } from "../models/postsModel.js";
import generateDescription from "../services/geminiService.js";

export async function listPosts(req, res) {
    const posts = await getAllPosts();
    res.status(200).json(posts);
}

export async function createPost(req, res) {
    const post = req.body;
    try {
        const createdPost = await modelPost(post);
        res.status(201).json(createdPost);
    } catch(err) {
        console.error(err.message);
        res.status(500).json({"Error": "Requisition failed"});
    };
}

export async function uploadImage(req, res) {
    const post = {
        description: "",
        imgUrl: req.file.originalname,
        alt: ""
    };
    try {
        const createdPost = await modelPost(post);
        const updatedImage = `uploads/${createdPost.insertedId}.png`
        fs.renameSync(req.file.path, updatedImage)
        res.status(201).json(createdPost);
    } catch(err) {
        console.error(err.message);
        res.status(500).json({"Error": "Requisition failed"})
    }
}

export async function updatePost(req, res) {
    const id = req.params.id;
    const urlImage = `http://localhost:3000/${id}.png`
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const description = await generateDescription(imgBuffer)
        const post = {
            img_url: urlImage,
            description: description,
            alt: req.body.alt
        }
        const createdPost = await modelPostUpdate(id, post);
        res.status(200).json(createdPost);
    } catch(err) {
        console.error(err.message);
        res.status(500).json({"Error": "Requisition failed"});
    }
}