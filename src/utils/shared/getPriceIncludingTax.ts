export type GetPriceIncludingTax = (args: {
  Price: number;
  VatPercentage: number;
  quantity: number;
  fix?: boolean;
}) => [number, number];

const getPriceIncludingTax: GetPriceIncludingTax = ({
  Price,
  VatPercentage,
  quantity,
  fix,
}) => {
  const subTotal = Number(Price) * Number(quantity),
    tax = Math.round(subTotal * VatPercentage) / 100,
    price = Math.round((subTotal + tax) * 100) / 100;

  return fix ? [+tax.toFixed(2), +price.toFixed(2)] : [tax, price];
};

export default getPriceIncludingTax;
