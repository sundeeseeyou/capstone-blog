import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
// let active = "";
let postList = [];

// const DATA_ENTRY = (title,post) => ({
//     title:title,
//     post:post
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const storePost = (req,res,next) => {
    const title = req.body["title-text"];
    const textArea = req.body["text-area"];
    next();

}

app.use(storePost);

app.get("/", (req,res) => {
    res.render("index.ejs",{
        activePage: "A cute blog",
        article1: postList[0]
    });
});

app.get("/create-post", (req,res) => {
    res.render("post.ejs",{
        activePage: "Write your idea ..."
    })
});


app.post("/submit", (req,res) => {

    res.render("post.ejs");

});

app.listen(port, () => {
    console.log("listening on port "+ port);
})