import {
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Field } from 'payload'

export const StepsSection: Field = {
  name: 'StepsSection',
  type: 'group',
  label: {
    en: 'Steps Section',
    de: 'Schritte-Bereich',
  },
  fields: [
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
      name: 'Steps_carousel',
      type: 'array',
      label: {
        en: 'Steps_carousel',
        de: 'Schritte-Karussell',
      },
      minRows: 0,
      labels: {
        singular: { en: 'Steps_carousel', de: 'Schritt' },
        plural: { en: 'Steps_carousel', de: 'Schritte' },
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
      ],
    },
  ],
}

export default StepsSection
