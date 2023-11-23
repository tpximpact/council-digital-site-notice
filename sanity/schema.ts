import { type SchemaTypeDefinition } from 'sanity'

import post from './schemas/post'
import planningApplication from './schemas/planningApplication'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, planningApplication],
}
