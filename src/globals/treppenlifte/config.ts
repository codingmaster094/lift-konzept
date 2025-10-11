import type { GlobalConfig, PayloadRequest } from 'payload'
import slugify from 'slugify'
import { Hero } from '@/app/components/Hero/config'
import { CompanyLogo } from '@/app/components/comapntLogos/config'
import { revalidateTreppenlifte } from './hooks/revalidateTreppenlifte'
import TreppenliftAdvisor from '@/app/components/TreppenliftAdvisor/config'
import CtaSection from '@/app/components/CtaSection/config'
import { TreppenliftGallery } from '@/app/components/TreppenliftGallery/config'
import { SEO } from '@/app/components/SEO/config'

export const populateAuthor = async ({ doc, req }: { doc: any, req: PayloadRequest }) => {
  // Only run if author exists but is still an ID string
  if (doc?.author && typeof doc.author === 'string') {
    try {
      // Fetch user manually (make sure to include depth=0 for just the user fields)
      const user = await req.payload.findByID({
        collection: 'users',
        id: doc.author,
        depth: 1, // fetch relationships inside user if needed
        overrideAccess: true, // ensure it works even for unauthenticated reads
      })

      doc.author = user
    } catch (error) {
      console.error(`❌ Error populating author ${error}:`)
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
