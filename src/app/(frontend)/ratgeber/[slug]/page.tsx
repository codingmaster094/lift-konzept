'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import Image from 'next/image'
interface Post {
  id: string
  title: string
  contents: {
    // Assuming 'contents' is the group name from your collection config
    Gutenberg: SerializedEditorState // This is where the Lexical JSON resides
    Featured_image?: {
      url: string
      alt?: string
    }
    type: 'none' | 'highImpact' | 'mediumImpact' | 'lowImpact'
    media?: {
      url: string
      alt?: string
    }
  }
  publishedDate?: string
}

const SinglePostPage = () => {
  const { slug } = useParams()
  const [post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    if (!slug) return

    fetch(`https://lift-konzept-backend.vercel.app/api/ratgeber?where[slug][equals]=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.docs && data.docs.length > 0) {
          setPost(data.docs[0])
        } else {
          setPost(null) // Handle case where post is not found
        }
      })
      .catch((error) => console.error('Error fetching post:', error)) // Add error handling
  }, [slug])

  if (!post) return <p className="p-10">Loading...</p>

  // Convert Lexical JSON to HTML using convertLexicalToHTML
  const htmlContent = post.contents.Gutenberg
    ? convertLexicalToHTML({ data: post.contents.Gutenberg })
    : ''

    console.log('htmlContent', htmlContent)
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      {post.contents.Featured_image?.url && (
        <Image
          src={post.contents.Featured_image.url}
          alt={post.contents.Featured_image.alt || ''}
          className="mb-6"
          width={600}
          height={500}
          unoptimized
        />
      )}

      {/* Render the converted HTML */}
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  )
}

export default SinglePostPage
