const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to mongodb"))
  .catch(err => console.error("Could not connect to mongodb", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  data: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model("Course", courseSchema);

async function creatCourse() {
  const course = new Course({
    name: "angular.js Course",
    author: "Justin",
    tags: ["angular2", "frontend"],
    isPublished: true
  });

  const result = await course.save();
  console.log(result);
}

async function getCourse() {
  const pageNumber = 8;
  const pageSize = 10;
  // /api/courses?pageNumber=2&pageSize=10

  const courses = await Course
    // .find({ author: "Justin", isPublished: true })
    // .find()
    // .or([{ author: "Justin" }, { isPublished: true }])
    // .find({ price: { $gt: 10, $lte: 20 } })
    // .find({ price: { $in: [10, 20, 25] } })
    // .find({ author: /^Jus/ })
    .find()
    .or([{ author: /^Jus/i }, { author: /tin$/ }, { author: /.*sti.*/ }])
    // .limit(4)
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    // .select({ name: 1, tags: 1 });
    .count();
  console.log(courses);
}

getCourse();

console.log("After");
