exports.up = function (knex) {
  return knex.schema
    .createTable("accounts", (table) => {
      table.increments("id");
      table.string("firstname", 30).nullable();
      table.string("lastname", 30).nullable(); 
      table.text("address").nullable();
      table.string("email", 50).notNullable().unique();
      table.text("password").notNullable();
      table.string("phone", 50).nullable();
      table.json("roles");
      table.boolean("hasRoles").nullable().defaultTo(false);
      table.text("token").nullable();
      table
        .enu("status", ["Active", "Pending", "Deleted", "Banned"])
        .defaultTo("Active");
      table.timestamps(true, true);
    })
    .createTable("subscribers", function (subscribeTable) {
      subscribeTable.increments();
      subscribeTable.string("email", 50).notNullable().unique();
      subscribeTable
        .enu("status", ["Active", "Pending", "Deleted"])
        .defaultTo("Active");
      subscribeTable.timestamps(true, true);
    })
  
    .createTable("blogs", (recTable) => {
      recTable.increments("id");
      recTable.string("title", 30).notNullable();
      recTable.text("content").nullable(); 
      recTable.text("cover_image").nullable(); 
      recTable.boolean("published").nullable().defaultTo(false); 
      recTable.integer("author").unsigned().nullable(); 
      recTable.timestamps(true, true);
      recTable
        .foreign("author")
        .references("id")
        .inTable("accounts")
        .onDelete("CASCADE")
        .onUpdate("CASCADE"); 
    })
    .then(() => console.log("table created"))
    .catch((err) => {
      console.log(err);
      throw err;
    })
    .finally(() => {
      knex.destroy();
    });
  
};

exports.down = function (knex) {
  return knex.schema.dropTable("accounts");
};
