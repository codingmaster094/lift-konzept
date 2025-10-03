import { buildConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'

// Collections & Globals
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/posts'
import { Ratgeber } from './collections/ratgeber'
import { Header } from './globals/Header/config'
import { Footer } from './globals/Footer/config'
import { menus } from './globals/menus/config'
import { HomePage } from './globals/home/config'
import { TreppenliftePage } from './globals/treppenlifte/config'
import { kosten_finanzierung } from './globals/kosten&finanzierung/config'
import { Treppenlifte_Ratgeber } from './globals/trappenlift_ratgeber/config'

// i18n
import { en } from '@payloadcms/translations/languages/en'
import { de } from '@payloadcms/translations/languages/de'
import { Impressum } from './globals/impressum/config'
import { Datenschutzerklärung } from './globals/datenschutzerklärung/config'
import { Robots } from './globals/robots/config'
import { Pages } from './collections/Pages'

// __dirname fix for ESM
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: 'https://lift-konzept-backend.vercel.app',
  i18n: {
    supportedLanguages: { en, de },
  },
  admin: {
    user: Users.slug,
    meta: {
      icons: [
        {
          rel: 'icon',
          type: 'image/png',
          url: '/images/favicon.png',
        },
      ],
    },
  },
  cors: ['https://lift-konzept-backend.vercel.app'],
  collections: [Pages, Users, Media, Posts, Ratgeber],
  globals: [
    Header,
    Footer,
    menus,
    HomePage,
    TreppenliftePage,
    kosten_finanzierung,
    Treppenlifte_Ratgeber,
    Impressum,
    Datenschutzerklärung,
    Robots,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'f104b2795f431aae94c77d75',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url:
      process.env.DATABASE_URI ||
      'mongodb+srv://gawaledipak109_db_user:Headbase@cluster0.4t99yxv.mongodb.net/lift-konzept-main?retryWrites=true&w=majority&appName=Cluster0',
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true, // Media collection uploads go to Vercel Blob
      },
      token: process.env.BLOB_READ_WRITE_TOKEN, // Set in Vercel env
    }),
  ],
})
