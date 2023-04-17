console.log("TypeScript is a syntactic superset of JavaScript which adds static typing.")

/*====================SIMPLE TYPES====================*/
//Implicit
let firstName: string = "Dylan";
let age: number = 21;
let isMan: boolean = true;
//Explicit
let myName = "eric"
let myAge = 21;
let myGender = true;

/*====================SPECIAL TYPES====================*/
let v: any = true; v = "cast value";
let w: unknown = false; w = "similar, but safer alternative to any";
let y: undefined = undefined;
let z: null = null;

/*====================Casting====================*/
let text: unknown = "hello"
console.log((text as string).length);
console.log((<string>text).length);

/*====================ARRAY====================*/
const names: string[] = [];
const numbers = [1, 2, 3];
names.push("Dylan");
numbers.push(4);                                // numbers.push("string") => error
const unChangable:readonly string[] = ["Dylan"];// unChangable.push("Dylan"); => error

/*====================TUPLES====================*/
// define our tuple
let ourTuple: [number, boolean, string];
// initialize correctly
ourTuple = [5, false, 'Coding God was here'];
// initialize incorrectly throws an error like:
// ourTuple = [false, 'Coding God was mistaken', 5];
// We have no type safety in our tuple for indexes 3+
ourTuple.push('Something new and wrong');
// define our readonly tuple
const ourReadonlyTuple: readonly [number, boolean, string] = [5, true, 'The Real Coding God'];
// destructure tuple
const graph: [number, number] = [55.2, 41.3];
const [x1, y1] = graph;

/*====================OBJECT TYPES====================*/
const car: { type: string, model: string, year: number, weight?: number} = {
    type: "Toyota",
    model: "Corolla",
    year: 2009
};

// ENUM
enum CardinalDirections {
    North = 1,              // default is 0
    East,
    South,
    West
}
  // logs 1
console.log(CardinalDirections.North);
  // logs 4
console.log(CardinalDirections.West);
// enum Fully Initialized
enum StatusCodes {
    NotFound = 404,
    Success = 200,
    Accepted = 202,
    BadRequest = 400
  }