import { Field } from 'payload'

export const CompanyLogo: Field = {
  name: 'companyLogo',
  type: 'group',
  label: {
    en: 'Company Logos',
    de: 'Firmenlogos',
  },
  fields: [
    {
      name: 'logos',
      type: 'array',
      label: {
        en: 'Logos',
        de: 'Logos',
      },
      minRows: 0,
      labels: {
        singular: { en: 'Logo', de: 'Logo' },
        plural: { en: 'Logos', de: 'Logos' },
      },
      fields: [
        {
          name: 'logoImage',
          type: 'upload',
          label: {
            en: 'Logo Image',
            de: 'Logo Bild',
          },
          relationTo: 'media',
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
      ],
    },
  ],
}
