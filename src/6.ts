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
const suzie = new Box();

// Define properties
colorProperty.addProperty(new Box(), redValue); // "color" property has a value "red"
shapeProperty.addProperty(new Box(), circleValue); // "shape" property has a value "circle"

// Create a red circle box
const redCircle = new Box();
redCircle.addProperty(colorProperty, redValue);
redCircle.addProperty(shapeProperty, circleValue);

// Suzie has a red circle
suzie.addProperty(redCircle, new Box());

// Check if Suzie has a red circle
console.log(suzie.hasProperty(redCircle)); // Should return true

const otherRedCircle = new Box();
otherRedCircle.addProperty(colorProperty, redValue);
otherRedCircle.addProperty(shapeProperty, circleValue);

// check if the red circle is the same as the other red circle
console.log(redCircle.hasEquivalentProperties(otherRedCircle)); // Should return true

console.log(redCircle === otherRedCircle); // Should return false
