import {
  type Template,
  type TemplateResolver,
  type SchemaTypeDefinition,
} from "sanity";

import { globalContent } from "./singletons/globalContent";
import { planningApplication } from "./documents/planningApplication";
import { comment } from "./documents/comment";

// Define the actions that should be available for singleton documents
export const singletonActions = new Set([
  "publish",
  "discardChanges",
  "restore",
]);

// Define the singleton document types
export const singletonTypes = new Set(["global-content"]);

export const schema: {
  types: SchemaTypeDefinition[];
  templates: TemplateResolver;
} = {
  types: [
    // Singletons
    globalContent,
    // Documents
    planningApplication,
    comment,
  ],
  // Filter out singleton types from the global “New document” menu options
  templates: (templates: Template[]) =>
    templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
};
