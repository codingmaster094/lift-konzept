import { Field } from 'payload'
export const TreppenliftGallery: Field = {
  name: 'TreppenliftGallery',
  type: 'group',
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
      name: 'TreppenliftGallery',
      type: 'array',
      minRows: 0,
      fields: [
        {
          name: 'Stairliftgallery',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
      ],
    },
  ],
}
