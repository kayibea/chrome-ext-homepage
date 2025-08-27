import Matrix from './Matrix';
import NeonRibbons from './NeonRibbons';
import Constelation from './Constelation';
import NeonRibbonFlow from './NeonRibbonFlow';

const clazzs = [
  Matrix,
  NeonRibbons,
  Constelation,
  NeonRibbonFlow,
  //
] as const;

const index = Math.floor(Math.random() * clazzs.length);
const clazz = clazzs[index];

// const clazz = NeonRibbonFlow;

customElements.define(clazz.customName, clazz as any, { extends: 'canvas' });

const canvas = document.createElement('canvas', { is: clazz.customName });
export default canvas;
