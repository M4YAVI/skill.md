
// Re-export type from schema for consistency
export type { ManifestoItem } from './db/schema';

export enum GeneratorState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}

export interface ManifestoResponse {
  tagline: string;
  elaboration: string;
}
