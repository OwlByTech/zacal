type Props = { onClick: any; direction?: boolean }

export default function Arrow({ onClick, direction }: Props) {
  return (
    <button
      className={` border border-black h-16 bg-white p-1 ${
        direction && "rotate-180"
      }`}
      onClick={onClick}
    >
      <img className="" src="/Vector.svg" alt="" />
    </button>
  )
}
