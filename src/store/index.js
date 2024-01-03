import { createPinia } from 'pinia';

const pinia = createPinia();

export default pinia;

export * from './modules/user';
export * from './modules/match';
export * from './modules/regard';
