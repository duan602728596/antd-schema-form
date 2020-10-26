import { createContext, Context } from 'react';
import type { ContextValue } from './types';

const AntdSchemaFormContext: Context<ContextValue> = createContext({} as ContextValue);

export default AntdSchemaFormContext;