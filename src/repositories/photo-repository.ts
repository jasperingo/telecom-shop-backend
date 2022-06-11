import { Transaction } from 'sequelize';
import Photo from '../models/Photo';

const PhotoRepository = {

  async existsByName(name: string) {
    const photo = await Photo.findOne({ where: { name } });
    return photo !== null;
  },

  findById(id: number) {
    return Photo.findByPk(id);
  },

  create({ name, mimetype, size }: Photo) {
    return Photo.create({ name, mimetype, size });
  },

  update({ id, name, mimetype, size }: Photo) {
    return Photo.update({ name, mimetype, size }, { where: { id } });
  },

  updateBrand(id: number, brand_id: number, transaction?: Transaction) {
    return Photo.update({ brand_id }, { where: { id }, transaction });
  },

};

export default PhotoRepository;
