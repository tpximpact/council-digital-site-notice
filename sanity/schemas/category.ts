// ./schemas/category.js

import {defineField, defineType} from 'sanity'

// Install lucide.dev icons with "npm install lucide-react"
import {TagIcon} from 'lucide-react'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    // defineField({name: 'title', type: 'string'}),
    // defineField({
    //   name: 'parent',
    //   type: 'reference',
    //   to: [{type: 'category'}],
    //   // This ensures we cannot select other "children"
    //   options: {
    //     filter: '!defined(parent)',
    //   },
    // }),
    defineField({
        title: "Reference",
        name: "reference",
        type: "string",
        // validation: (Rule: any) => Rule.required(),
        // readOnly: true,
      }),
      defineField({
        title: "Address",
        name: "address",
        type: "string",
        // readOnly: true,
      }),
      defineField({
        title: "Application Type",
        name: "applicationType",
        type: "string",
      }),
      defineField({
        title: "Application Stage",
        name: "applicationStage",
        type: "string",
      }),
      defineField({
        title: "Name of development",
        name: "name",
        type: "string",
      }),
      defineField({
        title: "Description",
        name: "description",
        type: "string",
      }),
      defineField({
        title: "Image",
        name: "image",
        type: "image",
      }),
      defineField({
        title: "Height",
        name: "height",
        type: "number",
      }),
      defineField({
        title: "Development Type",
        name: "developmentType",
        type: "string",
      }),
      defineField({
        title: 'Estimated construction time',
        name: 'constructionTime',
        type: 'string'
      }),
     
  ],
  // Customize the preview so parents are visualized in the studio
  preview: {
    select: {
      title: 'reference',
    },
    prepare: ({title}) => ({
      title
    }),
  },
})