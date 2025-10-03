import type { GlobalConfig, PayloadRequest } from 'payload'
import slugify from 'slugify'
import { Hero } from '@/app/components/Hero/config'
import { CompanyLogo } from '@/app/components/comapntLogos/config'
import { revalidateTreppenlifte } from './hooks/revalidateTreppenlifte'
import TreppenliftAdvisor from '@/app/components/TreppenliftAdvisor/config'
import CtaSection from '@/app/components/CtaSection/config'
import { TreppenliftGallery } from '@/app/components/TreppenliftGallery/config'
import { SEO } from '@/app/components/SEO/config'

const populateAuthor = async ({ doc, req }: { doc: any; req: PayloadRequest }) => {
  // Check if the author field is still a string (ID), meaning it wasn't populated
  if (typeof doc.author === 'string' && doc.author) {
    try {
      // Use Payload's local API to fetch the full user document
      const user = await req.payload.findByID({
        collection: 'users',
        id: doc.author,
        depth: 0, // Fetch the user data itself (including email)
      })

      // Replace the author ID with the populated user object
      doc.author = user
    } catch (e) {
      // If fetching fails (e.g., user was deleted), log an error and leave as ID
      console.error(`Error populating author ID ${doc.author} in afterRead hook:`, e)
    }
  }
  return doc
}
export const TreppenliftePage: GlobalConfig = {
  slug: 'treppenlifte',
  label: {
    en: 'Treppenliftepage',
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
      relationTo: 'users', // or 'authors' if you have a separate authors collection
      hasMany: false, // single author
      label: {
        en: 'Author',
        de: 'Autor',
      },
      admin: {
        position: 'sidebar', // shows in the sidebar
      },
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
            de: 'Firmenlogo',
          },
          fields: [CompanyLogo],
        },
        {
          label: {
            en: 'Stairlift Advisor',
            de: 'Treppenlift-Berater',
          },
          fields: [TreppenliftAdvisor],
        },
        {
          label: {
            en: 'CTA Section',
            de: 'CTA Abschnitt',
          },
          fields: [CtaSection],
        },
        {
          label: {
            en: 'Stairlift Gallery',
            de: 'Treppenlift Galerie',
          },
          fields: [TreppenliftGallery],
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
    afterChange: [revalidateTreppenlifte],
    afterRead: [populateAuthor],
  },
}
