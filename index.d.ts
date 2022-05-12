// declare global {
//   interface ArrayConstructor {
//     guard<T>(x: T | T[]): T[];
//   }
// }
// declare interface ArrayConstructor {
//   guard<T>(x: T | T[]): T[];
// }

declare global {
  interface Window {
    [key: string]: any;
  }
}
