import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { NextRequest, NextResponse } from 'next/server'
import type { GlobalSlug } from 'payload'

export const revalidate = 0 // disables caching in Next.js

export const GET = async (req: NextRequest) => {
  try {
    // ✅ Wait for Payload to be ready
    const payload = await getPayload({ config: await configPromise })

    // ✅ Get ?slug= param from URL
    const searchParams = req.nextUrl.searchParams
    const slug = searchParams.get('slug') as GlobalSlug | null

    if (!slug) {
      return NextResponse.json(
        { success: false, message: 'Missing slug parameter' },
        { status: 400 }
      )
    }

    // ✅ Fetch the global with full depth
    const data = await payload.findGlobal({
      slug,
      depth: 2,
    })

    if (!data) {
      return NextResponse.json(
        { success: false, message: `No global found for slug "${slug}"` },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      slug,
      data,
    })
  } catch (error: any) {
    console.error('❌ Error fetching global:', error)
    return NextResponse.json(
      {
        success: false,
        message: `Error fetching global "${req.nextUrl.searchParams.get('slug')}"`,
        error: error?.message,
      },
      { status: 500 }
    )
  }
}
