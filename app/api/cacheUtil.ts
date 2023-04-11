const CACHE = new Map<string,Buffer>();
export function setCache(key:string,value:Buffer){
  CACHE.set(key,value);
  return true;
}

export function getCache(key:string){
  return CACHE.get(key);
}