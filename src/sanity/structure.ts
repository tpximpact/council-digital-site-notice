import { CogIcon } from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

const DISABLED_TYPES = ["global-content", "assist.instruction.context"];

// https://www.sanity.io/docs/structure-builder-cheat-sheet
// https://www.sanity.io/docs/studio/structure-builder-introduction
export const structure: StructureResolver = (S, Context) => {
  // console.log(...S.documentTypeListItems());
  return S.list()
    .title("DSN")
    .items([
      ...S.documentTypeListItems()
        // Remove the "assist.instruction.context" and "settings" content  from the list of content types
        .filter((listItem: any) => !DISABLED_TYPES.includes(listItem.getId()))
        // Pluralize the title of each document type.  This is not required but just an option to consider.
        .map((listItem) => {
          return listItem.title(listItem.getTitle() as string);
        }),
      // Settings Singleton in order to view/edit the one particular document for Settings.  Learn more about Singletons: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
      S.listItem()
        .title("Site Settings")
        .child(
          S.document().schemaType("global-content").documentId("globalContent"),
        )
        .icon(CogIcon),
    ]);
};
