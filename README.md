# Installation

#### Without docker

1. npm install
2. npm run build
3. npm start
4. go to http://localhost:3000

##### With docker

1. docker build -t app .
2. docker run -p 80:3000 app
3. go to http://localhost

# Enklare QnA

### What is, to your knowledge, the main differences between a relational database and a NoSQL database, and when would you prefer the latter.

SQL databases are table based and No-SQL databases are key-value and document based.
SQL databases scale much better (vertically) compared to no SQL (horizontally)

### Explain the difference between the keywords Implements and Extends when designing classes

The extends keyword is used to inherit the the functions and properties of a class, but when using implements you need to define the properties and functions

### Name some reasons why javascript applications use asynchronous code (Promises)

Sometimes when working with data the program need to 'wait' untill further execution, this is where you may use promises.
Its also easier to catch potential errors when not reciving data as expected

### What is the difference between === and == when comparing two variables?

== is value comparison
=== is value AND type comparison

### 5. What are the differences between the javascript keywords const, var and let?

var and let can be reassigned.
const is a constant wich cannot be changed.
let varaibles can only be used in the same 'block' whilest var is available throughout the whole function wich they are declared

### Write a simple function that takes an array of strings, and returns an array of numbers representing the length of those strings, ex: ["a","foo","b","foobar"] returns [1,3,1,6]

const arr = ["a","foo","b","foobar"]
arr.map((s) => {
return s.length
})

### When we import the following file, why is it only printing the “Hello World” text and not the others?

Its because the function is only declared but not called in the other examples.

### Which one/ones of #1, #2 och #3 is the correct way to use the promise defined in the top of this file?

Code #2
