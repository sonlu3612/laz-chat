export default function InputGroup(props) {
  const {
    title,
    placeholder,
    type,
    isRequired,
    errorMessage,
    value,
    onChange,
  } = props;

  return (
    <div className="px-4 pt-2 flex flex-col">
      <label className="">
        {title}
        {isRequired && <span className="text-red-500"> *</span>}
      </label>

      <input
        className="border border-gray-300 rounded-xl p-2"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      ></input>
      {errorMessage && <span className="text-red-500">{errorMessage}</span>}
    </div>
  );
}
