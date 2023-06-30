import {
  ChevronLeft,
  Command,
  Edit,
  Link,
  Loader2,
  Menu,
  Plus,
  Trash2,
  User,
  X,
  type Icon as LucideIcon
} from 'lucide-react'

export type Icon = LucideIcon

export const Icons = {
  link: Link,
  spinner: Loader2,
  logo: Command,
  close: X,
  user: User,
  menu: Menu,
  plus: Plus,
  edit: Edit,
  delete: Trash2,
  left: ChevronLeft
}
