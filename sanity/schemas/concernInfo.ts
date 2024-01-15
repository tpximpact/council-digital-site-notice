import { defineField, defineType } from "sanity";

export default defineType({
    title: "ConcernInfo",
    name: "concern-info",
    type: "object",
    fields: [
        defineField({
            title: "url",
            name: "url",
            type: "string",
            // readOnly: true,
          }),
          defineField({
            title: "content",
            name: "content",
            type: "string",
            // readOnly: true,
          })
    ],
    
});