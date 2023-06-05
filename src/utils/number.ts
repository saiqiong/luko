const formatNumberString = (numberString: string) => {
  if (!numberString) {
    return numberString;
  }
  const splitedString = numberString.split(/[.,]/);
  if (splitedString.length === 1) {
    return `${Number(numberString)}`;
  }
  const afterDecimal = splitedString.pop();
  return `${Number(splitedString.join('') || '0')}.${afterDecimal}`;
};

export { formatNumberString };
