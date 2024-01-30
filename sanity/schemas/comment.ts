import { defineField, defineType } from "sanity";

export default defineType({
    title: "Comments",
    name: "comment",
    type: "object",
    fields: [
        defineField({
            title: "name",
            name: "name",
            type: "string",
            // readOnly: true,
          }),
          defineField({
            title: "address",
            name: "address",
            type: "string",
            // readOnly: true,
          }),
          defineField({
            title: "postcode",
            name: "postcode",
            type: "string",
            // readOnly: true,
            hidden: true,
          }),
          defineField({
            title: "telephone",
            name: "telephone",
            type: "string",
            // readOnly: true,
          }),
        defineField({
          title: "email",
          name: "email",
          type: "string",
          validation: (Rule: any) => Rule.email(),
        //   readOnly: true,
        }),
        defineField({
          title: "comment",
          name: "comment",
          type: "text",
        //   validation: (Rule: any) => Rule.required(),
        //   readOnly: true,
        }),
        defineField({
          title: "topic",
          name: "topic",
          type: "string",
          // readOnly: true,
        }),
    ],
    
});