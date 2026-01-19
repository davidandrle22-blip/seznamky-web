import { CategoryContent } from '@/lib/types'
import ReactMarkdown from 'react-markdown'

interface CategorySeoContentProps {
  content: CategoryContent
}

export default function CategorySeoContent({ content }: CategorySeoContentProps) {
  if (!content || !content.sections || content.sections.length === 0) return null

  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {content.introText && (
          <div className="prose prose-lg max-w-none mb-12 text-gray-700 leading-relaxed">
            <ReactMarkdown>{content.introText}</ReactMarkdown>
          </div>
        )}

        <div className="space-y-12">
          {content.sections.map((section, index) => (
            <div key={index} className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
              <div className="text-gray-700 leading-relaxed">
                <ReactMarkdown>{section.content}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
