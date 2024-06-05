export const DISCOUNT_TYPE_CHOICES = [
    { id: 'PERCENTAGE_OFF', label: 'Percentage Off', value: 'PERCENTAGE_OFF' },
    { id: 'ONE_PLUS_ONE', label: 'One Plus One', value: 'ONE_PLUS_ONE' },
    { id: 'LIMITED_PRICE', label: 'Limited Price', value: 'LIMITED_PRICE' },
    { id: 'PERCENTAGE_OFF_THE_MINIMUM_CART_SIZE', label: 'Percentage off the minimum cart size', value: 'PERCENTAGE_OFF_THE_MINIMUM_CART_SIZE' },
    { id: 'FREE_SHIPPING', label: 'Free Shipping', value: 'FREE_SHIPPING' },
    { id: 'NONE', label: 'None', value: 'NONE' },
]

export const BUDGETING_TYPE_CHOICES = [
    { id: 'DAILY', label: 'Daily', value: 'DAILY' },
    { id: 'WEEKLY', label: 'Weekly', value: 'WEEKLY' },
]

export const DESTINATION_TYPE_CHOICES = [
    { id: 'LIST_OF_PRODUCTS', label: 'List of products', value: 'LIST_OF_PRODUCTS' },
    { id: 'SHOP', label: 'Shop', value: 'SHOP' },
]

export const PROMOTION_TYPE_CHOICES = [
    { id: 'BANNER', label: 'Banner', value: 'BANNER' },
    { id: 'DISCOUNT', label: 'Discount', value: 'DISCOUNT' },
]

export const DISCOUNT_ENUM = DISCOUNT_TYPE_CHOICES.map(ele => ele.value)
export const BUDGETING_ENUM = BUDGETING_TYPE_CHOICES.map(ele => ele.value)
export const DESTINATION_ENUM = DESTINATION_TYPE_CHOICES.map(ele => ele.value)
export const PROMOTION_ENUM = PROMOTION_TYPE_CHOICES.map(ele => ele.value)
