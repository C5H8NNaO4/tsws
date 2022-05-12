import { typeAssert, IsTypeEqual } from './type-assertions';
import { addNumbers } from './index';
type numType = ReturnType<typeof addNumbers>;

typeAssert<IsTypeEqual<numType, number>>();
