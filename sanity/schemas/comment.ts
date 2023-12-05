import { defineField, defineType } from "sanity";

export default defineType({
    title: "Comments",
    name: "comment",
    type: "document",
    fields: [
        defineField({
          title: "email",
          name: "email",
          type: "string",
          validation: (Rule: any) => Rule.email(),
          readOnly: true,
        }),
    ]
});