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

};

export default PhotoRepository;
