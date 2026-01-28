export interface FaqItem {
  question: string
  answer: string
}

export interface PricingTier {
  name: string
  duration: string
  price: string
  pricePerMonth?: string
  isPopular?: boolean
  isFree?: boolean
}

export interface RegistrationStep {
  title: string
  description: string
  duration?: string
}

export interface ScoreCategory {
  label: string
  score: number
}

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
  freeVersion?: boolean
  freeFeatures?: string[]
  faq?: FaqItem[]
  // Enhanced fields for review hub
  pricing?: PricingTier[]
  pricingNote?: string
  registrationSteps?: RegistrationStep[]
  scoreCategories?: ScoreCategory[]
  idealFor?: string[]
  notIdealFor?: string[]
  safetyInfo?: string
  verdict?: string
  lastUpdated?: string
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
  order?: number
  metaTitle?: string
  metaDescription?: string
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

export interface CategoryContent {
  slug: string
  heroTitle: string
  heroSubtitle: string
  introText: string
  sections: CategorySection[]
  faq: FaqItem[]
  relatedCategories: string[]
}

export interface CategorySection {
  title: string
  content: string
}
