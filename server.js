const mongoose = require("mongoose");
mongoose.set("strictQuery", false); //!!!!!

const app = require('./app')


//----------------------------------------------------------------
const { DB_HOST, PORT = 3000 } = process.env;

//! 1-вариант OLD
// mongoose.connect(DB_HOST)
//   .then(() => app.listen(PORT))
//   .then(() => console.log(`Server is running on the port: ${PORT}`.bgGreen.red))
//   .then(() => console.log(`Start HW-5 --> DRAFT`.bgRed.green))
//   .then(() => console.log("Database connection successful".bgBlue.yellow))
//   .then(() => console.log("---------------------------------------".yellow))
//   .catch(error => {
//     console.log(error.message);
//     process.exit(1); //? закрыть все неиспользуемые процессы
//   });

//! 2-вариант NEW
// async function main() {
//   try {
//     await mongoose.connect(DB_HOST);
//     app.listen(PORT);
//     console.log(`Server is running on the port: ${PORT}`.bgGreen.red);
//     console.log(`Start HW-5 --> DRAFT`.bgRed.green);
//     console.log("Database connection successful".bgBlue.yellow);
//     console.log("---------------------------------------".yellow);
//   } catch (error) {
//     console.log(error.message);
//     process.exit(1); //? закрыть все неиспользуемые процессы
//   }
// };
// main();
//! +++++++++++++++++++++++++ ITeam ++++++++++++++++++++++++++++
let x = 12
let y = 21
console.log("ДО:    ", "x =", x, "y =", y); // x = 12 y = 21

//--------
x = x + y;
y = x - y;
x = x - y;
console.log("ПОСЛЕ: ", "x =", x, "y =", y); // x = 21 y = 12
console.log("");


//----------------------------------------------------------------
const arr2 = { a: 1, b: 2 };
const arr3 = { a: 1, b: 2, c: 3 };
const arr4 = { a: 1, b: 2, c: 3, d: 4 };
const arr5 = { a: 1, b: 2, c: 3, d: 4, e: 5 }

//! Количество входных данных: n
const n = Object.keys(arr5).length; //4
// const n = 12
console.log("Количество входных данных --> n =", n);

//! Вычислительная временная сложность(time complexity) --> 1-й вариант
// const timeComplexity = parseInt(((n + 1) / 2), 10) * 3;
//! Вычислительная временная сложность(time complexity) --> 2-й вариант
const timeComplexity = Math.floor(((n + 1) / 2), 10) * 3;
// const timeComplexity = parseInt(((lengthАrr + 1) / 2), 10) * 3;
console.log("timeComplexity =", timeComplexity);

//! Вычислительная ёмкостная сложность (space complexity)
const spaceComplexity = 2 * n;
console.log("spaceComplexity =", spaceComplexity);
//! ___________________________ ITeam ____________________________



//! 3-вариант NEW
// async function main() {
(async () => {
  try {
    await mongoose.connect(DB_HOST);
    app.listen(PORT);
    console.log(`Server is running on the port: ${PORT}`.bgGreen.red);
    console.log(`Start HW-5 --> DRAFT`.bgRed.green);
    console.log("Database connection successful".bgBlue.yellow);
    console.log("---------------------------------------".yellow);

  } catch (error) {
    console.log(error.message);
    process.exit(1); //? закрыть все неиспользуемые процессы
  }
})();

