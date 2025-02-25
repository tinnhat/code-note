export const generateDefaultComponent = (componentName: string) => {
  return `import React from 'react'
export default function ${componentName}() {
  return (
    <div>
      <h1>${componentName}</h1>
    </div>
  )
}`
}
