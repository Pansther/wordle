import { generate } from "random-words";

export const generateWord = () => {
  return generate({ minLength: 5, maxLength: 5 }) as string;
};
