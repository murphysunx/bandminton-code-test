export abstract class GenericRepository<E, Q> {
  abstract getAll(): Promise<E[]>;

  abstract getById(id: number): Promise<E>;

  abstract create(...args: unknown[]): Promise<E>;

  abstract update(id: number, item: E): Promise<E>;

  abstract search(query: Q): Promise<E[]>;
}
