class Box {
  private properties: Map<string, Box>;

  constructor() {
    this.properties = new Map<string, Box>();
  }

  addProperty(key: string, box: Box): void {
    this.properties.set(key, box);
  }

  getProperty(key: string): Box | undefined {
    return this.properties.get(key);
  }

  getProperties(): Map<string, Box> {
    return this.properties;
  }

  relateTo(other: Box): boolean {
    for (const [key, value] of this.properties) {
      if (!other.properties.has(key) || value !== other.properties.get(key)) {
        return false;
      }
    }
    return true;
  }
}

// Create boxes for shapes and colors
const shapeBox = new Box();
const colorBox = new Box();

// Create boxes for specific shapes and colors
const squareBox = new Box();
const circleBox = new Box();
const redBox = new Box();
const blueBox = new Box();

// Assign these boxes to the shape and color boxes
shapeBox.addProperty('square', squareBox);
shapeBox.addProperty('circle', circleBox);
colorBox.addProperty('red', redBox);
colorBox.addProperty('blue', blueBox);

const redSquareBox = new Box();
redSquareBox.addProperty('shape', squareBox);
redSquareBox.addProperty('color', redBox);

const blueCircleBox = new Box();
blueCircleBox.addProperty('shape', circleBox);
blueCircleBox.addProperty('color', blueBox);

console.log(redSquareBox.relateTo(blueCircleBox)); // Should return false

// log all the properties of all the boxes
console.log(shapeBox.getProperties());
console.log(colorBox.getProperties());
console.log(squareBox.getProperties());
console.log(circleBox.getProperties());
console.log(redBox.getProperties());
console.log(blueBox.getProperties());
console.log(redSquareBox.getProperties());
console.log(blueCircleBox.getProperties());
