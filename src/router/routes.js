
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('pages/IndexPage.vue')
      },
      {
        path: 'search/:searchQuery/:searchYear?',
        name: 'search',
        component: () => import('pages/SearchPage.vue')
      },
      {
			path: 'media/:mediaType(movies|tv-series|show-tv-series)/:mediaId',
			name: 'media',
			component: () => import('pages/MediaPage.vue'),
			children: [
				{
					path: '',
					name: 'media-index',
					component: () => import('components/MediaIndex.vue')
				},
				{
					path: 'translation/:translationId',
					name: 'translation',
					component: () => import('components/TranslationComponent.vue')				
				}
			]    
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
