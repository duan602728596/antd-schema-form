import * as React from 'react';
import { createContext, Context } from 'react';
import { ContextValue } from './types';

const AntdSchemaForm: Context<ContextValue> = createContext({});

export default AntdSchemaForm;