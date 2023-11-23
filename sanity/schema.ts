import { type SchemaTypeDefinition } from 'sanity'

import planningApplication from './schemas/planningApplication'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [planningApplication],
}
