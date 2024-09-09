export type TBlock = { percent: number; isActive?: boolean };

type TValues = 'none' | 'percent' | 'kg' | 'sm';
type TPeriods = 'month' | 'day';
type TWeights = 'height' | 'weight' | 'product';
const values = {
  none: '',
  percent: '%',
  kg: 'кг',
  sm: 'см',
} satisfies Record<TValues, string>;

const weights = {
  height: 'Рост',
  weight: 'Вес',
  product: 'Продукты',
} satisfies Record<TWeights, string>;

const periods = {
  month: 'мес.',
  day: 'дн.',
} satisfies Record<TPeriods, string>;

type TField<T> = {
  type: T;
  amount: number | string;
};

export type TChange = {
  value: TField<TValues>;
  period: TField<TPeriods>;
};

export type TCurrent = {
  weight: TWeights;
} & TField<TValues>;

const parseNumber = (number: string): number => parseFloat(number.replace(/,/g, '.').replace(/−/, '-'));

export const useMappedData = ({ current, change }: { current: TCurrent; change: TChange }) => {
  const isPositive = (value: number) => value > 0;
  const isNegative = (value: number) => value < 0;

  const getValueType = (value: TValues) => values[value];
  const getPeriodType = (value: TPeriods) => periods[value];
  const getWeightType = (value: TWeights) => weights[value];
  const getValue = (value: number) => {
    if (isPositive(value)) {
      return `+${value}`;
    }
    if (isNegative(value)) {
      return `−${Math.abs(value)}`;
    }
    return value;
  };

  const getChangeAmount = (value: number) => {
    if (value <= 1) {
      return '';
    }
    return value;
  };
  const title = {
    weight: getWeightType(current.weight),
    amount: current.amount,
    type: getValueType(current.type),
  };
  const description = {
    value: getValue(parseNumber(String(change.value.amount))),
    type: getValueType(change.value.type),
    amount: getChangeAmount(parseNumber(String(change.period.amount))),
    period: getPeriodType(change.period.type),
  };
  const isPositiveChange = isPositive(parseNumber(String(change.value.amount)));
  const isNegativeChange = isNegative(parseNumber(String(change.value.amount)));
  const state = {
    isPositiveChange,
    isNegativeChange,
    changeValue: description.value,
  };
  const stringTitle = `${title.weight} ${title.amount} ${title.type}`;
  const stringDescription = `${description.type} за ${description.amount} ${description.period}`;
  return {
    title: stringTitle,
    description: stringDescription,
    state,
  };
};
export type TCard = {
  current: TCurrent;
  change: TChange;
  blocks: TBlock[];
  isRow?: boolean;
};
