/*-------------------------TYPESCRIPT ADVANCE------------------------*/
/*====================Type Aliases====================*/
// Type Aliases allow defining types with a custom name (an Alias).
type CarYear = number
type CarType = string
type CarModel = string
type Car = {
    year: CarYear,
    type: CarType,
    model: CarModel
}

const carYear: CarYear = 2001
const carType: CarType = "Toyota"
const carModel: CarModel = "Corolla"
const mycar: Car = {
    year: carYear,
    type: carType,
    model: carModel
};

/*====================Union Types====================*/
// Union types are used when a value can be more than a single type.
function printStatusCode(code: string | number) {
    console.log(`My status code is ${code}.`)
}

/*====================Functions====================*/
// Void Return Type
function printHello(): void {
    console.log('Hello!');
}
// Return Type // Default Parameters
function multiply(a: number, b: number = 2): number {
    return a * b;
}
// Rest Parameters
function add(a: number, b: number, ...rest: number[]) {
    return a + b + rest.reduce((p, c) => p + c, 0);
}

/*====================Interfaces====================*/
// Interfaces are similar to type aliases, except they only apply to object types.
interface Shape {
    getArea: () => number;
  }

/*====================Classes====================*/
// TypeScript adds types and visibility modifiers to JavaScript classes.
class Person {
    private name: string;
    private readonly age: number;
    public constructor(name: string, age: number) {
        this.name = name;
        // age cannot be changed after this initial definition, which has to be either at it's declaration or in the constructor.
        this.age = age;
    }
    public getName(): string {
        return this.name;
    }
    public setName(name: string): void{
        this.name = name;
    }
    public getAge(): number {
        return this.age;
    }
}
const person = new Person("Jane", 21);
console.log(person.getName());
// Inheritance: Implements
class Rectangle implements Shape {
    public constructor(protected readonly width: number, protected readonly height: number) {}

    public getArea(): number {
      return this.width * this.height;
    }
    public toString(): string {
        return `Rectangle[width=${this.width}, height=${this.height}]`;
    }
}
// Inheritance: Extends
class Square extends Rectangle {
    public constructor(width: number) {
        super(width, width);
    }
    // getArea gets inherited from Rectangle
    // this toString replaces the toString from Rectangle
    public override toString(): string {
        return `Square[width=${this.width}]`;
    }
}

/*====================Abstract Classes====================*/
// Classes can be written in a way that allows them to be used as a base class 
// for other classes without having to implement all the members. This is done 
// by using the abstract keyword. Members that are left unimplemented 
// also use the abstract keyword.
abstract class Polygon {
    public abstract getArea(): number;

    public toString(): string {
        return `Polygon[area=${this.getArea()}]`;
    }
}

/*====================Generics====================*/
// Generics allow creating 'type variables' which can be used to create classes, 
// functions & type aliases that don't need to explicitly define the types that they use.
// Generics makes it easier to write reusable code.
function createPair<S, T>(v1: S, v2: T): [S, T] {
    return [v1, v2];
}
console.log(createPair<string, number>('hello', 42)); // ['hello', 42]
// generalized classes
class NamedValue<T = string> {
    private _value: T | undefined;

    constructor(private name: string) {}

    public setValue(value: T) {
        this._value = value;
    }

    public getValue(): T | undefined {
        return this._value;
    }

    public toString(): string {
        return `${this.name}: ${this._value}`;
    }
}

let value = new NamedValue('myNumber');
value.setValue('myValue');
console.log(value.toString()); // myNumber: myValue

/*====================Utility Types====================*/
// Build in type manipulation, usually referred is utility types.
interface Duck {
    name: string;
    gender: string;
    canfly?: boolean;
}
let duckPart: Partial<Duck> = {}
let duck1: Required<Duck> = {
    name: 'duck1',
    gender: 'male',
    canfly: true // `Required` forces mileage to be defined
};
// Omit removes keys from an object type.
let duck2: Omit<Duck, 'gender' | 'canfly'> = {
    name: 'duck2',
}
// Pick removes all but the specified keys from an object type.
let duck3: Pick<Duck, 'name'> = {
    name: 'duck3',
}

// Record is a shortcut to defining an object type with a specific key type and value type.
const nameAgeMap: Record<string, number> = {
    'Alice': 21,
    'Bob': 25
};

// Exclude removes types from a union. removes types from a union.
type Primitive = string | number | boolean
const excludeValue: Exclude<Primitive, string> = true;

// ReturnType extracts the return type of a function type.
type PointGenerator = () => { x: number; y: number; };
const ReturnTypePoint: ReturnType<PointGenerator> = {
    x: 10,
    y: 20
};

// Parameters extracts the parameter types of a function type as an array.
type PointPrinter = (p: { x: number; y: number; }) => void;
const ParametersPoint: Parameters<PointPrinter>[0] = {
    x: 10,
    y: 20
};

/*====================Keyof====================*/
// keyof is a keyword in TypeScript which is used to extract the key type from an object type.