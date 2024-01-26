// ./src/desk-structure/parentChild.ts

import {DocumentStore} from 'sanity'
import {StructureBuilder} from 'sanity/desk'
import {map} from 'rxjs/operators'
import {TagIcon} from 'lucide-react'

export default function parentChild(
  schemaType: string[],
  S: StructureBuilder,
  documentStore: DocumentStore
) {
  const filter = `_type == "${schemaType[0]}" && !defined(parent) && !(_id in path("drafts.**"))`
  const filter1 = `_type == "${schemaType[1]}" && !defined(parent) && !(_id in path("drafts.**"))`
  const query = `*[${filter}]{ _id }`
  const options = {apiVersion: `1.0`}

  return S.listItem()
    .title('Subcategory')
    .icon(TagIcon)
    .child(() =>
      documentStore.listenQuery(query, {}, options).pipe(
        map(() =>
          S.list()
            .title('Subcategory')
            .items([
              // Create a List Item for all documents
              // Useful for searching
              S.listItem()
                .title('General Information')
                .schemaType(schemaType[0])
                .child(() =>
                  S.documentList()
                    .schemaType(schemaType[0])
                    .title('Planning Information')
                    .filter(filter)
                    // Use this list for displaying from search results
                    .canHandleIntent(
                      (intentName, params) => intentName === 'edit' && params.type === 'planning-application'
                    )
                    .child((id) => S.document().documentId(id).schemaType(schemaType[0]))
                )
                ,
              S.divider(),
              S.listItem()
              .title('Gallery')
              .schemaType(schemaType[1])
              .child(() =>
                S.documentList()
                  .schemaType(schemaType[1])
                  .title('Gallery')
                  .filter(filter1)
                  // Use this list for displaying from search results
                  .canHandleIntent(
                    (intentName, params) => intentName === 'edit' && params.type === 'gallery'
                  )
                  .child((id) => S.document().documentId(id).schemaType(schemaType[1]))
              )
              ,
            S.divider()
            ])
        )
      )
    )
}