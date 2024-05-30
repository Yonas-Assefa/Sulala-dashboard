const routes = [
    {
        icon: '/icons/shopping_bag.svg',
        activeIcon: '/icons/shopping_bag_active.svg',
        name: 'Orders',
        path: '/dashboard/orders?filter=all',
        protected: false
    },
    {
        icon: '/icons/storefront.svg',
        activeIcon: '/icons/storefront_active.svg',
        name: 'My Products',
        path: '/dashboard/my-products?filter=all',
        protected: false
    },
    {
        icon: '/icons/medical_services.svg',
        activeIcon: '/icons/medical_services_active.svg',
        name: 'My Services',
        path: '/dashboard/my-services?filter=all',
        protected: false
    },
    {
        icon: '/icons/settings.svg',
        activeIcon: '/icons/settings_active.svg',
        name: 'Settings',
        path: '/dashboard/settings',
        protected: false
    },
    {
        icon: '/icons/whatshot.svg',
        activeIcon: '/icons/whatshot_active.svg',
        name: 'Promotion',
        path: '/dashboard/promotion?filter=all',
        protected: false
    },
    {
        icon: '/icons/command.svg',
        activeIcon: '/icons/command_active.svg',
        name: 'Manage Shops',
        path: '/dashboard/manage?filter=pending',
        protected: true
    },
    // {
    //     icon: '/icons/truck.svg',
    //     activeIcon: '/icons/whatshot_active.svg',
    //     name: 'Drivers',
    //     path: '/dashboard/drivers?filter=all'
    // },
]

export default routes