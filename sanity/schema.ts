import { type SchemaTypeDefinition } from 'sanity'

import planningApplication from './schemas/planningApplication'
import comment from './schemas/comment'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [planningApplication, comment],
}
