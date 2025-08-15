import Matrix from './Matrix';
import Constelation from './Constelation';

const animations = [
  Constelation,
  Matrix,
  //
] as const;

// const animations = [
//   Matrix,
//   //
// ];

const index = Math.floor(Math.random() * animations.length);
const animation = new animations[index]();

animation.setupListeners();

export default animation;
