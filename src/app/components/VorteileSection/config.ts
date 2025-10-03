import {
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Field } from 'payload'

export const VorteileSection: Field = {
  name: 'VorteileSection',
  type: 'group',
  label: {
    en: 'Vorteile Section',
    de: 'Vorteile-Bereich',
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
      name: 'Vorteile_carousel',
      type: 'array',
      label: {
        en: 'Vorteile_carousel',
        de: 'Vorteile-Karussell',
      },
      minRows: 0,
      labels: {
        singular: { en: 'Vorteile_carousel', de: 'Vorteil' },
        plural: { en: 'Vorteile_carousel', de: 'Vorteile' },
      },
      fields: [
        {
          name: 'Vorteile_carouselImage',
          type: 'upload',
          label: {
            en: 'Vorteile_carousel Image',
            de: 'Vorteile-Karussell Bild',
          },
          relationTo: 'media',
          required: false,
        },
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

export default VorteileSection
