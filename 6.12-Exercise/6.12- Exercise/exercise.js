// getCustomer(1, customer => {
//   console.log("Customer: ", customer);
//   if (customer.isGold) {
//     getTopMovies(movies => {
//       console.log("Top movies: ", movies);
//       sendEmail(customer.email, movies, () => {
//         console.log("Email sent...");
//       });
//     });
//   }
// });
console.log("Before");

async function sendCustomEmail() {
  try {
    const customer = await getCustomer(1);
    console.log("Customer: ", customer);
    if (customer.isGold) {
      const topMovies = await getTopMovies();
      console.log("Top movies: ", topMovies);
      // const sendEmailResolve =
      await sendEmail(customer.email, topMovies);
      // console.log(sendEmailResolve, "nothing here...");
      console.log("Email sent...");
    }
  } catch (err) {
    console.log(err.message);
  }
}

sendCustomEmail();

console.log("After");

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "Mosh Hamedani",
        isGold: true,
        email: "email"
      });
    }, 1000);
  });
}

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["movie1", "movie2"]);
    }, 1000);
  });
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve();
      reject(new Error("simple rej"));
    }, 1000);
  });
}
