export interface Box<T> {
  data: T;
  relationshipKey?: string | number;
}

function relateBoxes<T, U>(box1: Box<T>, box2: Box<U>): boolean {
  // Relationship logic, for example, based on a 'relationshipKey'
  return box1.relationshipKey === box2.relationshipKey;
}

// Example usage
const box1: Box<string> = { data: 'Hello', relationshipKey: 123 };
const box2: Box<number> = { data: 456, relationshipKey: 123 };

const areBoxesRelated = relateBoxes(box1, box2); // returns true if the relationshipKey matches

console.log(areBoxesRelated);
