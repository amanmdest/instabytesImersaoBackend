import 'dotenv/config';
import { ObjectId } from "mongodb";
import dbConnect from "../config/dbConfig.js";
const conexao = await dbConnect(process.env.STRING_CONEXAO);

export async function getAllPosts() {
    const db = conexao.db("imersao-instabytes");
    const collection = db.collection("posts");
    return collection.find().toArray();
}

export async function modelPost(post) {
    const db = conexao.db("imersao-instabytes");
    const collection = db.collection("posts");
    return collection.insertOne(post);
}

export async function modelPostUpdate(id, post) {
    const db = conexao.db("imersao-instabytes");
    const collection = db.collection("posts");
    const objID = ObjectId.createFromHexString(id); 
    return collection.updateOne({_id: new ObjectId(objID)}, {$set:post});
}

