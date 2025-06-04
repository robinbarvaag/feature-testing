import { settings } from './settings';
import { homePage } from './home-page';
import { knowledgeEntry } from './knowledge-entry';
import { knowledgeEntryIndex } from './knowledge-entry';

export const singletons = [settings, homePage, knowledgeEntryIndex];

export const documents = [knowledgeEntry, ...singletons];
