export type ShapeType = 'square' | 'circle' | 'triangle';
export type ColorType = 'red' | 'blue' | 'yellow';

export interface Relatable {
  relateTo(other: Relatable): boolean;
}

export class Shape implements Relatable {
  constructor(public type: ShapeType) {}

  relateTo(other: Relatable): boolean {
    if (other instanceof Shape) {
      return this.type === other.type; // Logic for relating shapes
    }
    return false; // Logic for different types or default behavior
  }
}

export class Color implements Relatable {
  constructor(public type: ColorType) {}

  relateTo(other: Relatable): boolean {
    if (other instanceof Color) {
      return this.type === other.type; // Logic for relating colors
    }
    return false; // Logic for different types or default behavior
  }
}

const square = new Shape('square');
const circle = new Shape('circle');
const red = new Color('red');
const blue = new Color('blue');

console.log(square.relateTo(circle)); // False, different shapes
console.log(red.relateTo(blue)); // False, different colors
console.log(square.relateTo(red)); // False, different types
