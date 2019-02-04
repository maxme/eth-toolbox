export interface ICachedData {
  [key: string]: any;
}
export interface ICache {
  batchSet(dataset: ICachedData): void;
  set(key: string, data: any): void;
  get(key: string): any;
  save(): void;
  close(): void;
  iterate(gapSize: number, callback: (err: string | null, data: any) => void, count?: number): void;
}
