declare module "expo-file-system" {
  export const documentDirectory: string;
  export function getInfoAsync(uri: string): Promise<{ exists: boolean }>;
  export function readAsStringAsync(uri: string): Promise<string>;
  export function writeAsStringAsync(uri: string, data: string): Promise<void>;
}
