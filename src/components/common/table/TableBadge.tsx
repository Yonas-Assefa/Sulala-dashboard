import React from 'react'

type Schema = { key: string; title: string; type: string; badge?: boolean | undefined; schema_colors?: Record<string, string> | undefined; image?: boolean | undefined; image_key?: string | undefined; }

type Prop = {
    product_key: string,
    schema: Schema
}

function TableBadge({ product_key, schema }: Prop) {
    console.log({ product_key, schema })
    return (
        <details className="dropdown">
            <summary className={`flex relative gap-1 flex-row items-center p-2 cursor-pointer rounded-[30px] px-3 ${schema.schema_colors?.[product_key as keyof typeof schema.schema_colors]}`}>
                <p className='capitalize'>{product_key}</p>
                <img src="/icons/chevron-down.svg" className='w-[20px] aspect-auto' alt="" />

            </summary>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 mt-3 shadow bg-white border rounded-box w-52">
                <div className='flex flex-col gap-3 p-2'>
                    {
                        Object.keys(schema.schema_colors || {}).map((color) => {
                            return (
                                <div className='flex flex-row gap-2 items-center cursor-pointer'>
                                    {product_key === color && <input type="checkbox" defaultChecked className="checkbox checkbox-xs checkbox-success" />}
                                    <p>{color}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </ul>
        </details>
    )
}

export default TableBadge