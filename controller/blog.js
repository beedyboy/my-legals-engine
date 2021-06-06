const { multerUploads } = require("../middleware/multer");
const blogService = require("../service/blog");
var upload = multerUploads.single("file");
class BlogController {
  async getAllBlogs(req, res) {
    try {
      const result = await blogService.allBlogs();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
  async getBlogById(req, res) {
    try { 
      const result = await blogService.getBlogById(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
  createBlog(req, res) {
    const { userId: author } = req;
    upload(req, res, async (err) => {
      if (err) {
        res.json({
          message: "error uploading blog",
          err,
        });
      } else {
        var files = req.files;
        let cover = files[0].filename;

        try {
          const result = await blogService.createBlog(req.body, author, cover);
          res.status(result.status).json(result);
        } catch (error) {
          console.error(error);
          res.status(500).json("something went wrong");
        }
      }
    });
  }
  async updateBlog(req, res) {
    try {
      const result = await blogService.updateBlog(req.body);
      res.status(result.status).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
  async deleteBlog(req, res) {
    try {
      const result = await blogService.delBlog(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
}
module.exports = new BlogController();
