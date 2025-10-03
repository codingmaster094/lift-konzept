import {
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Field } from 'payload'

export const TreppenliftAdvisor: Field = {
  name: 'TreppenliftAdvisor',
  type: 'group',
  label: {
    en: 'Stairlift Advisor Section',
    de: 'Treppenlift-Berater',
  },
  fields: [
    {
      name: 'Stairlift_advisor_image1',
      type: 'upload',
      label: {
        en: 'Stairlift Advisor Image',
        de: 'Treppenlift-Berater image 1',
      },
      relationTo: 'media',
      required: false,
    },
    {
      name: 'Stairlift_advisor_image2',
      type: 'upload',
      label: {
        en: 'Stairlift Advisor Image',
        de: 'Treppenlift-Berater image  2',
      },
      relationTo: 'media',
      required: false,
    },
    {
      name: 'Stairlift_advisor_image3',
      type: 'upload',
      label: {
        en: 'Stairlift Advisor Image',
        de: 'Treppenlift-Berater image  3',
      },
      relationTo: 'media',
      required: false,
    },
    {
      name: 'Heading',
      type: 'text',
      label: {
        en: 'Heading',
        de: 'Überschrift',
      },
    },
    {
      name: 'SubHeading',
      type: 'text',
      label: {
        en: 'Sub Heading',
        de: 'Unterüberschrift',
      },
    },
    {
      name: 'richText',
      type: 'richText',
      label: {
        en: 'Rich Text',
        de: 'Textinhalt',
      },
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          EXPERIMENTAL_TableFeature(),
        ],
      }),
    },
    {
      name: 'TreppenliftAdvisor',
      type: 'array',
      label: {
        en: 'Stairlift advisor',
        de: 'Treppenlift-Berater',
      },
      minRows: 0,
      labels: {
        singular: { en: 'Stairlift Advisor', de: 'Treppenlift-Berater' },
        plural: { en: 'Stairlift Advisor', de: 'Treppenlift-Berater' },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: {
            en: 'title',
            de: 'Titel',
          },
        },
      ],
    },
    {
      name: 'decription',
      type: 'richText',
      label: {
        en: 'Rich Text',
        de: 'Textinhalt',
      },
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          EXPERIMENTAL_TableFeature(),
        ],
      }),
    },
  ],
}

export default TreppenliftAdvisor
