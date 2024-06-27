const routes = [
  // {
  //   icon: "/icons/bar_chart.svg",
  //   activeIcon: "/icons/bar_chart_active.svg",
  //   name: "statistics",
  //   path: "/dashboard/statistics",
  //   protected: false,
  // },
  {
    icon: "/icons/shopping_bag.svg",
    activeIcon: "/icons/shopping_bag_active.svg",
    name: "orders",
    path: "/dashboard/orders?filter=all",
    protected: false,
  },
  {
    icon: "/icons/storefront.svg",
    activeIcon: "/icons/storefront_active.svg",
    name: "my_products",
    path: "/dashboard/my-products?filter=all",
    protected: false,
  },
  {
    icon: "/icons/medical_services.svg",
    activeIcon: "/icons/medical_services_active.svg",
    name: "my_services",
    path: "/dashboard/my-services?filter=all",
    protected: false,
  },
  {
    icon: "/icons/settings.svg",
    activeIcon: "/icons/settings_active.svg",
    name: "settings",
    path: "/dashboard/settings",
    protected: false,
  },
  {
    icon: "/icons/whatshot.svg",
    activeIcon: "/icons/whatshot_active.svg",
    name: "promotion",
    path: "/dashboard/promotion?filter=all",
    protected: false,
  },
  {
    icon: "/icons/truck.svg",
    activeIcon: "/icons/truck_active.svg",
    name: "drivers",
    path: "/dashboard/drivers?filter=all",
  },
  {
    icon: "/icons/command.svg",
    activeIcon: "/icons/command_active.svg",
    name: "manage_shops",
    path: "/dashboard/shops?filter=pending",
    protected: true,
  },
  {
    icon: "/icons/customer_support.svg",
    activeIcon: "/icons/customer_support_active.svg",
    name: "customer_support",
    path: "/dashboard/customer-support?filter=pending",
    protected: true,
  },
  {
    icon: "/icons/question.svg",
    activeIcon: "/icons/question_active.svg",
    name: "faq",
    path: "/dashboard/faq",
    protected: true,
  },
];

export default routes;
