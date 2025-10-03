import { CompanyLogo } from '@/app/components/comapntLogos/config'
import CtaSection from '@/app/components/CtaSection/config'
import { Hero } from '@/app/components/Hero/config'
import { SEO } from '@/app/components/SEO/config'
import type { CollectionConfig } from 'payload'
import slugify from 'slugify'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: {
      en: 'Post',
      de: 'Beitrag',
    },
    plural: {
      en: 'Posts',
      de: 'Beiträge',
    },
  },
  admin: {
    useAsTitle: 'title',
    preview: (doc) => {
      if (!doc?.slug) return null
      return `https://protrance-backend-main.vercel.app/posts/${doc.slug}`
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
            en: 'Partner Logo',
            de: 'Partnerlogo',
          },
          fields: [CompanyLogo],
        },

        {
          label: {
            en: 'CTA',
            de: 'Handlungsaufforderung',
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
      name: 'publishedDate',
      type: 'date',
      label: {
        en: 'Published Date',
        de: 'Veröffentlichungsdatum',
      },
    },
  ],
}
