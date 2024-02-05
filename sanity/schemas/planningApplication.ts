import { defineField, defineType } from "sanity";
import { consultation, assessment, decision, appeal } from "../structure/helper";

export default defineType({
  title: "Planning application",
  name: "planning-application",
  type: "document",
  initialValue: {
    proposedLandUse: {
      classB: false,
      classC: false,
      classE: false,
      classF: false,
      suiGeneris: false
    }
  },
  fields: [
    defineField({
      name: 'isActive',
      title: 'IsActive',
      type: 'boolean',
      initialValue: false,
      description: 'When set to true will show on the website. Will be hidden if false.'
    }),
    defineField({
      title: "Application number",
      name: "applicationNumber",
      type: "string",
      validation: (Rule: any) => Rule.required(),
      readOnly: true
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
      title: "Name of development",
      name: "name",
      type: "string",
      description: 'Use a short name that is used to identify this development or the plot of land, e.g. The Shard or Murphy\'s Yard',
    }),
    defineField({
      title: "Description",
      name: "description",
      type: "string",
    }),
    defineField({
      title: "Address",
      name: "address",
      type: "string",
      //readOnly: true,
    }),
    defineField({
      title: "Image Head",
      name: "image_head",
      type: 'image'
    }),
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
      title: "Height",
      name: "height",
      type: "number",
      description: 'Enter the maximum height in storeys',
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
      title: "Comment Deadline",
      name: "commentDeadline",
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
      title: "Location",
      name: "location",
      type: "geopoint"
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
      title: "Open Space Gardens",
      name: "openSpaceGardens",
      type: "boolean",
    }),
    defineField({
      title: 'Open space impact',
      name: 'showOpenSpace',
      type: 'boolean'
    }),
    defineField({
      title: 'Open space area in square metres',
      name: 'openSpaceArea',
      type: 'number',
      hidden: ({document}) => !document?.showOpenSpace,
      validation: Rule => Rule.custom((openSpaceArea, context) => {

        if (openSpaceArea && context.document?.showOpenSpace === undefined) {
          return 'This field must not be empty if the open space impact option is selected'
        }
        
        return true
      })
    }),
    defineField({
      title: 'Healthcare impact',
      name: 'showHealthcare',
      type: 'boolean'
    }),
    defineField({
      title: 'Additional healthcare demand',
      description: 'As a percentage',
      name: 'healthcareDemand',
      type: 'number',
      hidden: ({document}) => !document?.showHealthcare,
      validation: Rule => Rule.custom((healthcareDemand, context) => {

        if (healthcareDemand && context.document?.showHealthcare === undefined) {
          return 'This field must not be empty if the healthcare impact option is selected'
        }
        
        return true
      })
    }),
    defineField({
      title: 'Housing impact',
      name: 'showHousing',
      type: 'boolean'
    }),
    defineField({
      title: 'Housing',
      name: 'housing',
      type: 'object',
      hidden: ({document}) => !document?.showHousing,
      fields: [
        {
          title: 'New residential homes',
          name: 'residentialUnits',
          type: 'number',
        },
        {
          title: 'Affordable residential homes',
          name: 'affordableResidentialUnits',
          type: 'number'
        },
      ]
    }),
    defineField({
      title: 'Carbon impact',
      name: 'showCarbon',
      type: 'boolean'
    }),
    defineField({
      title: 'Percentage change in CO2 emissions',
      name: 'carbonEmissions',
      type: 'number',
      hidden: ({document}) => !document?.showCarbon,
      validation: Rule => Rule.custom((carbonEmissions, context) => {

        if (carbonEmissions && context.document?.showCarbon === undefined) {
          return 'This field must not be empty if the carbon impact option is selected'
        }
        
        return true
      })
    }),
    defineField({
      title: 'Pedestrian and vehicle access',
      name: 'showAccess',
      type: 'boolean'
    }),
    defineField({
      title: 'Pedestrian and vehicle access',
      name: 'access',
      type: 'text',
      hidden: ({document}) => !document?.showAccess,
      validation: Rule => Rule.custom((access, context) => {

        if (access && context.document?.showAccess === undefined) {
          return 'This field must not be empty if the pedestrian and vehicle access impact option is selected'
        }
        
        return true
      })
    }),
    defineField({
      title: 'Jobs impact',
      name: 'showJobs',
      type: 'boolean'
    }),
    defineField({
      title: 'New jobs',
      name: 'jobs',
      type: 'object',
      hidden: ({document}) => !document?.showJobs,
      fields: [
        {
          title: 'Minimum',
          name: 'min',
          type: 'number'
        },
        {
          title: 'Maximum',
          name: 'max',
          type: 'number'
        }
      ]
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
      title: 'applicationNumber',
      subtitle: 'name'
    }
  }
});

