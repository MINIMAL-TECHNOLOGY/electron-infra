const INTL_0_DIGITS_FORMATER = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

const INTL_2_DIGITS_FORMATER = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

// -----------------------------------------------------------------------------------
export const getUID = () => Math.random().toString(36).slice(2).toUpperCase();

// -----------------------------------------------------------------------------------
export const isInt = (n: any) => {
  if (Number.isNaN(n)) {
    return false;
  }

  return Math.floor(Number(n)) === n || Number(n) % 1 === 0;
};

// -----------------------------------------------------------------------------------
export const isFloat = (n: any) => {
  if (Number.isNaN(n)) {
    return false;
  }

  return Number(n) === n || Number(n) % 1 !== 0;
};

// -----------------------------------------------------------------------------------
export const int = (pString: number | string | null | undefined): number => {
  if (!pString || Number.isNaN(pString)) {
    return 0;
  }

  const normalized = pString?.toString()?.replace(/,/g, '');
  return Number.parseInt(normalized, 10);
};

// -----------------------------------------------------------------------------------
export const float = (pString: number | string | null | undefined, digit = 2): number => {
  if (!pString || Number.isNaN(pString)) {
    return 0;
  }

  const normalized = pString?.toString()?.replace(/,/g, '');
  return Number(Number.parseFloat(normalized).toFixed(digit));
};

// -----------------------------------------------------------------------------------
export const toStringDecimal = (pString: number | string, digit = 2, options = { localeFormat: true }): string => {
  const { localeFormat } = options;
  if (Number.isNaN(pString)) {
    return '0';
  }

  let number = 0;
  if (isInt(pString)) {
    number = int(pString);
  } else {
    number = float(pString, digit);
  }

  if (localeFormat) {
    let formater: Intl.NumberFormat;
    if (Number.isInteger(number)) {
      formater = INTL_0_DIGITS_FORMATER;
    } else if (digit === 2) {
      formater = INTL_2_DIGITS_FORMATER;
    } else {
      formater = new Intl.NumberFormat('en-US', { maximumFractionDigits: digit, minimumFractionDigits: digit });
    }

    return formater?.format(number);
  }

  return number.toFixed(Number.isInteger(number) ? 0 : digit);
};
