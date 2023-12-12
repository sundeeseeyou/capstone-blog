import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const app = express();
const port = 3000;
const postList = [];

const article1 = {
    title: "Indonesia adalah Negara Maju",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
}

const article2 = {
    title: "Who is Soekarno?",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
}

postList.push(article1);
postList.push(article2);

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("index.ejs", {
        activePage: "A cute blog",
        postList: postList
    });
});

app.get("/create-post", (req, res) => {
    res.render("post.ejs", {
        activePage: "Write your idea ..."
    });
});


app.post("/submit", (req, res) => {
    const title = req.body["title-post"];
    const textArea = req.body["text-area"];
    
    // Check if both title and text are present before adding to the postList
    if (title && textArea) {
        postList.push({ title: title, text: textArea });
    }

    // Redirect to the home page after submitting the form
    res.redirect("/");
});

app.get("/article/:id", (req, res) => {
    const articleId = parseInt(req.params.id);
    const article = postList[articleId];

    res.render("article.ejs", {
        article,
        articleId
     });
});


app.delete('/article/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    postList.splice(postId,1);
    res.redirect("/");
});


app.listen(port, () => {
    console.log("listening on port " + port);
});
