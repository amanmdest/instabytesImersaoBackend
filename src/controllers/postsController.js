import { getAllPosts, modelPost } from "../models/postsModel.js";
import fs from 'fs'

export async function listPosts(req, res) {
    const posts = await getAllPosts();
    res.status(200).json(posts);
}

export async function createPosts(req, res) {
    const newPost = req.body;
    try {
        const createdPost = await modelPost(newPost);
        res.status(201).json(createdPost);
    } catch(err) {
        console.error(err.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    };
}

export async function uploadImage(req, res) {
    const newPost = req.body;
    try {
        const createdPost = await modelPost(newPost);
        const updatedImage = `uploads/${createdPost.insertedId}.jpg`
        fs.renameSync(req.file.path, updatedImage)
        res.status(201).json(createdPost);
    } catch(err) {
        console.error(err.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    };
}