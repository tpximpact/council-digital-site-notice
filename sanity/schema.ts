import { type SchemaTypeDefinition } from 'sanity'

import planningApplication from './schemas/planningApplication'
import comment from './schemas/comment'
import commentInformation from './schemas/commentInformation'
import category from './schemas/category'
import gallery from './schemas/gallery'

export const schema: SchemaTypeDefinition[] = [category, gallery, planningApplication, comment, commentInformation]
