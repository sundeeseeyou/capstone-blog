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

//this line of codes connect you to the root / path
app.get("/", (req, res) => {
    postList.sort((b, a) => a.time - b.time);
    res.render("index.ejs", {
        activePage: "A Simple Blog",
        postList: postList
    });
    
});

//this shows the editor of article
app.get("/create-post", (req, res) => {
    res.render("post.ejs", {
        activePage: "Write your idea ..."
    });
});

//this line send the written post to the array
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


//this show single page article
app.get("/article/:id", (req, res) => {
    const articleId = parseInt(req.params.id);
    const article = postList[articleId];
    res.render("article.ejs", {
        article:article,
        articleId : articleId
     });
});

//retrieve article data when you want to edit them

app.get("/edit/article/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const editPost = postList[postId];
    const editTitle = editPost.title;
    const editText = editPost.text;

    res.render("edit.ejs", { postId, editTitle, editText });
});

//this will be use when you update your blog article
app.put("/article/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const updatedTitle = req.body["title-post"];
    const updatedContent = req.body["text-area"];

    // Update the post in the postList
    postList[id].title = updatedTitle;
    postList[id].text = updatedContent;

    // Redirect to the updated post or the home page
    res.redirect("/article/" + id);
});

//this code delete an array of your articles
app.delete('/article/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    postList.splice(postId,1);
    res.redirect("/");
});


app.listen(port, () => {
    console.log("listening on port " + port);
});
