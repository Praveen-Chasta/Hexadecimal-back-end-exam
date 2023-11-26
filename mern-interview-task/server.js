const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;

app.get("/v1/users", async (request, response) => {
  try {
    const users = await axios.get("https://jsonplaceholder.typicode.com/users");
    const posts = await axios.get("https://jsonplaceholder.typicode.com/posts");

    const combinedData = users.data.map((user) => ({
      ...user,
      posts: posts.data.filter((post) => post.userId === user.id),
    }));

    response.json(combinedData);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app;
