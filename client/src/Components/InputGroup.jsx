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
        {isRequired && <span className="text-light-error"> *</span>}
      </label>

      <input
        className="outline-2 outline-light-secondary focus:outline-4 focus:outline-light-primary rounded-xl p-2"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      ></input>
      {errorMessage && <span className="text-light-error">{errorMessage}</span>}
    </div>
  );
}
