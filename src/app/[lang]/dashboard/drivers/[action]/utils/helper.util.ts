import { redirect } from "@/i18n/navigation"
import { notFound } from "next/navigation"

enum ItemType {
    product = 'product',
    service = 'service'
}

enum ActionType {
    add = 'add',
    edit = 'edit'
}

enum TabType {
    discountsAds = 'discounts-ads',
    bannerAds = 'banner-ads'
}


export const getItemType = (itemType: unknown) => {
    if (!itemType) {
        return notFound()
    }
    if (itemType === ItemType.product || itemType === ItemType.service) {
        return itemType
    }
    return notFound()
}

export const getAction = (action: unknown) => {
    if (!action) {
        return notFound()
    }
    if (action === ActionType.edit || action === ActionType.add) {
        return action
    }
    return notFound()
}

export const getTab = (tab: unknown, type: any) => {
    if (tab && tab === TabType.discountsAds || tab === TabType.bannerAds) {
        return tab
    }
    return redirect('/dashboard/promotion/add?tab=discounts-ads&type=' + type)
}