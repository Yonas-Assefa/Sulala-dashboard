const routes = [
    {
        icon: '/icons/shopping_bag.svg',
        activeIcon: '/icons/shopping_bag_active.svg',
        name: 'Orders',
        path: '/dashboard/orders?filter=all'
    },
    {
        icon: '/icons/storefront.svg',
        activeIcon: '/icons/storefront_active.svg',
        name: 'My Products',
        path: '/dashboard/my-products?filter=all'
    },
    {
        icon: '/icons/medical_services.svg',
        activeIcon: '/icons/medical_services_active.svg',
        name: 'My Services',
        path: '/dashboard/my-services?filter=all'
    },
    {
        icon: '/icons/settings.svg',
        activeIcon: '/icons/settings_active.svg',
        name: 'Settings',
        path: '/dashboard/settings'
    },
    {
        icon: '/icons/whatshot.svg',
        activeIcon: '/icons/whatshot_active.svg',
        name: 'Promotion',
        path: '/dashboard/promotion?filter=all'
    }
]

export default routes