const blogDAO = require("../dao/blog");
// do validation
class BlogService {
  async allBlogs() {
    return await blogDAO.all();
  }

  async getBlogById(id) {
    return await blogDAO.getBlogById(id);
    
  }
  async createBlog(blogData, author, cover_image) {
    const { title, content, published } = blogData;
    return blogDAO.createBlog(title, content, cover_image, published, author);
  }
  async updateBlog(blogData) {
    const { title, content, published, id } = blogData;
    return blogDAO.updateBlog(id, title, content, published);
  } 
  async delBlog(id) {
    const result = blogDAO.delBlog(id);
    if (result) {
      return { message: "Blog deleted successfully" };
    } else {
      return { message: "Blog not deleted" };
    }
  }
}
module.exports = new BlogService();
