import { type SchemaTypeDefinition } from 'sanity'

import planningApplication from './schemas/planningApplication'
import comment from './schemas/comment'
import globalContent from './schemas/globalContent'

export const schema: SchemaTypeDefinition[] = [planningApplication, comment, globalContent]
