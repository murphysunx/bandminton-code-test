export abstract class GenericRepository<E, C, Q> {
  abstract getAll(): Promise<E[]>;

  abstract getById(id: number): Promise<E>;

  abstract create(data: C): Promise<E>;

  abstract update(id: number, item: E): Promise<E>;

  abstract search(query: Q): Promise<E[]>;
}
