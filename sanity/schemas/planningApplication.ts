import { defineField, defineType } from "sanity";

export default defineType({
  title: "Planning application",
  name: "planning-application",
  type: "document",
  fields: [
    defineField({
      title: "Reference",
      name: "reference",
      type: "string",
      validation: (Rule: any) => Rule.required(),
      readOnly: true,
    }),
    defineField({
      title: "Address",
      name: "address",
      type: "string",
      readOnly: true,
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
    defineField({
      title: 'Proposed land use',
      description: 'Select all land use classes that apply',
      name: 'proposedLandUse',
      type: 'object',
      fields: [
        {
          title: 'Class B - Industrial',
          name: 'classB',
          type: 'boolean',
          options: {
            layout: 'checkbox'
          }
        },
        {
          title: 'Class C - Residential',
          name: 'classC',
          type: 'boolean',
          options: {
            layout: 'checkbox'
          }
        },
        {
          title: 'Class E - Commercial',
          name: 'classE',
          type: 'boolean',
          options: {
            layout: 'checkbox'
          }
        },
        {
          title: 'Class F - Community',
          name: 'classF',
          type: 'boolean',
          options: {
            layout: 'checkbox'
          }
        },
        {
          title: 'SG - Sui Generis',
          name: 'suiGeneris',
          type: 'boolean',
          options: {
            layout: 'checkbox'
          }
        }
      ]
    }),
    defineField({
      title: "Comment Deadline",
      name: "commentDeadline",
      type: "string",
    }),
    defineField({
      title: "New Homes",
      name: "newHomes",
      type: "string",
    }),
    defineField({
      title: "Open Space Gardens",
      name: "openSpaceGardens",
      type: "boolean",
    }),
    defineField({
      title: "Affordable Housing",
      name: "affordableHousing",
      type: "boolean",
    }),
    defineField({
      title: 'Healthcare impact',
      name: 'showHealthcare',
      type: 'boolean'
    }),
    defineField({
      title: 'Housing impact',
      name: 'showHousing',
      type: 'boolean'
    }),
    defineField({
      title: "C02 Emissions",
      name: "c02Emissions",
      type: "string",
    }),
    defineField({
      title: "Air Quality",
      name: "airQuality",
      type: "string",
    }),
    defineField({
      title: "Eastings",
      name: "eastings",
      type: "string",
      readOnly: true,
    }),
    defineField({
      title: "Northings",
      name: "northings",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: 'isActive',
      title: 'IsActive',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'commments',
      title: 'Comments',
      type: 'array',
      of: [
        {
          type: 'comment'
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'reference',
      subtitle: 'name'
    }
  }
});

