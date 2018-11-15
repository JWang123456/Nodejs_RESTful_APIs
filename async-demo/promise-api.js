// const p = Promise.resolve({ id: 1 });
// p.then(result => console.log(result));

const p1 = new Promise(resolve => {
  setTimeout(() => {
    console.log("Async 1");
    resolve(1);
    // reject(new Error("something fail"));
  }, 1000);
});

const p2 = new Promise(resolve => {
  setTimeout(() => {
    console.log("Async 2");
    resolve(2);
  }, 1000);
});

// p1.then(result => console.log(result));
Promise.race([p1, p2])
  .then(result => console.log(result))
  .catch(err => console.log(err));
