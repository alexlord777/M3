// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

let id = 1;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests


server.get('/', (req, res) => {
    res.send('hola ')
});

server.post('/posts', (req, res) => {
    let { author, title, contents } = req.body
    if (!author || !title || !contents) {
        return res.status(STATUS_USER_ERROR).json({ error: "No se recibieron los parámetros necesarios para crear el Post" })
    }

    let post = {
        author,
        title,
        contents,
        id: id++
    }

    posts.push(post)
    console.log(post);
    res.json(post)
});

server.post('/posts/author/:author', (req, res) => {
    let { title, contents } = req.body
    let author = req.params.author
    if (!author || !title || !contents) {
        return res.status(STATUS_USER_ERROR).json({ error: "No se recibieron los parámetros necesarios para crear el Post" })
    }

    let post = {
        author,
        title,
        contents,
        id: id++
    }

    posts.push(post)
    console.log(post);
    res.json(post)
});

server.get('/posts', (req, res) => {
    let term = req.query.term;
    if (term) {
        const term_post = posts.filter(
            (p) => p.title.includes(term) || p.contents.includes(term)
        )
        res.json(term_post)
    }
    res.json(posts)
})

server.get('/posts/:author', (req, res) => {
    let find = posts.find(post => post.author === req.params.author);

    if (find) {
        res.json(find)
    } else {
        res.status(STATUS_USER_ERROR).json({ error: "No se recibieron los parámetros necesarios para crear el Post" })
    }
})

server.get('/posts/:author/:title', (req, res) => {
    let find = posts.find(post => post.author === req.params.author && post.title === req.params.title);

    if (find) {
        res.json(find)
    } else {
        res.status(STATUS_USER_ERROR).json({ error: "No se recibieron los parámetros necesarios para crear el Post" })
    }
})

server.put('/posts', (req, res) => {

})
module.exports = { posts, server };