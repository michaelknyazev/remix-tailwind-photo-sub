export type TButton = {
  onClick?: () => void,
  disabled?: boolean,
  children: React.ReactNode,
  loading?: boolean
}