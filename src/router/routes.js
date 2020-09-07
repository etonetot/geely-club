
import config from 'src/config.js'

const routes = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {
                path: '', 
                component: () => import('pages/Catalog.vue'),
                meta: { 
                    breadcrumb: 'Модели ' + config.strVendor
                },
            },
            { 
                path: '/404', 
                component: () => import('pages/Error404.vue'), 
                name: "404", 
            },
            {
                path: "/news/:page?",
                component: () => import('pages/AllNews.vue'),
                meta: { breadcrumb: { title: 'Новости', parent: '/' } },
                name: "news",
            },
            {
                path: "/newsitem/:id",
                component: () => import('pages/NewsItem.vue'),
                name: "newsitem",
            },

            {
                path: "/:car",
                component: () => import('pages/Car.vue'),
                children: [
                    {
                        path: "",
                        component: () => import('pages/CarProps'),
                        name: "car",
                    },
                    {
                        path: "props/:year?",
                        component: () => import('pages/CarProps'),
                        name: "props",
                    },
                    {
                        path: "doc",
                        component: () => import('pages/CarDocs'),
                        name: "car-doc"
                    },
                    {
                        path: "news/:page?",
                        component: () => import('pages/CarNews'),
                        name: "car-newslist"
                    },
                    {
                        path: "newsitem/:id",
                        component: () => import('pages/CarNewsItem'),
                        name: "car-newsitem"
                    },
                    {
                        path: "sales",
                        component: () => import('pages/CarSales'),
                        name: "car-sales",
                    },
                    {
                        path: "rusales",
                        component: () => import('pages/CarSales'),
                        name: "car-rusales",
                    },
                    {
                        path: "crash",
                        component: () => import('pages/CarCrash'),
                        name: "car-crash",
                    },
                    {
                        path: "video",
                        component: () => import('pages/CarVideo'),
                        name: "car-video"
                    },
                    {
                        path: "doc/:id",
                        component: () => import('pages/CarDocItem'),
                        name: "car-doc-docid"
                    },
                    {
                        path: "photo/:folder?",
                        component: () => import('pages/CarPhoto'),
                        name: "car-photo-folder",
                    }
                ]
            },
            { path: '*', component: () => import('pages/Error404.vue') }    

        ]
    }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
    routes.push({
        path: '*',
        component: () => import('pages/Error404.vue')
    })
}

export default routes
