export const getFilterSortOrdering = (formData?: FormData) => {
    const search = formData?.get('search') || ''
    const filter = (formData?.get('filter') || '').toString()?.toUpperCase()
    const status = filter == 'ALL' ? '' : filter

    const sort_by = formData?.get('sort_by') || ''
    const sort = formData?.get('sort') || ''

    let ordering = ''
    if (sort_by && sort_by == 'oldest') ordering += '-'
    if (sort) ordering += sort

    const page = formData?.get('page') || 1

    return { search, status, ordering, page }
}