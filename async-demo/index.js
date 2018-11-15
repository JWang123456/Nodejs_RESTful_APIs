console.log("Before");

//getUser(1, displayuser);

// getUser(1)
//   .then(user => getRepositories(user.githubUsername))
//   .then(repo => getCommit(repo))
//   .then(commits => console.log(commits))
//   .catch(err => console.log(err.message));

async function displaycommit() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.githubUsername);
    const commits = await getCommit(repos[0]);
    console.log(commits);
  } catch (err) {
    console.log(err);
  }
}

displaycommit();

console.log("After");

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("reading from db");
      resolve({ id: id, githubUsername: "name" });
    }, 1000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("calling github api");
      reject(new Error("just fail"));
      //   resolve(["rep1", "rep2", "rep3"]);
    }, 1000);
  });
}

function getCommit(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("calling github commit api");
      resolve(["this is a commit"]);
    }, 1000);
  });
}

// function displaycommit(commit) {
//   console.log(commit);
// }
// function displayuser(user) {
//     console.log(user);
//     getRepositories(user.githubUsername, displayrepo);
//   }
// function displayrepo(repo) {
//   console.log(repo);
//   getCommit(repo, displaycommit);
// }
