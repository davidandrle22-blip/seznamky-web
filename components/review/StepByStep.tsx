interface Step {
  title: string
  description: string
  duration?: string
}

interface StepByStepProps {
  title?: string
  steps: Step[]
}

export default function StepByStep({
  title = 'Jak začít',
  steps
}: StepByStepProps) {
  return (
    <div className="my-8">
      {title && <h3 className="text-xl font-bold text-gray-900 mb-6">{title}</h3>}
      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={index} className="step-item">
            <div className="step-number">{index + 1}</div>
            <div className="step-content">
              <h4 className="step-title">{step.title}</h4>
              <p className="step-description">{step.description}</p>
              {step.duration && (
                <span className="text-xs text-gray-400 mt-1 block">
                  ~ {step.duration}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
