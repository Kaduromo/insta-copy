const initialUsers = [
  {
    _id: 1,
    username: "Иван",
    job: "Врач",
    img: "https://i.pravatar.cc/150?img=8",
  },
  {
    _id: 2,
    username: "Мария",
    job: "Учитель",
    img: "https://i.pravatar.cc/150?img=2",
  },
  {
    _id: 3,
    username: "Анна",
    job: "Юрист",
    img: "https://i.pravatar.cc/150?img=3",
  },
  {
    _id: 4,
    username: "Дмитрий",
    job: "Инженер",
    img: "https://i.pravatar.cc/150?img=4",
  },
  {
    _id: 5,
    username: "Екатерина",
    job: "Бухгалтер",
    img: "https://i.pravatar.cc/150?img=5",
  },
]

const Suggestions = () => {
  const suggestions = initialUsers
  return (
    <div className="mt-3">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-3 text-sm">
        <h3 className="font-bold text-gray-400">Рекомендации для вас</h3>
        <button className="text-gray-600 font-semibold text-left mt-2 xl:mt-0">
          Все
        </button>
      </div>
      {suggestions &&
        suggestions.map((suggestion) => (
          <div
            key={suggestion._id}
            className="flex flex-col xl:flex-row xl:items-center justify-between mt-2"
          >
            <div className="inline-flex items-center">
              <img
                className="w-10 h-10 rounded-full border p-[2px]"
                src={suggestion.img}
                alt={suggestion.username}
              />
              <div className="flex-1 ml-3">
                <h2 className="font-semibold text-sm">{suggestion.username}</h2>
                <h3 className="font-sm text-gray-400 truncate w-[230px]">
                  {suggestion.job}
                </h3>
              </div>
            </div>
            <button className="font-semibold text-blue-400 text-sm text-left">
              Подписаться
            </button>
          </div>
        ))}
    </div>
  )
}

export default Suggestions
