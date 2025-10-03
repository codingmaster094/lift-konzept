import {
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Field } from 'payload'

export const FinanzierungSection: Field = {
  name: 'FinanzierungSection',
  type: 'group',
  label: {
    en: '',
    de: '',
  },
  fields: [
    {
      name: 'FinanzierungImage',
      type: 'upload',
      label: {
        en: 'Finanzierung Image',
        de: 'Finanzierung Bild',
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
      name: 'Finanzierung_carousel',
      type: 'array',
      label: {
        en: 'Finanzierung_carousel',
        de: 'Finanzierung-Karussell',
      },
      minRows: 0,
      labels: {
        singular: { en: 'Finanzierung_carousel', de: 'Vorteil' },
        plural: { en: 'Finanzierung_carousel', de: 'Finanzierung' },
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
      name: 'Finanzierung_link',
      type: 'group',
      label: {
        en: 'Finanzierung Link',
        de: 'Finanzierung Link',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: {
            en: 'Link Label',
            de: 'Link-Beschriftung',
          },
        },
        {
          name: 'url',
          type: 'text',
          label: {
            en: 'URL',
            de: 'URL',
          },
        },
        {
          name: 'target',
          type: 'select',
          label: {
            en: 'Target',
            de: 'Ziel',
          },
          options: [
            { label: { en: 'Same Tab', de: 'Gleiches Tab' }, value: '_self' },
            { label: { en: 'New Tab', de: 'Neues Tab' }, value: '_blank' },
          ],
          defaultValue: '_self',
        },
      ],
    },
  ],
}

export default FinanzierungSection
