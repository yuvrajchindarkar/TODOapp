const router = require("express").Router();
const mytodo = require("../models/Todo")


//router
router.post("/add/todo", (req, res) => {
    const {todo, description} = req.body;
    const newTodo = new mytodo({todo, description})

    ///save the todo


    newTodo.save()
    .then(() => {
        console.log("Succcessfullyy add todo")
        res.redirect("/")
    })
    .catch((err) => console.log(err))
})

//delete
.get("/delete/todo/:_id", (req, res) => {
    const { _id } = req.params;
    mytodo.deleteOne({ _id })
      .then(() => {
        console.log("Deleted Todo Successfully!");
        res.redirect("/");
      })
      .catch((err) => console.log(err));
  });

  //update
  
// Update a todo item - GET request
router.get("/update/todo/:id", (req, res) => {
    const { id } = req.params;
  
    mytodo.findById(id)
      .then(todo => {
        res.render("update", { todo: todo.todo, todo });
      })
      .catch(error => {
        console.error("Error fetching Todo:", error);
        res.redirect("/");
      });
  });
  
  // Update a todo item - POST request
  router.post("/update/todo/:id", (req, res) => {
    const { id } = req.params;
    const { todo, description } = req.body;
  
    mytodo.findByIdAndUpdate(id, { todo, description }, { new: true })
      .then(updatedTodo => {
        console.log("Updated Todo:", updatedTodo);
        res.redirect("/");
      })
      .catch(error => {
        console.error("Error updating Todo:", error);
        res.redirect("/");
      });
  });
  



module.exports= router;