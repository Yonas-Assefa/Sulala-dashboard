import React from 'react'

type Item = {
    label: string
    value: string
    image?: string
}

type Props = {
    items?: Item[]
    label: string,
    last_items?: boolean
}

function TableDropDown({ items, label, last_items }: Props) {
    return (
        <div className={`dropdown dropdown-end ${!last_items ? 'dropdown-bottom' : 'dropdown-top'}`}>
            <div
                tabIndex={0}
                role="button"
                className="bg-white flex flex-row"
            >
                <p>{items?.length} {label}</p>
                <img
                    src="/icons/chevron-down.svg"
                    className="w-[20px] aspect-auto"
                    alt=""
                />
            </div>
            <div
                tabIndex={0}
                className="dropdown-content border rounded-xl z-[1] menu p-4 gap-4 shadow bg-white w-72 text-ellipsis overflow-hidden"
            >
                <p className="text-black font-semibold">{label}</p>
                <div className="flex flex-col gap-4 w-64">
                    {
                        Array.isArray(items) && items?.map((item) => (
                            <div className="flex flex-row items-center gap-3">
                                <img src={item.image} alt="" />
                                <p className="truncate">
                                    {item.label}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default TableDropDown