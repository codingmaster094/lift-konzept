import {
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Field } from 'payload'

export const richTextData: Field = {
  name: 'richText',
  type: 'group',
  label: {
    en: 'FAQ Section',
    de: 'FAQ Abschnitt',
  },
  fields: [
    {
      name: 'description',
      type: 'richText',
      label: {
        en: 'Answer',
        de: 'Antwort',
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
