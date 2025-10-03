import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container py-28">
      <div className="prose max-w-none">
        <h1 style={{ marginBottom: 0 }}>404</h1>
        <p className="mb-4">This page could not be found.</p>
        {/* Use Link directly as a styled button or link */}
        <Link
          href="/"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: '#fff',
            borderRadius: '4px',
            textDecoration: 'none',
          }}
        >
          Go home
        </Link>
      </div>
    </div>
  )
}
