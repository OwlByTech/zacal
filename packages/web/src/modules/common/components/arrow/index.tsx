type Props = { onClick: any; direction?: boolean }

export default function Arrow({ onClick, direction }: Props) {
  return (
    <button
      className={`hover:bg-principal-400 border border-black h-10 bg-white p-1 ${
        direction && "rotate-180"
      }`}
      onClick={onClick}
    >
      <img className="w-5 h-5" src="/Vector.svg" alt="" />
    </button>
  )
}
