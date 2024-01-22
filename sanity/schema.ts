import { type SchemaTypeDefinition } from 'sanity'

import planningApplication from './schemas/planningApplication'
import comment from './schemas/comment'
import commentInformation from './schemas/commentInformation'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [planningApplication, comment, commentInformation],
}
