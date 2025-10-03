import {
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Field } from 'payload'

export const VideoSection: Field = {
  name: 'VideoSection',
  type: 'group',
  label: {
    en: 'Video Section',
    de: 'Video-Bereich',
  },
  fields: [
    {
      name: 'thumbnalImage',
      type: 'upload',
      label: {
        en: 'thumbnal Image',
        de: 'Vorschaubild',
      },
      relationTo: 'media',
      required: false,
    },
    {
      name: 'video',
      type: 'upload',
      label: {
        en: 'Video',
        de: 'Video',
      },
      relationTo: 'media', // or 'videos' if you make a separate collection
      required: false,
      admin: {
        description: 'Upload a video file (e.g. MP4, WebM)',
      },
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
}

export default VideoSection
