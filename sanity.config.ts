/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...index]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schema'
import parentChild from './sanity/parentChildren'

// Define the actions that should be available for singleton documents
const singletonActions = new Set(["publish", "discardChanges", "restore"])

// Define the singleton document types
const singletonTypes = new Set(["settings"])

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [
    deskTool({
      structure: (S, context) =>
        S.list()
          .title("Content")
          .items([
            parentChild(['planning-application', 'gallery'], S, context.documentStore),
            S.divider(),
            // Our singleton type has a list item with a custom child
            S.listItem()
              .title("Settings")
              .id("settings")
              .child(
                // Instead of rendering a list of documents, we render a single
                // document, specifying the `documentId` manually to ensure
                // that we're editing the single instance of the document
                S.document()
                  .schemaType("settings")
                  .documentId("settings")
              ),

            // Regular document types
            // S.documentTypeListItem("planning-application").title("Planning application"),
            S.documentTypeListItem("comment-information").title("CommentInformation"),
          ]),
    }),
    visionTool({defaultApiVersion: apiVersion}),
  ],

  schema: {
    types: schema,

    // Filter out singleton types from the global “New document” menu options
    // templates: (templates) =>
    //   templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
    templates: (prev) => {
      const categoryChild = {
        id: 'category-child',
        title: 'Category: Child',
        schemaType: 'category',
        parameters: [{name: `parentId`, title: `Parent ID`, type: `string`}],
        // This value will be passed-in from desk structure
        value: ({parentId}: {parentId: string}) => ({
          parent: {_type: 'reference', _ref: parentId},
        }),
      }
  
      return [...prev, categoryChild]
    },
  },

  document: {
    // For singleton types, filter out actions that are not explicitly included
    // in the `singletonActions` list defined above
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
})
