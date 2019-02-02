import { createContext, Context } from 'react';
import { ContextValue } from './types';

const AntdSchemaForm: Context<ContextValue> = createContext({});

export default AntdSchemaForm;