type HeaderKey = 'prev' | 'last' | 'next'

const createPattern = (key: HeaderKey) => new RegExp(`(?<=<)([\\S]*)(?=>; rel="${key}")`, 'igm')
const getHeaderMatch = (header: string, key: HeaderKey): string | undefined => {
  const pattern = createPattern(key)
  return header.match(pattern)?.[0]
}

export const getPageCount = (url = '') =>  url ? Number(new URL(url).searchParams.get('page')) : null

export const parseLinkHeader = (header = ''): Record<HeaderKey, string | undefined> => {
  const next = getHeaderMatch(header, 'next')
  const last = getHeaderMatch(header, 'last')
  const prev = getHeaderMatch(header, 'prev')
  return {
    prev,
    last,
    next,
  }
}