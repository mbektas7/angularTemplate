export interface  BaseService {
  getAll();
  findById(id: any);
  updateEntity(entity: any);
  deleteById(id: any);
  add(entity);
}
