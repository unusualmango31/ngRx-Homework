const app = require("./app");
const fs = require("fs");
const cors = require("cors");

const port = process.env.PORT || 3000;
let students = JSON.parse(fs.readFileSync("./server/students.json", "utf8"));

app.use(cors());
app.get('/api', (req, res) => {
  res.send(students["students"]);
});

app.listen(port, () => {
  console.log(`[Server] Server has been started on ${port}...`);
});
