const db = require("../db/db");
class BlogDAO {
  all() {
    return db("blogs").select();
  }
  getBlogById(id) {
    return db
    .from("blogs as b")
    .where({ id })
    .leftOuterJoin("accounts as a", function () {
      this.on("b.author", "=", "a.id");
    }) 
    .first("b.*", "b.firstname", "b.lastname");
  }
  async createBlog(title, content, cover_image, published, author) {
    const [id] = await db("blogs")
      .insert({
        title,
        content,
        cover_image,
        published,
        author,
      })
      .returning("id");
    if (id > 0) {
      return { status: 200, message: "Blog created successfully", id };
    } else {
      return { status: 404, message: "Blog was not created" };
    }
  }
  async updateBlog(bid, title, content, cover_image, published, author) {
    const [id] = await db("blogs")
      .where("id", bid)
      .update({
        title,
        content,
        cover_image,
        published,
        author,
      })
      .returning("id");
    if (id > 0) {
      return {
        status: 200,
        message: "Blog record updated successfully",
        id,
      };
    } else {
      return { status: 404, message: "Blog record not updated" };
    }
  }
  async delBlog(id) {
    const result = await db("blogs").where("id", id).del();
    if (result.length > 0) return true;
    return false;
  }
}
module.exports = new BlogDAO();
