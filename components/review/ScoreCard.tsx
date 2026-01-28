import { Star } from 'lucide-react'

interface ScoreCategory {
  label: string
  score: number
  maxScore?: number
}

interface ScoreCardProps {
  overallScore: number
  maxScore?: number
  label?: string
  categories?: ScoreCategory[]
  verdict?: string
}

export default function ScoreCard({
  overallScore,
  maxScore = 10,
  label = 'Celkové hodnocení',
  categories = [],
  verdict
}: ScoreCardProps) {
  const percentage = (overallScore / maxScore) * 100

  const getScoreColor = (score: number, max: number = 10) => {
    const pct = (score / max) * 100
    if (pct >= 80) return 'bg-green-500'
    if (pct >= 60) return 'bg-yellow-500'
    if (pct >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const getScoreText = (score: number, max: number = 10) => {
    const pct = (score / max) * 100
    if (pct >= 90) return 'Výborné'
    if (pct >= 80) return 'Velmi dobré'
    if (pct >= 70) return 'Dobré'
    if (pct >= 60) return 'Průměrné'
    return 'Podprůměrné'
  }

  return (
    <div className="score-card">
      <div className="score-card-header">
        <div className="flex items-end gap-3">
          <span className="score-card-rating">{overallScore.toFixed(1)}</span>
          <span className="text-2xl text-gray-400 mb-2">/ {maxScore}</span>
        </div>
        <p className="score-card-label">{label}</p>
        <div className="flex items-center gap-2 mt-3">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            percentage >= 80 ? 'bg-green-500' : percentage >= 60 ? 'bg-yellow-500' : 'bg-orange-500'
          }`}>
            {getScoreText(overallScore, maxScore)}
          </div>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i <= Math.round(overallScore / 2) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {categories.length > 0 && (
        <div className="score-card-body">
          {categories.map((category) => (
            <div key={category.label} className="score-card-row">
              <span className="score-card-row-label">{category.label}</span>
              <div className="score-bar">
                <div
                  className={`score-bar-fill ${getScoreColor(category.score, category.maxScore || maxScore)}`}
                  style={{ width: `${(category.score / (category.maxScore || maxScore)) * 100}%` }}
                />
              </div>
              <span className="score-card-row-value">{category.score}/{category.maxScore || maxScore}</span>
            </div>
          ))}
        </div>
      )}

      {verdict && (
        <div className="p-6 pt-0">
          <p className="text-sm text-gray-600 italic">&ldquo;{verdict}&rdquo;</p>
        </div>
      )}
    </div>
  )
}
