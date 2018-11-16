const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("successfully connect to db"))
  .catch(err => console.error(err));

const courseSchema = new mongoose.Schema({
  tags: [String],
  date: { type: Date, default: Date.now },
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number
});

const Bourse = mongoose.model("Course", courseSchema);

function getCourse() {
  return (
    Bourse.find()
      .or([{ price: { $gte: 15 } }, { name: /.*by.*/ }])
      // .find({ isPublished: true, tags: { $in: ["backend", "frontend"] } })
      // .or([
      //   { isPublished: true, tags: "backend" },
      //   { isPublished: true, tags: "frontend" }
      // ])
      .sort({ price: -1 })
      .select({ name: 1, price: 1, isPublished: 1 })
  );
}

async function run() {
  const courses = await getCourse();
  console.log(courses);
}

run();
