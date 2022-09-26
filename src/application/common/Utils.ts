import React from "react";

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

const useWindowSize = () => {
  const isSSR = typeof window !== "undefined";
  const [windowSize, setWindowSize] = React.useState({
    width: isSSR ? 1200 : window.innerWidth,
    height: isSSR ? 800 : window.innerHeight,
  });

  function changeWindowSize() {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }

  React.useEffect(() => {
    window.addEventListener("resize", changeWindowSize);

    return () => {
      window.removeEventListener("resize", changeWindowSize);
    };
  }, []);

  return windowSize;
};

export { cpfOrCnpjMask, phoneMask, getFirstAndLastName, useWindowSize };
