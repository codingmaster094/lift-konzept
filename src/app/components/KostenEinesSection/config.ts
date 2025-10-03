import {
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Field } from 'payload'

export const KostenEinesSection: Field = {
  name: 'KostenEinesSection',
  type: 'group',
  label: {
    en: '',
    de: '',
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
      name: 'richText',
      type: 'richText',
      label: {
        en: 'Rich Text',
        de: 'Rich Text',
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
      name: 'KostenEines_carousel',
      type: 'array',
      label: {
        en: 'KostenEines_carousel',
        de: 'KostenEines-Karussell',
      },
      minRows: 0,
      labels: {
        singular: { en: 'KostenEines_carousel', de: 'Vorteil' },
        plural: { en: 'KostenEines_carousel', de: 'KostenEines' },
      },
      fields: [
        {
          name: 'KostenEines_carouselImage',
          type: 'upload',
          label: {
            en: 'KostenEines_carousel Image',
            de: 'KostenEines-Karussell Bild',
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
          name: 'euro',
          type: 'text',
          label: {
            en: '€',
            de: '€',
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
    {
      name: 'description',
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

export default KostenEinesSection
