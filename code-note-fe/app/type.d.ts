type CodeItem = {
  key: string
  value: string
}
type Post = {
  _id: string
  title: string
  description: string
  code: CodeItem[]
  type: string
}
