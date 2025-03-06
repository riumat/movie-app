

export type ProviderData = {
  link: string,
  flatrate: ProviderItem[],
  rent: ProviderItem[],
  buy: ProviderItem[],
  ads: ProviderItem[],
  free: ProviderItem[],
  tvod: ProviderItem[],
}

export type ProviderItem = {
  logo_path: string,
  provider_name: string,
  provider_id: number,
  display_priority: number,
  category: string
}