type Shape = 'square' | 'circle' | 'triangle';
type Color = 'red' | 'blue' | 'yellow';

export interface Box<T, C> {
  data: T;
  category: C;
}

const shapeBox1: Box<Shape, 'shape'> = { data: 'square', category: 'shape' };
const colorBox1: Box<Color, 'color'> = { data: 'red', category: 'color' };

const shapeBox2: Box<Shape, 'shape'> = { data: 'circle', category: 'shape' };
const colorBox2: Box<Color, 'color'> = { data: 'blue', category: 'color' };

type Category = 'shape' | 'color';

export function relateBoxes<T, U>(
  box1: Box<T, Category>,
  box2: Box<U, Category>,
): boolean {
  return box1.category !== box2.category;
}

// Example Usage
const areRelated1 = relateBoxes(shapeBox1, colorBox1); // returns true, different categories
const areRelated2 = relateBoxes(shapeBox1, shapeBox2); // returns false, same category
const areRelated3 = relateBoxes(shapeBox2, colorBox2); // Use colorBox2 to check relation with shapeBox2

console.log(areRelated1);
console.log(areRelated2);
console.log(areRelated3);
