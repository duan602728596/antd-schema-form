import { createContext, Context } from 'react';
import { ContextValue } from './types';

const AntdSchemaFormContext: Context<ContextValue | {}> = createContext({});

export default AntdSchemaFormContext;