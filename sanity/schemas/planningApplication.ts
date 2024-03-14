import { defineField, defineType } from "sanity";
import {
  appeal,
  assessment,
  consultation,
  decision,
} from "../structure/helper";
import PopulateButton from "../../src/components/populate-button";

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
      suiGeneris: false,
    },
  },
  fields: [
    defineField({
      name: "isActive",
      title: "IsActive",
      type: "boolean",
      initialValue: false,
      description:
        "Optional - When set to true will show on the website. Will be hidden if false.",
    }),
    defineField({
      title: "Planning Id",
      name: "planningId",
      type: "string",
      description:
        "Required for old id links - This is the id from internal systems and can be used to link to the planning application url",
      readOnly: false,
    }),
    defineField({
      title: "Application number",
      name: "applicationNumber",
      type: "string",
      description: "Required",
      validation: (Rule: any) => Rule.required(),
      readOnly: false,
    }),
    defineField({
      name: "populateApi",
      title: "Integrations",
      type: "string",
      components: {
        input: PopulateButton,
      },
      description: "Fetch data from the selected integration.",
    }),
    defineField({
      title: "Application Type",
      name: "applicationType",
      type: "string",
      description: "Optional",
    }),

    defineField({
      title: "Name of development",
      name: "name",
      type: "string",
      description:
        "Optional - Use a short name that is used to identify this development or the plot of land, e.g. The Shard or Murphy's Yard",
    }),
    defineField({
      title: "Description",
      name: "description",
      type: "string",
      description: "Optional",
    }),
    defineField({
      title: "Address",
      name: "address",
      type: "string",
      description: "Optional",
    }),
    defineField({
      title: "Application Updates Url",
      name: "applicationUpdatesUrl",
      type: "string",
      description: "Optional",
    }),
    defineField({
      title: "Application Documents Url",
      name: "applicationDocumentsUrl",
      type: "string",
      description: "Optional",
    }),
    defineField({
      title: "Image Head",
      name: "image_head",
      type: "image",
      description: "Optional",
    }),
    defineField({
      title: "Image Gallery",
      name: "image_gallery",
      type: "array",
      of: [
        {
          type: "image",
        },
      ],
      validation: (Rule) =>
        Rule.custom((field: any) => {
          const duplicates = field.filter((item: any, index: number) =>
            field.some(
              (elem: any, idx: number) =>
                elem.asset._ref === item.asset._ref && idx !== index,
            ),
          );
          if (duplicates?.length > 0) {
            return "You can't upload an image twice";
          }
          return true;
        }),
      description: "Optional",
    }),
    defineField({
      title: "Application Stage",
      name: "applicationStage",
      validation: (Rule: any) => Rule.required(),
      description: "Required",
      type: "object",
      fields: [
        {
          title: "State",
          description: "please select the stage of application",
          name: "stage",
          type: "string",
          options: {
            list: ["Consultation", "Assessment", "Decision", "Appeal"],
            layout: "radio",
            direction: "horizontal",
          },
        },
        {
          title: "Status",
          description: "please select the status of the stage",
          name: "status",
          type: "object",
          fields: [
            {
              title: "Consultation",
              name: "consultation",
              type: "string",
              options: {
                list: consultation,
                layout: "radio",
              },
              initialValue: consultation[0],
              hidden: ({ document }: any) =>
                document?.applicationStage?.stage !== "Consultation",
            },
            {
              title: "Assessment",
              name: "assessment",
              type: "string",
              options: {
                list: assessment,
                layout: "radio",
              },
              initialValue: assessment[0],
              hidden: ({ document }: any) =>
                document?.applicationStage?.stage !== "Assessment",
            },
            {
              title: "Decision",
              name: "decision",
              type: "string",
              options: {
                list: decision,
                layout: "radio",
              },
              initialValue: decision[0],
              hidden: ({ document }: any) =>
                document?.applicationStage?.stage !== "Decision",
            },
            {
              title: "Appeal",
              name: "appeal",
              type: "string",
              options: {
                list: appeal,
                layout: "radio",
              },
              initialValue: appeal[0],
              hidden: ({ document }: any) =>
                document?.applicationStage?.stage !== "Appeal",
            },
          ],
        },
      ],
      initialValue: {
        stage: "Consultation",
        status: { consultation: "in progress" },
      },
    }),
    defineField({
      title: "Enable Comments",
      name: "enableComments",
      type: "boolean",
      initialValue: true,
      description: "Optional",
    }),
    defineField({
      title: "Consultation Deadline",
      name: "consultationDeadline",
      type: "date",
      description: "Required",
      hidden: ({ document }: any) =>
        !document?.enableComments ||
        document?.applicationStage?.stage !== "Consultation",
      validation: (Rule) =>
        Rule.custom((field, context: any) => {
          if (context.document?.enableComments && field === undefined) {
            return "This field must not be empty.";
          }
          return true;
        }),
    }),
    defineField({
      title: "Height",
      name: "height",
      type: "number",
      description: "Optional - Enter the maximum height in storeys",
    }),
    defineField({
      title: "Estimated construction time",
      name: "constructionTime",
      type: "string",
      description: "Optional",
    }),
    defineField({
      title: "Location",
      name: "location",
      type: "geopoint",
      description: "Optional",
    }),
    defineField({
      title: "Proposed land use",
      description: "Optional - Select all land use classes that apply",
      name: "proposedLandUse",
      type: "object",
      fields: [
        {
          title: "Class B - Industrial",
          name: "classB",
          type: "boolean",
          options: {
            layout: "checkbox",
          },
        },
        {
          title: "Class C - Residential",
          name: "classC",
          type: "boolean",
          options: {
            layout: "checkbox",
          },
        },
        {
          title: "Class E - Commercial",
          name: "classE",
          type: "boolean",
          options: {
            layout: "checkbox",
          },
        },
        {
          title: "Class F - Community",
          name: "classF",
          type: "boolean",
          options: {
            layout: "checkbox",
          },
        },
        {
          title: "SG - Sui Generis",
          name: "suiGeneris",
          type: "boolean",
          options: {
            layout: "checkbox",
          },
        },
        {
          title: "SG - Sui Generis Detail",
          description: "Please specify the use class for Sui Generis",
          name: "suiGenerisDetail",
          type: "string",
          hidden: ({ document }: any) => !document?.proposedLandUse?.suiGeneris,
          validation: (Rule) =>
            Rule.custom((field, context: any) => {
              if (
                context.document?.proposedLandUse?.suiGeneris &&
                field === undefined
              ) {
                return "This field must not be empty.";
              }
              return true;
            }),
        },
      ],
    }),
    defineField({
      title: "Open space impact",
      name: "showOpenSpace",
      type: "boolean",
      description: "Optional",
    }),
    defineField({
      title: "Open space area in square metres",
      name: "openSpaceArea",
      type: "number",
      description: "Required",
      hidden: ({ document }) => !document?.showOpenSpace,
      validation: (Rule) =>
        Rule.custom((openSpaceArea, context) => {
          if (openSpaceArea && context.document?.showOpenSpace === undefined) {
            return "This field must not be empty if the open space impact option is selected";
          }

          return true;
        }),
    }),
    // defineField({
    //   title: 'Healthcare impact',
    //   name: 'showHealthcare',
    //   type: 'boolean',
    //   description: 'Optional',
    // }),
    // defineField({
    //   title: 'Additional healthcare demand',
    //   description: 'Required - As a percentage',
    //   name: 'healthcareDemand',
    //   type: 'number',
    //   hidden: ({document}) => !document?.showHealthcare,
    //   validation: Rule => Rule.custom((healthcareDemand, context) => {

    //     if (healthcareDemand && context.document?.showHealthcare === undefined) {
    //       return 'This field must not be empty if the healthcare impact option is selected'
    //     }

    //     return true
    //   })
    // }),
    defineField({
      title: "Housing impact",
      name: "showHousing",
      type: "boolean",
      description: "Optional",
    }),
    defineField({
      title: "Housing",
      name: "housing",
      type: "object",
      description: "Optional",
      hidden: ({ document }) => !document?.showHousing,
      fields: [
        {
          title: "New residential homes",
          name: "residentialUnits",
          type: "number",
        },
        {
          title: "Affordable residential homes",
          name: "affordableResidentialUnits",
          description: "Affordable house percentage",
          type: "number",
        },
      ],
    }),
    defineField({
      title: "Carbon impact",
      name: "showCarbon",
      type: "boolean",
      description: "Optional",
    }),
    defineField({
      title: "Percentage change in CO2 emissions",
      name: "carbonEmissions",
      type: "number",
      description: "Optional",
      hidden: ({ document }) => !document?.showCarbon,
      validation: (Rule) =>
        Rule.custom((carbonEmissions, context) => {
          if (carbonEmissions && context.document?.showCarbon === undefined) {
            return "This field must not be empty if the carbon impact option is selected";
          }

          return true;
        }),
    }),
    defineField({
      title: "Pedestrian and vehicle access",
      name: "showAccess",
      type: "boolean",
      description: "Optional",
    }),
    defineField({
      title: "Pedestrian and vehicle access",
      name: "access",
      type: "text",
      description: "Optional",
      hidden: ({ document }) => !document?.showAccess,
      validation: (Rule) =>
        Rule.custom((access, context) => {
          if (access && context.document?.showAccess === undefined) {
            return "This field must not be empty if the pedestrian and vehicle access impact option is selected";
          }

          return true;
        }),
    }),
    defineField({
      title: "Jobs impact",
      name: "showJobs",
      type: "boolean",
      description: "Optional",
    }),
    defineField({
      title: "New jobs",
      name: "jobs",
      type: "object",
      description: "Optional",
      hidden: ({ document }) => !document?.showJobs,
      fields: [
        {
          title: "Minimum",
          name: "min",
          type: "number",
        },
        {
          title: "Maximum",
          name: "max",
          type: "number",
        },
      ],
    }),
    defineField({
      name: "commments",
      title: "Comments",
      type: "array",
      description: "Optional",
      of: [
        {
          type: "comment",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "applicationNumber",
      subtitle: "name",
    },
  },
});
