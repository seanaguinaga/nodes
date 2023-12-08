export class Box {
  private properties: Map<Box, Box>;
  private values: Map<Box, Box>;
  private label: string; // Private label for debugging

  constructor(label = '') {
    this.properties = new Map<Box, Box>();
    this.values = new Map<Box, Box>();
    this.label = label;
  }

  addProperty(property: Box, value: Box): void {
    this.properties.set(property, value);
    this.values.set(value, property);
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

  hasProperty(property: Box): boolean {
    return this.properties.has(property);
  }

  hasValue(value: Box): boolean {
    return this.values.has(value);
  }

  hasPropertyWithValue(property: Box, value: Box): boolean {
    const currentValue = this.properties.get(property);
    return this.areValuesEquivalent(currentValue, value);
  }

  private areValuesEquivalent(value1: Box | undefined, value2: Box): boolean {
    if (value1 === value2) {
      return true; // Same instance
    }

    if (value1 === undefined) {
      return false; // value1 does not exist
    }

    // Check if the labels are the same, assuming label uniqueness for different instances
    if (value1.label !== value2.label) {
      return false;
    }

    // If both values have no properties, they are considered equivalent
    if (value1.properties.size === 0 && value2.properties.size === 0) {
      return true;
    }

    // If the number of properties is different, they are not equivalent
    if (value1.properties.size !== value2.properties.size) {
      return false;
    }

    // Recursively check all properties for equivalence
    for (const [propKey, propValue] of value1.properties) {
      const otherPropValue = value2.properties.get(propKey);
      if (
        !otherPropValue ||
        !this.areValuesEquivalent(propValue, otherPropValue)
      ) {
        return false;
      }
    }

    return true;
  }

  hasValueWithProperty(value: Box, property: Box): boolean {
    const currentProperty = this.values.get(value);
    return (
      currentProperty !== undefined &&
      currentProperty.hasEquivalentProperties(property)
    );
  }

  // Method to check if the box "isA" certain thing
  isA(thing: Box): boolean {
    return this.hasPropertyWithValue(isA, thing);
  }

  // Method to check if the box "hasA" certain thing
  hasA(thing: Box): boolean {
    return this.hasPropertyWithValue(hasA, thing);
  }

  // Method to print the label for debugging
  printLabel(): string {
    return this.label;
  }

  print(indentation = '', printedBoxes = new Set<Box>()): string {
    if (printedBoxes.has(this)) {
      return `${indentation}${this.printLabel()} (circular reference)\n`;
    }
    printedBoxes.add(this);

    let output = `${indentation}${this.printLabel()} has properties:\n`;
    for (const [key, value] of this.properties) {
      output += `${indentation}  ${key.printLabel()} : ${value.printLabel()}\n`;
      if (value.properties.size > 0) {
        output += value.print(indentation + '    ', printedBoxes);
      }
    }

    printedBoxes.delete(this); // Optional: allows the Box to be printed again in different contexts
    return output;
  }
}

// Define unique property boxes
const color = new Box('color');
const shape = new Box('shape');
const hasA = new Box('hasA');
const isA = new Box('isA');
const madeBy = new Box('madeBy');
const owns = new Box('owns');
const soldBy = new Box('soldBy');
const boughtBy = new Box('boughtBy');

// Define unique value boxes with labels
const red = new Box('red');
const blue = new Box('blue');
const vehicle = new Box('vehicle');
const car = new Box('car');
const truck = new Box('truck');
const engine = new Box('engine');
const manufacturer = new Box('manufacturer');
const toyota = new Box('toyota');
const ford = new Box('ford');

// Define people with labels
const alice = new Box('alice');
const bob = new Box('bob');
const charlie = new Box('charlie');

// Create vehicles with labels
const redCar = new Box('redCar');
redCar.addProperty(color, red);
redCar.addProperty(isA, car);

const blueTruck = new Box('blueTruck');
blueTruck.addProperty(color, blue);
blueTruck.addProperty(isA, truck);

// Define relationships using "isA" and "hasA"
car.addProperty(isA, vehicle); // "car" is a type of "vehicle"
truck.addProperty(isA, vehicle); // "truck" is a type of "vehicle"
car.addProperty(hasA, engine); // "car" has an "engine"
truck.addProperty(hasA, engine); // "truck" has an "engine"

// Define manufacturers
toyota.addProperty(isA, manufacturer); // "toyota" is a type of "manufacturer"
ford.addProperty(isA, manufacturer); // "ford" is a type of "manufacturer"

// Associate vehicles with manufacturers
redCar.addProperty(madeBy, toyota);
blueTruck.addProperty(madeBy, ford);

// People owning vehicles
alice.addProperty(owns, redCar);
bob.addProperty(owns, blueTruck);
charlie.addProperty(owns, redCar); // Let's say Charlie also owns a red car

const no = new Box('no');
const yes = new Box('yes');
const available = new Box('available');
const possible = new Box('possible');
const impossible = new Box('impossible');
const buyer = new Box('buyer');
const seller = new Box('seller');
const item = new Box('item');
const price = new Box('price');
const transaction = new Box('transaction');
const canProceed = new Box('canProceed');
const ownedBy = new Box('ownedBy');
const when = new Box('when');

const aliceBuysRedCarFromBob = new Box('aliceBuysRedCarFromBob');
aliceBuysRedCarFromBob.addProperty(buyer, alice);
aliceBuysRedCarFromBob.addProperty(seller, bob);
const fiveDollars = new Box('fiveDollars');
aliceBuysRedCarFromBob.addProperty(price, fiveDollars);
const todaysDate = new Box('todaysDate');
const day = new Box('day');
const wednesday = new Box('wednesday');
todaysDate.addProperty(day, wednesday);
const fiveOclock = new Box('fiveOclock');
todaysDate.addProperty(when, fiveOclock);
aliceBuysRedCarFromBob.addProperty(when, todaysDate);
aliceBuysRedCarFromBob.addProperty(item, redCar);
aliceBuysRedCarFromBob.addProperty(canProceed, possible);
aliceBuysRedCarFromBob.addProperty(isA, transaction);
redCar.addProperty(soldBy, bob);
redCar.addProperty(boughtBy, alice);
redCar.addProperty(ownedBy, alice);
redCar.addProperty(available, no);
const history = new Box('history');
redCar.addProperty(history, aliceBuysRedCarFromBob);

console.log(aliceBuysRedCarFromBob.print());

console.log(redCar.hasPropertyWithValue(madeBy, toyota));
