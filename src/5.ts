export class Box {
  public properties: Map<Box, Box>;

  constructor() {
    this.properties = new Map<Box, Box>();
  }

  addProperty(key: Box, value: Box): void {
    this.properties.set(key, value);
  }

  getProperty(key: Box): Box | undefined {
    return this.properties.get(key);
  }

  hasEquivalentProperties(other: Box): boolean {
    // Base case: if both boxes have no properties, they should be the same instance to be related
    if (this.properties.size === 0 && other.properties.size === 0) {
      return this === other;
    }

    if (this.properties.size !== other.properties.size) {
      return false;
    }

    for (const [key, value] of this.properties) {
      const otherValue = other.getProperty(key);
      if (!otherValue || !value.hasEquivalentProperties(otherValue)) {
        return false;
      }
    }

    return true;
  }

  hasPropertyWithValue(key: Box, value: Box): boolean {
    const propertyValue = this.getProperty(key);
    if (propertyValue !== undefined) {
      if (propertyValue.hasEquivalentProperties(value)) {
        return true;
      }
      // Recursively check nested properties
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [nestedKey, nestedValue] of propertyValue.properties) {
        if (nestedValue.hasPropertyWithValue(key, value)) {
          return true;
        }
      }
    }
    return false;
  }

  // Method to ask the box if it has a specific property value
  isProperty(value: Box): boolean {
    for (const [key, propertyValue] of this.properties) {
      if (
        propertyValue.hasEquivalentProperties(value) ||
        propertyValue.hasPropertyWithValue(key, value)
      ) {
        return true;
      }
    }
    return false;
  }

  hasProperty(key: Box): boolean {
    // Check if the immediate properties contain the key
    if (this.properties.has(key)) {
      return true;
    }

    // Recursively check nested properties
    for (const nestedValue of this.properties.values()) {
      if (nestedValue.hasProperty(key)) {
        return true;
      }
    }

    return false;
  }
}

const colorBox = new Box();
const shapeBox = new Box();
const circleBox = new Box();
const squareBox = new Box();
const sphereBox = new Box();

const shapeCircleBox = new Box();
shapeCircleBox.addProperty(shapeBox, circleBox);

const shapeSquareBox = new Box();
shapeSquareBox.addProperty(shapeBox, squareBox);

const shapeSphereBox = new Box();
shapeSphereBox.addProperty(shapeBox, sphereBox);

const redBox = new Box();
const blueBox = new Box();

const redSquareBox = new Box();
redSquareBox.addProperty(shapeBox, squareBox);
redSquareBox.addProperty(colorBox, redBox);

const blueCircleBox = new Box();
blueCircleBox.addProperty(shapeBox, circleBox);
blueCircleBox.addProperty(colorBox, blueBox);

const redCircleBox = new Box();
redCircleBox.addProperty(shapeBox, circleBox);
redCircleBox.addProperty(colorBox, redBox);

console.log(redSquareBox.isProperty(redBox)); // Should return false

const suzieBox = new Box();

const umbrellaBox = new Box();

// Create a box for the umbrella and set its color to red
const redUmbrellaBox = new Box();
redUmbrellaBox.addProperty(colorBox, redBox); // The umbrella is red

// Now, relate the red umbrella to Suzie
suzieBox.addProperty(umbrellaBox, redUmbrellaBox);

const otherRedUmbrellaBox = new Box();
otherRedUmbrellaBox.addProperty(colorBox, redBox); // The umbrella is red

console.log(redUmbrellaBox.hasEquivalentProperties(otherRedUmbrellaBox)); // I need this false

// const suzieBox = new Box();
// const redBox = new Box();
// const umbrellaBox = new Box();

// // Create a box to represent "red umbrella"
// const redUmbrellaBox = new Box();
// redUmbrellaBox.addProperty(colorBox, redBox); // Color property
// redUmbrellaBox.addProperty(umbrellaBox, new Box()); // Umbrella property

// // Relate "red umbrella" to Suzie
// suzieBox.addProperty(redUmbrellaBox, new Box()); // Suzie has a red umbrella
