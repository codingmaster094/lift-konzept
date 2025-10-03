import { BlogAbout } from '@/app/components/blog-About/config'
import { CompanyLogo } from '@/app/components/comapntLogos/config'
import { Contents } from '@/app/components/contents/config'
import CtaSection from '@/app/components/CtaSection/config'
import FaqSection from '@/app/components/FaqSection/config'
import { Hero } from '@/app/components/Hero/config'
import { richTextData } from '@/app/components/richText/config'
import { SEO } from '@/app/components/SEO/config'
import type { CollectionConfig } from 'payload'
import slugify from 'slugify'

export const Ratgeber: CollectionConfig = {
  slug: 'ratgeber',
  labels: {
    singular: {
      en: 'ratgeber',
      de: '',
    },
    plural: {
      en: 'ratgeber',
      de: '',
    },
  },
  admin: {
    useAsTitle: 'title',
    preview: (doc) => {
      if (!doc?.slug) return null
      return `https://lift-konzept-backend.vercel.app/ratgeber/${doc.slug}`
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      label: {
        en: 'Authors',
        de: 'Autoren',
      },
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: {
        en: 'Title',
        de: 'Titel',
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
        description: {
          en: 'Auto-generated from title if left blank',
          de: 'Wird automatisch aus dem Titel generiert, wenn leer',
        },
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
            en: 'Comapny Logo',
            de: '',
          },
          fields: [CompanyLogo],
        },
        {
          label: {
            en: 'Description',
            de: '',
          },
          fields: [richTextData],
        },

        {
          label: {
            en: 'Blog About',
            de: 'Über den Blog',
          },
          fields: [BlogAbout],
        },
        {
          label: {
            en: 'CTA',
            de: '',
          },
          fields: [CtaSection],
        },
        {
          label: {
            en: 'Content',
            de: 'Inhalt',
          },
          fields: [Contents],
        },
        {
          label: {
            en: 'FAQ',
            de: 'Häufige Fragen',
          },
          fields: [FaqSection],
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
      name: 'publishedDate',
      type: 'date',
      label: {
        en: 'Published Date',
        de: 'Veröffentlichungsdatum',
      },
    },
  ],
}
