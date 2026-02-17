export function serializePrisma<T>(data: T): T {
  if (data === undefined) return undefined as any;
  if (data === null) return null as any;

  return JSON.parse(
    JSON.stringify(data, (key, value) => {
      if (typeof value === "bigint") {
        return value.toString();
      }
      // Check for Prisma Decimal by checking constructor name or specific property
      if (value && typeof value === 'object' && (value.constructor.name === 'Decimal' || value.d)) {
        return Number(value);
      }
      return value;
    })
  );
}
