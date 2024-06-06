const routes = [
    {
        icon: '/icons/shopping_bag.svg',
        activeIcon: '/icons/shopping_bag_active.svg',
        name: 'orders',
        path: '/dashboard/orders?filter=all',
        protected: false
    },
    {
        icon: '/icons/storefront.svg',
        activeIcon: '/icons/storefront_active.svg',
        name: 'my_products',
        path: '/dashboard/my-products?filter=all',
        protected: false
    },
    {
        icon: '/icons/medical_services.svg',
        activeIcon: '/icons/medical_services_active.svg',
        name: 'my_services',
        path: '/dashboard/my-services?filter=all',
        protected: false
    },
    {
        icon: '/icons/settings.svg',
        activeIcon: '/icons/settings_active.svg',
        name: 'settings',
        path: '/dashboard/settings',
        protected: false
    },
    {
        icon: '/icons/whatshot.svg',
        activeIcon: '/icons/whatshot_active.svg',
        name: 'promotion',
        path: '/dashboard/promotion?filter=all',
        protected: false
    },
    {
        icon: '/icons/truck.svg',
        activeIcon: '/icons/truck_active.svg',
        name: 'drivers',
        path: '/dashboard/drivers?filter=all'
    },
    {
        icon: '/icons/command.svg',
        activeIcon: '/icons/command_active.svg',
        name: 'manage_shops',
        path: '/dashboard/manage?filter=pending',
        protected: true
    },
]

export default routes