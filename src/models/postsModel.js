import dbConnect from '../config/dbConfig.js';
const conexao = await dbConnect(process.env.STRING_CONEXAO)

export async function getAllPosts() {
    const db = conexao.db("imersao-instabytes")
    const colecao = db.collection("posts")
    return colecao.find().toArray()
}

export async function modelPost(newPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    return colecao.insertOne(newPost);
}