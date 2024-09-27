function Input({
  name,
  value,
  update,
  validation,
  type = 'text',
  label = name,
}) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={update}
      />
      {validation.isValid ? <span></span> : <span>{validation.message}</span>}
    </>
  );
}

export default Input;
