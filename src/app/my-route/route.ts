import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { NextRequest } from 'next/server'
import type { GlobalSlug } from 'payload'

export const GET = async (req: NextRequest) => {
  const payload = await getPayload({ config: configPromise })

  try {
    const searchParams = req.nextUrl.searchParams
    const slug = searchParams.get('slug') as GlobalSlug | null

    if (!slug) {
      return Response.json({ success: false, message: 'Missing slug parameter' }, { status: 400 })
    }

    const data = await payload.findGlobal({ slug })

    return Response.json({
      success: true,
      slug,
      data,
    })
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: `Global with slug "${req.nextUrl.searchParams.get('slug')}" not found.`,
        error: (error as Error).message,
      },
      { status: 404 },
    )
  }
}
