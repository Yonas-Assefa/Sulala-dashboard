'use client'
import { useCreateQueryString } from '@/hooks/useCreateQueryString'
import { useTranslations } from 'next-intl'
import React from 'react'

function TablePagination() {
    const { createQueryStringAndPush, searchParams } = useCreateQueryString()
    const page = searchParams.get('page') || 1

    const t = useTranslations('Commons')

    const handleNextClick = () => {
        createQueryStringAndPush('page', (+page + 1) + '')
    }

    const handlePreviousClick = () => {
        createQueryStringAndPush('page', (+page - 1) + '')
    }

    return (
        <div className="flex flex-col items-center opacity-30 hover:opacity-100">
            <span className="text-sm text-gray-700 dark:text-gray-400">
                {/* Showing <span className="font-semibold text-gray-900 ">1</span> to <span className="font-semibold text-gray-900 ">10</span> of <span className="font-semibold text-gray-900 ">100</span> Entries */}
            </span>
            <div className="select-none inline-flex mt-2 xs:mt-0 gap-4 items-center">
                <button
                    onClick={handlePreviousClick}
                    disabled={page == 1}
                    className="flex items-center justify-center px-3 h-8 text-sm font-medium text-primary bg-tertiary rounded-e rounded-full hover:bg-primary hover:text-white active:scale-105 transition-all disabled:text-secondary disabled:bg-tertiary disabled:cursor-not-allowed">
                    <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                    </svg>
                    {t('previous')}
                </button>
                <span className="text-sm text-gray-700 dark:text-gray-400">
                    <span className="font-semibold text-primary ">{page}</span>
                </span>
                <button
                    onClick={handleNextClick}
                    className="flex items-center justify-center px-3 h-8 text-sm font-medium text-primary bg-tertiary rounded-s rounded-full hover:bg-primary hover:text-white active:scale-105 transition-all disabled:text-secondary disabled:bg-tertiary disabled:cursor-not-allowed">
                    {t('next')}
                    <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default TablePagination