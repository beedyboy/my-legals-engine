const express = require("express");
const Authenticated = require("../middleware/Authenticated");
const blogController = require("../controller/blog");
const router = express.Router();

router.post("/", Authenticated(blogController.createBlog));
router.put("/", Authenticated(blogController.updateBlog));

router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);
router.delete("/:id", Authenticated(blogController.deleteBlog));
module.exports = router;
