export function formatJSON(json: string, spaces: number = 2): string {
  if (!json.trim()) {
    throw new Error('Please enter some JSON to format');
  }
  
  try {
    const obj = JSON.parse(json);
    return JSON.stringify(obj, null, spaces);
  } catch (error) {
    throw new Error(`Invalid JSON: ${(error as Error).message}`);
  }
}

export function minifyJSON(json: string): string {
  if (!json.trim()) {
    throw new Error('Please enter some JSON to minify');
  }
  
  try {
    const obj = JSON.parse(json);
    return JSON.stringify(obj);
  } catch (error) {
    throw new Error(`Invalid JSON: ${(error as Error).message}`);
  }
}

export function validateJSON(json: string): boolean {
  if (!json.trim()) {
    throw new Error('Please enter some JSON to validate');
  }
  
  try {
    JSON.parse(json);
    return true;
  } catch (error) {
    throw new Error(`${(error as Error).message}`);
  }
}