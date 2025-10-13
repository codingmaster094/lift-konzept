import type { GlobalConfig } from 'payload'
import slugify from 'slugify'
import { Hero } from '@/app/components/Hero/config'
import { CompanyLogo } from '@/app/components/comapntLogos/config'
import { KostenEinesSection } from '@/app/components/KostenEinesSection/config'
import CtaSection from '@/app/components/CtaSection/config'
import { revalidatekosten_finanzierung } from './hooks/revalidatekosten&finanzierung'
import FinanzierungSection from '@/app/components/FinanzierungSection/config'
import { SEO } from '@/app/components/SEO/config'

export const kosten_finanzierung: GlobalConfig = {
  slug: 'kosten-finanzierung',
  label: {
    en: 'kosten&finanzierung',
    de: 'Startseite',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
      label: {
        en: 'Title',
        de: 'Titel',
      },
    },
   {
        name: 'author',
        type: 'relationship',
        relationTo: 'users',
        hasMany: false,
        label: { en: 'Author', de: 'Autor' },
        admin: { position: 'sidebar' },
        maxDepth: 2,
      },
    {
      name: 'relatedPage', // Choose a descriptive name
      type: 'relationship',
      relationTo: 'pages', // This must match the slug of the collection you're linking to
      maxDepth: 0, // Optional: useful if you only need the ID and slug
      label: {
        en: 'Link to a Page',
        de: 'Mit einer Seite verknüpfen',
      },
      admin: {
        position: 'sidebar', // REMOVED: In v3.x, useAsTitle goes on the 'pages' collection config, not here.
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: {
        en: 'Slug',
        de: 'Kurzlink',
      },
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeValidate: [
          ({ siblingData, value }) => {
            if (siblingData?.title) {
              return slugify(siblingData.title, { lower: true })
            }
            return value
          },
        ],
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: {
            en: 'Hero',
            de: 'Held',
          },
          fields: [Hero],
        },
        {
          label: {
            en: 'company Logo',
            de: '',
          },
          fields: [CompanyLogo],
        },
        {
          label: {
            en: 'KostenEines Section',
            de: '',
          },
          fields: [KostenEinesSection],
        },
        {
          label: {
            en: 'Finanzierung Section',
            de: '',
          },
          fields: [FinanzierungSection],
        },
        {
          label: {
            en: 'CTA Section',
            de: '',
          },
          fields: [CtaSection],
        },
        {
                  label: {
                    en: 'SEO',
                    de: 'SEO',
                  },
                  fields: [SEO],
                },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: {
        en: 'Published At',
        de: 'Veröffentlicht am',
      },
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [revalidatekosten_finanzierung],
  },
}
