import {
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Field } from 'payload'

export const Hero: Field = {
  name: 'hero',
  type: 'group',
  label: {
    en: 'Hero Section',
    de: 'Hero Bereich',
  },
  fields: [
    {
      name: 'heroImage',
      type: 'upload',
      label: {
        en: 'Hero Image',
        de: 'Hero Bild',
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
      name: 'showParagraph',
      type: 'checkbox',
      label: 'Show Paragraph',
      defaultValue: false,
    },
    {
      name: 'showPoints',
      type: 'checkbox',
      label: 'Show Points',
      defaultValue: true,
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

    // Hero Main Link
    {
      name: 'hero_link',
      type: 'group',
      label: {
        en: 'Hero Link',
        de: 'Held Link',
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
    {
      name: 'isHeroformSection', // checkbox field
      type: 'checkbox',
      label: 'heroform section Show/Hide',
      defaultValue: false, // optional default
    },
    {
      name: 'heroformsection_Heading',
      type: 'text',
      label: {
        en: 'Hero Form Section Heading',
        de: 'Hero Formularbereich Überschrift',
      },
    },
    {
      name: 'heroformsection_items',
      type: 'array',
      label: {
        en: 'Hero Form Section Items',
        de: 'Hero Formularbereich Elemente',
      },
      minRows: 0,
      labels: {
        singular: { en: 'Item', de: 'Element' },
        plural: { en: 'Items', de: 'Elemente' },
      },
      fields: [
        {
          name: 'heroformsection_main_Image',
          type: 'upload',
          label: {
            en: 'Hero Form Section Main Image',
            de: 'Hero Formularbereich Hauptbild',
          },
          relationTo: 'media',
          required: false,
        },
        {
          name: 'heroformsection_main_link',
          type: 'group',
          label: {
            en: 'Hero Form Section Main Link',
            de: 'Hero Formularbereich Hauptlink',
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
    },

    {
      name: 'heroformsection_redirect_Image',
      type: 'upload',
      label: {
        en: 'Hero Form Section Redirect Image',
        de: 'Hero Formularbereich Weiterleitungsbild',
      },
      relationTo: 'media',
      required: false,
    },
    {
      name: 'heroformsection_redirect_link',
      type: 'group',
      label: {
        en: 'Hero Form Section Redirect Link',
        de: 'Hero Formularbereich Weiterleitungslink',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: {
            en: 'Link Label',
            de: 'Link-Beschriftung',
          },
          required: false,
        },
        {
          name: 'url',
          type: 'text',
          label: {
            en: 'URL',
            de: 'URL',
          },
          required: false,
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
