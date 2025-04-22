import { defineField, defineType } from "sanity";

export default defineType({
  title:
    "Global Content (Any changes to this page can take up to 24 hours to display on the published website)",
  name: "global-content",
  type: "document",
  fields: [
    defineField({
      title: "Integrations",
      name: "integrations",
      type: "string",
      options: {
        list: [
          { title: "Manual", value: "manual" },
          { title: "OpenAPI", value: "openAPI" },
          { title: "UniformAPI", value: "uniformAPI" },
        ],
        layout: "radio",
        direction: "vertical",
      },
    }),
    defineField({
      title: "Enable Comments",
      name: "globalEnableComments",
      type: "boolean",
      initialValue: true,
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
      name: "feedbackUrl",
      title: "Feedback Url",
      type: "string",
    }),
    defineField({
      name: "councilName",
      title: "Council Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "signUpUrl",
      title: "Sign Up Url",
      type: "string",
    }),
    defineField({
      name: "planningProcessUrl",
      title: "Planning Process Url",
      type: "string",
    }),
    defineField({
      name: "materialConsiderationUrl",
      title: "Material Consideration Url",
      type: "string",
    }),
    defineField({
      name: "howToGetInvolveUrl",
      title: "How To Get Involve Url",
      type: "string",
    }),
    defineField({
      title: "Logo",
      name: "logo",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Favicon",
      name: "favicon",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Google Analytics",
      name: "googleAnalytics",
      type: "string",
      description: "Optional",
    }),
    defineField({
      title: "Google Tag Manager",
      name: "googleTagManager",
      type: "string",
      description: "Optional",
    }),
  ],
  initialValue: {
    integrations: "manual",
    globalEnableComments: true,
  },
});
