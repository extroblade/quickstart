export const prepareMap = <
  TArray extends Array<any>,
  TKey extends string = "data",
>(
  array: TArray,
  key: TKey = "data" as TKey,
): Array<{ id: number } & Record<TKey, TArray[number]>> =>
  array.map(
    (value, index) =>
      ({ id: index + 1, [key]: value }) as { id: number } & Record<
        TKey,
        TArray[number]
      >,
  );

export const makeMockArray = (length: number, fill = 1) =>
  prepareMap(Array.from({ length }).fill(fill));
