import { createContext, Context } from 'react';
import type { ContextValue } from './types';

const AntdSchemaFormContext: Context<ContextValue | {}> = createContext({});

export default AntdSchemaFormContext;