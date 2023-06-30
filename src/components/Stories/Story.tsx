import { PlusIcon } from "@heroicons/react/24/solid"

const Story = ({
  name,
  img,
  isUser,
}: {
  name: string
  img: string
  isUser?: boolean
}) => {
  return (
    <li className="relative group cursor-pointer">
      <img
        className="h-14 object-cover rounded-full p-[1.5px] border-2 border-red-500 cursor-pointer transition-transform duration-200 ease-out group-hover:scale-110"
        src={img}
        alt={name}
      />
      {isUser && <PlusIcon className="h-6 absolute top-4 left-4 text-white" />}
      <p className="text-sm w-14 truncate">{name}</p>
    </li>
  )
}

export default Story
