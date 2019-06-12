export function ids<T extends string, U extends string>(
  prefix: U,
  idValues: T[]
): Record<T, string> & { id: U };

export function ids<T extends { [key: string]: string }, U extends string>(
  prefix: U,
  idValues: T
): T & { id: U };

export function ids(prefix: any, idValues: any): any {
  if (Array.isArray(idValues)) {
    const vals = idValues as string[];
    const x: any = vals.reduce((accum, curr) => ({ ...accum, [curr]: prefix + "-" + curr }), {});
    x["id"] = prefix;
    return x;
  }

  if (typeof idValues == "object") {
    const x: any = Object.keys(idValues).reduce(
      (accum, curr) => ({ ...accum, [curr]: prefix + "-" + idValues[curr] }),
      {}
    );
    x["id"] = prefix;
    return x;
  }

  throw new Error("invalid passed type");
}
