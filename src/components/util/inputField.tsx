interface propsInterface {
  label: string
  value: string
  onChange: (e: any) => void
}
export const InputField = ({
  label,
  value,
  onChange,
}: propsInterface) => {
  return (
    <div className="relative ">
      <input
        onChange={onChange}
        type="text"
        defaultValue={value || ""}
        id="floating_outlined"
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
      />
      <label
        htmlFor="floating_outlined"
        className="absolute text-xs text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        {label}
      </label>
    </div>
  )
}
