import { Quote, User, Star, Heart } from 'lucide-react'
import { Testimonial } from '@/lib/types'

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-romantic-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-romantic-100 px-4 py-2 rounded-full mb-4">
            <Heart className="w-4 h-4 text-romantic-500" fill="#e11d48" />
            <span className="text-sm font-medium text-romantic-700">Příběhy úspěchu</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Co říkají ti, kteří našli lásku
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stovky párů se díky našim doporučením seznámily a žijí šťastné vztahy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-white rounded-2xl p-6 lg:p-8 shadow-card relative border border-gray-100 ${index === 1 ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-romantic-100" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed text-lg italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div className="flex items-center border-t border-gray-100 pt-4">
                <div className="w-14 h-14 bg-gradient-to-br from-romantic-400 to-romantic-600 rounded-full flex items-center justify-center shadow-romantic">
                  <User className="w-7 h-7 text-white" />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.age} let</p>
                </div>
                <Heart className="w-5 h-5 text-romantic-500 ml-auto" fill="#e11d48" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
