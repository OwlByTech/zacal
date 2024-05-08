import { EllipseMiniSolid } from "@medusajs/icons"
import { Label, RadioGroup, Text, clx } from "@medusajs/ui"
import { ChangeEvent } from "react"

type FilterRadioGroupProps = {
  title?: string
  items: {
    value: string
    label: string
  }[]
  value: any
  handleChange: (...args: any[]) => void
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
}: FilterRadioGroupProps) => {
  console.log("sortby", value)
  return (
    <div className="flex py-4 gap-x-3 flex-col gap-y-4">
      {title && (
        <p className="txt-compact-small-plus text-ui-fg-muted">{title}</p>
      )}
      <RadioGroup>
        {items?.map((i) => (
          <div
            key={i.value}
            className={clx("flex gap-x-2 items-center border-b", {})}
          >
            {i.value === value && <EllipseMiniSolid />}
            <RadioGroup.Item
              onClick={(e) =>
                handleChange(
                  e as unknown as ChangeEvent<HTMLButtonElement>,
                  i.value
                )
              }
              className="hidden border-b"
              value={i.value}
            />
            <label
              placeholder={i.label}
              htmlFor={i.value}
              className={clx(
                "!txt-compact-small uppercase !transform-none text-ui-fg-subtle hover:cursor-pointer"
              )}
            >
              {i.label}
            </label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterRadioGroup
