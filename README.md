simpleblog
This simple multi pages blog without database.is build using Express JS, and it's modules such as EJS, method-override and body-parser.

INSTALLATION
----------------

You download the source code or clone.
Make sure you have node js installed on your machine

initiate npm

npm i

recheck again some modules that you need to install

npm i express ejs body-parser module-override nodemon

FEATURES
-----------------

- CREATE
- READ
- UPDATE
- DELETE

ADDITIONAL
-----------------------
I tried to make this codes have very simple javascript client side, since it's focusing on server side, so it's easier for you to focus on the server side.
The challenge was to connect HTML form tag with the server routes (app.put and app.delete), since HTML forms only have 2 methods value = GET and UPDATE, so I have to figureout how to make that request for PUT and DELETE
Gladly I found the middleware method-override to make GET and UPDATE can do PUT / DELETE request to the server
