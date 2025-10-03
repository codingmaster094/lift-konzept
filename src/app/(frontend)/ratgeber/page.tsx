'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

interface Post {
  id: string
  title: string
  slug: string
  publishedDate?: string
}

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    fetch('http://localhost:3000/api/posts') // Adjust if using different domain or port
      .then((res) => res.json())
      .then((data) => setPosts(data?.docs || []))
  }, [])

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">All Posts</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.slug}`}>
              <span className="text-blue-600 underline cursor-pointer">{post.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostsPage
