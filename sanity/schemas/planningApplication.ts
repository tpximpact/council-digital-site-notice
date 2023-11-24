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
      title: "Description",
      name: "description",
      type: "string",
    }),
    defineField({
      title: "Height",
      name: "height",
      type: "string",
    }),
    defineField({
      title: "Development Type",
      name: "developmentType",
      type: "string",
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
      type: "string",
    }),
    defineField({
      title: "Affordable Housing",
      name: "affordableHousing",
      type: "string",
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
      name: 'isActive',
      title: 'IsActive',
      type: 'boolean',
      initialValue: true
    }),
  ],
});
