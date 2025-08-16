import Matrix from './Matrix';
import Constelation from './Constelation';

const clazzs = [
  Constelation,
  Matrix,
  //
] as const;

const index = Math.floor(Math.random() * clazzs.length);
const clazz = clazzs[index];

customElements.define(clazz.customName, clazz as any, { extends: 'canvas' });

const canvas = document.createElement('canvas', { is: clazz.customName });
export default canvas;
