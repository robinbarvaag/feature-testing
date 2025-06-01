import { settings } from './settings';
import { homePage } from './home-page';

export const singletons = [settings, homePage];

export const documents = [...singletons];
