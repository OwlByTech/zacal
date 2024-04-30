import { useEffect, useState } from "react"
import RangeSlider from "react-range-slider-input"
import "styles/slider.css"

type SortProductsProps = {
  setQueryParams: (name: string, value: string) => void
  minPrice?: number
  maxPrice?: number
}

const Slider = ({ setQueryParams, minPrice, maxPrice }: SortProductsProps) => {
  const [minPrice_, setMinPrice] = useState<number>(minPrice ? minPrice : 10000)
  const [maxPrice_, setMaxPrice] = useState<number>(
    maxPrice ? maxPrice : 3000000
  )
  useEffect(() => {
    setQueryParams("maxPrice", JSON.stringify(maxPrice_))
  }, [maxPrice_])
  useEffect(() => {
    setQueryParams("minPrice", JSON.stringify(minPrice_))
  }, [minPrice_])

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-row gap-4 justify-center">
        <span>{minPrice_ >= 0 && "$ " + minPrice_.toLocaleString()}</span>
        <span>-</span>
        <span>{maxPrice_ >= 0 && "$ " + maxPrice_.toLocaleString()}</span>
      </div>
      <RangeSlider
        step={10000}
        min={10000}
        max={3000000}
        value={[minPrice_, maxPrice_]}
        onInput={(data: number[]) => {
          if (data.length === 2) {
            setMinPrice(data[0])
            setMaxPrice(data[1])
          }
        }}
      />
    </div>
  )
}

export default Slider
