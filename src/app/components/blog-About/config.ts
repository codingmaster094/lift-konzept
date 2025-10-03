import type { Field } from 'payload'
import {
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const BlogAbout: Field = {
  name: 'Blog_About',
  type: 'group',
  label: {
    en: 'Blog About Section',
    de: 'Blog Über Abschnitt',
  },
  fields: [
    {
      name: 'headding',
      type: 'text',
      required: false,
      localized: true,
      label: {
        en: 'Heading',
        de: 'Überschrift',
      },
    },
    {
      name: 'SubHeadding',
      type: 'text',
      required: false,
      localized: true,
      label: {
        en: 'Sub Heading',
        de: 'Überschrift',
      },
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          EXPERIMENTAL_TableFeature(),
        ],
      }),
      label: {
        en: 'Description',
        de: 'Beschreibung',
      },
    },
    {
      name: 'link',
      type: 'group',
      label: {
        en: 'Link',
        de: 'Link',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          label: {
            en: 'Link Label',
            de: 'Link Beschriftung',
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
            {
              label: { en: 'Same Tab', de: 'Gleiches Tab' },
              value: '_self',
            },
            {
              label: { en: 'New Tab', de: 'Neues Tab' },
              value: '_blank',
            },
          ],
          defaultValue: '_self',
        },
      ],
    },
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: {
        en: 'Type',
        de: 'Typ',
      },
      options: [
        {
          label: { en: 'None', de: 'Keine' },
          value: 'none',
        },
        {
          label: { en: 'High Impact', de: 'Starke Wirkung' },
          value: 'highImpact',
        },
        {
          label: { en: 'Medium Impact', de: 'Mittlere Wirkung' },
          value: 'mediumImpact',
        },
        {
          label: { en: 'Low Impact', de: 'Geringe Wirkung' },
          value: 'lowImpact',
        },
      ],
      required: false,
    },
    {
      name: 'media',
      type: 'upload',
      label: {
        en: 'Media',
        de: 'Medien',
      },
      relationTo: 'media',
      required: false,
      admin: {
        condition: (_, { type } = {}) =>
          ['highImpact', 'mediumImpact'].includes(type),
      },
    },
  ],
}
