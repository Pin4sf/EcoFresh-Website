// Route configuration for navigation and breadcrumbs
export const routes = {
  '/': { label: 'Home', showBreadcrumbs: false },
  '/problem': { label: 'Problem', showBreadcrumbs: true },
  '/impact': { label: 'Impact', showBreadcrumbs: true },
  '/credibility': { label: 'Credibility', showBreadcrumbs: true },
  '/team': { label: 'Team', showBreadcrumbs: true },
  '/investors': { label: 'Investors', showBreadcrumbs: true },
}

export const getPageLabel = (pathname) => {
  return routes[pathname]?.label || 'Page'
}

export const shouldShowBreadcrumbs = (pathname) => {
  return routes[pathname]?.showBreadcrumbs ?? false
}
