type RadioInputOptions_ = {
    id: string
    label: string
    value: string
}

type RadioInput_ = Omit<RadioInputOptions, 'value'> & {
    options: RadioInputOptions[]
}

const radioInputs_: RadioInput_ = {
    id: 'daily_budgeting',
    label: 'Daily budgeting',
    options: [
        {
            id: 'daily_budgeting_1',
            label: 'Daily budgeting',
            value: 'daily_budgeting',
        },
        {
            id: 'weekly_budgeting_2',
            label: 'Weekly budgeting',
            value: 'weekly_budgeting',
        }
    ],
}