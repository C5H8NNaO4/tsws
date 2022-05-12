// @ts-ignore
const __tsa_r = 0.1;

type IsTypeEqual<T1, T2> = IsNotAny<T1> extends false
  ? false
  : IsNotAny<T2> extends false
  ? false
  : [T1] extends [T2]
  ? [T2] extends [T1]
    ? true
    : false
  : false;

type IsTypeAssignable<T1, T2> = IsNotAny<T1> extends false
  ? false
  : IsNotAny<T2> extends false
  ? false
  : [T2] extends [T1]
  ? true
  : false;

type IsNotAny<T> = 0 extends 1 & T ? false : true;
type Not<T> = [T] extends [true] ? false : true;
type FirstArgument<T> = T extends (arg1: infer A, ...args: any[]) => any ? A : never;
type SecondArgument<T> = T extends (arg1: any, arg2: infer A, ...args: any[]) => any ? A : never;
type ThirdArgument<T> = T extends (arg1: any, arg2: any, arg3: infer A, ...args: any[]) => any
  ? A
  : never;

type ArrayElement<T> = T extends (infer I)[] ? I : never;

function typeAssert<T extends true>() {
  if (__tsa_r > 0.1) console.log(true as T);
}
