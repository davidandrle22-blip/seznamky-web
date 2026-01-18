export interface Produkt {
  id: string
  slug: string
  name: string
  logo: string
  description: string
  shortDescription?: string
  fullDescription: string
  affiliateUrl: string
  rating: number
  userRating?: number
  expertRating?: number
  users: string
  activeUsers?: string
  successRate?: string
  ageRange: string
  genderRatio?: string
  categories: string[]
  targetAudience?: string
  pros: string[]
  cons: string[]
  features: string[]
  highlights?: { icon: string; text: string }[]
  order: number
  isActive: boolean
  isFeatured?: boolean
  isNew?: boolean
  pricing: string
  freeVersion?: boolean
  freeFeatures?: string[]
}

export interface Clanek {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  author: string
  authorAvatar?: string
  createdAt: string
  readTime?: number
  isPublished: boolean
  isFeatured?: boolean
}

export interface Testimonial {
  id: string
  name: string
  age: number
  text: string
  image: string
}

export interface Kategorie {
  id: string
  name: string
  slug: string
  description: string
  icon: string
}

export interface SocialLinks {
  facebook?: string
  instagram?: string
  twitter?: string
}

export interface SEO {
  title: string
  description: string
  keywords: string
}

export interface Nastaveni {
  siteName: string
  siteDescription: string
  heroTitle: string
  heroSubtitle: string
  contactEmail: string
  contactPhone: string
  contactAddress: string
  socialLinks: SocialLinks
  footerText: string
  seo: SEO
  testimonials: Testimonial[]
  categories: Kategorie[]
}
