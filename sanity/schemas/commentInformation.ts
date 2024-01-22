import { defineField, defineType } from "sanity";

export default defineType({
    title: "CommentInformation",
    name: "comment-information",
    type: "document",
    fields: [
        defineField({
            title: "ConcernUrl",
            name: "concernUrl",
            type: "string",
            // readOnly: true,
          }),
          defineField({
            title: "ConcernContent",
            name: "concernContent",
            type: "string",
            // readOnly: true,
          })
    ],
    
});