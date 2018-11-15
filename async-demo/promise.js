const p = new Promise((resolve, reject) => {
  //put async work here
  setTimeout(() => {
    //resolve(1);
    reject(new Error("error message"));
  }, 1000);
});

p.then(result => {
  console.log(result);
}).catch(err => console.log(err.message));
