import { defineField, defineType } from "sanity";

export default defineType({
    title: "Comment Information",
    name: "comment-information",
    type: "document",
    fields: [
        defineField({
            title: "Concern Url",
            name: "concernUrl",
            type: "string",
            // readOnly: true,
          }),
          defineField({
            title: "Concern Content",
            name: "concernContent",
            type: "text",
            // readOnly: true,
          })
    ],
    
});