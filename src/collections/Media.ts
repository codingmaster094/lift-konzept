import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    plural: {
      en: 'Media',
      de: 'Medien',
    },
  },
  access: {
    read: () => true,
  },
  upload: {
    mimeTypes: ['image/*', 'video/*'], // allow both
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
