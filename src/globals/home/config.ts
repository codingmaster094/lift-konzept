import type { GlobalConfig, PayloadRequest } from 'payload'
import { revalidateHome } from './hooks/revalidateHome'
import slugify from 'slugify'
import { Hero } from '@/app/components/Hero/config'
import { CompanyLogo } from '@/app/components/comapntLogos/config'
import Experience from '@/app/components/Experiance/config'
import VideoSection from '@/app/components/VideoSection/config'
import VorteileSection from '@/app/components/VorteileSection/config'
import StepsSection from '@/app/components/StepsSection/config'
import FaqSection from '@/app/components/FaqSection/config'
import CtaSection from '@/app/components/CtaSection/config'
import { SEO } from '@/app/components/SEO/config'

// Function to manually fetch the author if defaultDepth failed (the failsafe)
export const populateAuthor = async ({ doc, req }: { doc: any; req: PayloadRequest }) => {
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

export const HomePage: GlobalConfig = {
  slug: 'home',
  label: {
    en: 'Homepage',
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
      name: 'relatedPage',
      type: 'relationship',
      relationTo: 'pages',
      maxDepth: 0,
      label: {
        en: 'Link to a Page',
        de: 'Mit einer Seite verknüpfen',
      },
      admin: {
        position: 'sidebar',
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
            de: 'Unternehmenslogos', // Filled in missing DE label
          },
          fields: [CompanyLogo],
        },
        {
          label: {
            en: 'Experience',
            de: 'Erfahrung', // Filled in missing DE label
          },
          fields: [Experience],
        },
        {
          label: {
            en: 'Video Section',
            de: 'Video-Abschnitt', // Filled in missing DE label
          },
          fields: [VideoSection],
        },
        {
          label: {
            en: 'Vorteile Section',
            de: 'Vorteile-Abschnitt', // Filled in missing DE label
          },
          fields: [VorteileSection],
        },
        {
          label: {
            en: 'Steps Section',
            de: 'Schritte-Abschnitt', // Filled in missing DE label
          },
          fields: [StepsSection],
        },
        {
          label: {
            en: 'Faq Section',
            de: 'FAQ-Abschnitt', // Filled in missing DE label
          },
          fields: [FaqSection],
        },
        {
          label: {
            en: 'CTA Section',
            de: 'CTA-Abschnitt', // Filled in missing DE label
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
    afterChange: [revalidateHome],
    // afterRead: [populateAuthor],
  },
}
