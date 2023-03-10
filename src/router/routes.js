import {useSearchStore} from "stores/search";

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
        component: () => import('pages/SearchPage.vue'),
        props: true,
        beforeEnter: (to, from) => {
          if(from.name === undefined){
            to.params.outside = true;
            //console.log('outside')
          }
        }
      },
      {
			path: 'media/:mediaType(movies|tv-series|show-tv-series)/:mediaId',
			name: 'media',
			component: () => import('pages/MediaPage.vue'),
			children: [
				{
					path: '',
					name: 'media-index',
					component: () => import('../views/MediaIndexView.vue')
				},
				{
					path: 'translation/:translationId',
					name: 'translation',
					component: () => import('../views/MediaTranslationView.vue')
				},
				{
					path: 'translation/:translationId/season/:seasonNum',
					name: 'season',
					component: () => import('../views/MediaSeasonView.vue')
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
