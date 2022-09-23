/* Utils file */

const cpfOrCnpjMask = (value: string) => {
  value = value?.replace(/\D/g, "");

  if (value.length <= 11) {
    return value
      ?.replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  }

  if (value.length > 11) {
    return value
      ?.replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }

  return value;
};

const phoneMask = (value: string | number) => {
  const stringValue = value.toString();
  return stringValue
    ?.replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{4})/, "$1-$2");
};

const getFirstAndLastName = (name: string) => {
  const names = name?.split(" ");

  return names?.length > 1 ? `${names[0]} ${names[names.length - 1]}` : name;
};

export { cpfOrCnpjMask, phoneMask, getFirstAndLastName };
