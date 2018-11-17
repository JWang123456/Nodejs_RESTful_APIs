const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://localhost/playground",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to mongodb"))
  .catch(err => console.error("Could not connect to mongodb", err));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 25
    //match: /pattern/
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
    lowercase: true
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      }
      // message: "should have at least one tag"
    }
  },
  data: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() {
      return this.isPublished;
    },
    get: v => Math.round(v),
    set: v => Math.round(v)
  }
});

const Course = mongoose.model("Course", courseSchema);

async function creatCourse() {
  const course = new Course({
    name: "angular.js Course",
    author: "Justin",
    tags: ["web", "frontend"],
    isPublished: false,
    category: "WEB",
    price: 15.8
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
}
// creatCourse();

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
    .find({ _id: id })
    // .or([{ author: /^Jus/i }, { author: /tin$/ }, { author: /.*sti.*/ }])
    // .limit(4)
    // .skip((pageNumber - 1) * pageSize)
    // .limit(pageSize)
    // .sort({ name: 1 })
    .select({ name: 1, tags: 1, price: 1 });
  // .count();
  console.log(courses[0].price);
}

getCourse("5bef6b7db0dfc02600fcca99");

async function updateCourse(id) {
  try {
    const result = await Course.findByIdAndUpdate(
      id,
      {
        $set: {
          author: "Terri",
          isPublished: false
        }
      },
      { new: true }
    );

    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
}
async function removeCourse(id) {
  try {
    const result = await Course
      .deleteOne
      // { _id: id },
      // {
      //   $set: {
      //     author: "Terri",
      //     isPublished: false
      //   }
      // },
      // { new: true }
      ();

    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
}

// removeCourse("5bedde78a3a89f35e85d715c");

console.log("After");
