export type SiteConfig = {
  name: string
  description: string
  url: string
  links: {
    twitter: string
    github: string
  }
}

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export interface CardModel {
  id: string
  uid: number
  slug: string
  pictureUrl: string
  scarcity: {
    name: string
  }
  season: number
  artistName: string
}
