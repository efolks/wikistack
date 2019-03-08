const express = require("express");
const app = express();
const morgan = require("morgan");
const layout = require("./views/layout");
// // const { db }  = require('./models');
// const { Page } = require("./models");
// const { User } = require("./models");
const models = require("./models");
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');



app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

app.get("/", (req, res) => {
  res.send(layout(""));
});


const init = async () => {
    
    try {
        models.db.sync({ force: true });
        // await models.User.sync();
        // await models.Page.sync();
      
        const PORT = 1337;
      
        app.listen(PORT, () => {
          console.log(`App listening in port ${PORT}`);
      
      
        });
    } catch (error) {
        console.log(error);
    }

 
};

init();

models.db.authenticate().
then(() => {
  console.log('connected to the database');
})
// console.log('test');
