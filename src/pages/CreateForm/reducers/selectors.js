import { createSelector, createStructuredSelector } from 'reselect';
import { cloneDeep } from 'lodash-es';

export const schemaJsonState = createStructuredSelector({
  schemaJson: createSelector(
    ({ createForm }) => createForm?.schemaJson,
    (data) => data ? cloneDeep(data) : {}
  )
});