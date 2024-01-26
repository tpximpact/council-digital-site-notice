import {defineField, defineType} from 'sanity'

// Install lucide.dev icons with "npm install lucide-react"
import {TagIcon} from 'lucide-react'

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({
        title: "Image Gallery",
        name: "image_gallery",
        type: 'array',
        of: [
          {
            type: 'image'
          }
        ]
      }),
     
  ],
  // Customize the preview so parents are visualized in the studio
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({title}) => ({
      title
    }),
  },
})