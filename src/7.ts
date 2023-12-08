export class Box {
  public properties: Map<Box, Box>;

  constructor() {
    this.properties = new Map<Box, Box>();
  }

  addProperty(property: Box, value: Box): void {
    this.properties.set(property, value);
  }

  // A method to check if two boxes are equivalent based on their structure and relationships
  hasEquivalentProperties(other: Box): boolean {
    if (this === other) {
      return true; // The same instance is always equivalent to itself
    }

    if (this.properties.size !== other.properties.size) {
      return false; // Different number of properties means they are not equivalent
    }

    for (const [key, value] of this.properties) {
      const otherValue = other.properties.get(key);
      if (!otherValue || !value.hasEquivalentProperties(otherValue)) {
        return false; // If any property does not match, they are not equivalent
      }
    }

    return true; // All properties matched
  }

  // A method to check if a box has a specific property
  hasProperty(property: Box): boolean {
    return this.properties.has(property);
  }
}

// Example usage:
const colorProperty = new Box();
const redValue = new Box();
const shapeProperty = new Box();
const circleValue = new Box();
const suzieBox = new Box();

// Define properties
colorProperty.addProperty(new Box(), redValue); // "color" property has a value "red"
shapeProperty.addProperty(new Box(), circleValue); // "shape" property has a value "circle"

// Create a red circle box
const redCircleBox = new Box();
redCircleBox.addProperty(colorProperty, redValue);
redCircleBox.addProperty(shapeProperty, circleValue);

// Suzie has a red circle
suzieBox.addProperty(redCircleBox, new Box());

// Check if Suzie has a red circle
console.log(suzieBox.hasProperty(redCircleBox)); // Should return true

const otherRedCircle = new Box();
otherRedCircle.addProperty(colorProperty, redValue);
otherRedCircle.addProperty(shapeProperty, circleValue);

// check if the red circle is the same as the other red circle
console.log(redCircleBox.hasEquivalentProperties(otherRedCircle)); // Should return true

console.log(redCircleBox === otherRedCircle); // Should return false

// Define "hasA" and "isA" as special property boxes
const hasAProperty = new Box();
const isAProperty = new Box();

// Example usage to model these relationships:

// Define some entities and their relationships as boxes
const vehicleBox = new Box();
const carBox = new Box();
const engineBox = new Box();

// Define "car" as a type of "vehicle" (isA relationship)
carBox.addProperty(isAProperty, vehicleBox);

// Define "car" has an "engine" (hasA relationship)
carBox.addProperty(hasAProperty, engineBox);

// Now you can check if a car is a vehicle
console.log(carBox.hasProperty(isAProperty)); // Should return true
console.log(carBox.hasEquivalentProperties(vehicleBox)); // Should return false, as they are not equivalent but related through isA

// Check if a car has an engine
console.log(carBox.hasProperty(hasAProperty)); // Should return true

// Example usage:
const color = new Box();
const red = new Box();
const shape = new Box();
const circle = new Box();
const suzie = new Box();

// Define properties
color.addProperty(new Box(), red); // "color" property has a value "red"
shape.addProperty(new Box(), circle); // "shape" property has a value "circle"

// Create a red circle
const redCircle = new Box();
redCircle.addProperty(color, red);
redCircle.addProperty(shape, circle);

// Suzie has a red circle
suzie.addProperty(redCircle, new Box());

// Check if Suzie has a red circle
console.log(suzie.hasProperty(redCircle)); // Should return true

const anotherRedCircle = new Box();
anotherRedCircle.addProperty(color, red);
anotherRedCircle.addProperty(shape, circle);

// Check if the red circle is the same as another red circle
console.log(redCircle.hasEquivalentProperties(anotherRedCircle)); // Should return true

console.log(redCircle === anotherRedCircle); // Should return false

// Define "hasA" and "isA" as special properties
const hasA = new Box();
const isA = new Box();

// Define some entities and their relationships
const vehicle = new Box();
const car = new Box();
const engine = new Box();

// Define "car" as a type of "vehicle" (isA relationship)
car.addProperty(isA, vehicle);

// Define "car" has an "engine" (hasA relationship)
car.addProperty(hasA, engine);

// Now you can check if a car is a vehicle
console.log(car.hasProperty(isA)); // Should return true
console.log(car.hasEquivalentProperties(vehicle)); // Should return false

// Check if a car has an engine
console.log(car.hasProperty(hasA)); // Should return true
