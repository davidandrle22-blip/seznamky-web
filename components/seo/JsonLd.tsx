import type { Produkt } from '@/lib/types'

interface ReviewSchemaProps {
  produkt: Produkt
  author?: string
  datePublished?: string
  dateModified?: string
}

interface FAQSchemaProps {
  items: { question: string; answer: string }[]
}

interface BreadcrumbSchemaProps {
  items: { name: string; url: string }[]
}

interface WebsiteSchemaProps {
  name: string
  url: string
  description: string
}

// Review Schema for product reviews
export function ReviewSchema({
  produkt,
  author = 'Redakce Seznamky.info',
  datePublished = new Date().toISOString().split('T')[0],
  dateModified = new Date().toISOString().split('T')[0]
}: ReviewSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'SoftwareApplication',
      name: produkt.name,
      applicationCategory: 'DatingApplication',
      operatingSystem: 'Web, iOS, Android',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'CZK',
        availability: 'https://schema.org/InStock'
      }
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: produkt.rating,
      bestRating: 10,
      worstRating: 1
    },
    author: {
      '@type': 'Person',
      name: author
    },
    publisher: {
      '@type': 'Organization',
      name: 'Seznamky.info',
      url: 'https://www.seznamky.info'
    },
    datePublished,
    dateModified,
    reviewBody: produkt.description
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// FAQ Schema for frequently asked questions
export function FAQSchema({ items }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Breadcrumb Schema for navigation
export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Website Schema for homepage
export function WebsiteSchema({ name, url, description }: WebsiteSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/seznamky?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      name,
      url,
      logo: {
        '@type': 'ImageObject',
        url: `${url}/logo.png`
      }
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Aggregate Rating Schema
export function AggregateRatingSchema({
  name,
  ratingValue,
  ratingCount,
  bestRating = 10,
  worstRating = 1
}: {
  name: string
  ratingValue: number
  ratingCount: number
  bestRating?: number
  worstRating?: number
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    applicationCategory: 'DatingApplication',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      bestRating,
      worstRating,
      ratingCount
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Organization Schema for About/Contact pages
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Seznamky.info',
    url: 'https://www.seznamky.info',
    logo: 'https://www.seznamky.info/logo.png',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'Czech'
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
