const router = require("express").Router()

const mytodo = require("../models/Todo")

// routes will be here
router.get("/", async(req, res) => {
    const allTodo = await mytodo.find();
    res.render("index", {todo: allTodo})
})


module.exports = router;