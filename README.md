1. var vs let vs const

The main difference is their scope and whether they can be changed.

var → function scoped and can be redeclared.
let → block scoped and can be updated but not redeclared.
const → block scoped and cannot be updated or redeclared.



2. The Spread Operator (...)
The spread operator "unpacks" elements from an array or object. It’s perfect for copying or merging data without mutating the original.

Arrays: const combined = [...arr1, ...arr2];

Objects: const newUser = { ...user, age: 25 };



3. map() vs filter() vs forEach()

These are array methods but used for different purposes.

forEach(): Executes a function for each element. It returns undefined. Use it when you just want to "do something" (like logging).

map(): Creates a new array by transforming every element of the original.

filter(): Creates a new array containing only the elements that pass a specific condition.



4. Arrow Functions

A shorter syntax for writing functions. They don't have their own this context, which makes them great for callbacks.

Regular: function(a){ 
         return a + 10; 
         }

Arrow: (a) => a + 10;



5. Template Literals

Template literals use backticks ( ) and${}` to insert variables easily.

Old way: "Hello " + name

New way: `Hello ${name}`

Also supports multi-line strings.