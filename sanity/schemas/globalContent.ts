import { defineField, defineType } from "sanity";

export default defineType({
    title: "Global Content",
    name: "globalcontent",
    type: "document",
    fields: [
      defineField({
        title: "Integrations",
        name: "integrations",
        type: "string",
        initialValue: "manual",
        options: {
          list: ['manual','openAPI', 'uniform'],
        },
      }),
        defineField({
            title: "Concern Url",
            name: "concernUrl",
            type: "string",
          }),
          defineField({
            title: "Concern Content",
            name: "concernContent",
            type: "text",
          }),
          defineField({
            title: "Cookie Policy Content",
            name: "cookiePolicyContent",
            type: "text",
          }),
          defineField({
            name: 'feedbackUrl',
            title: 'Feedback Url',
            type: 'string',
          }),
          defineField({
            name: 'councilName',
            title: 'Council Name',
            type: 'string',
            validation: Rule => Rule.required(),
          }),
          defineField({
            name: 'signUpUrl',
            title: 'Sign Up Url',
            type: 'string',
          }),
          defineField({
            name: 'planningProcessUrl',
            title: 'Planning Process Url',
            type: 'string',
          }),
          defineField({
            name: 'materialConsiderationUrl',
            title: 'Material Consideration Url',
            type: 'string',
          }),
          defineField({
            name: 'howToGetInvolveUrl',
            title: 'How To Get Involve Url',
            type: 'string',
          }),
          defineField({
            title: 'Logo',
            name: 'logo',
            type: 'image',
            validation: Rule => Rule.required(),
          }),
          defineField({
            title: 'Favicon',
            name: 'favicon',
            type: 'image',
            validation: Rule => Rule.required(),
          }),
    ],
    
});