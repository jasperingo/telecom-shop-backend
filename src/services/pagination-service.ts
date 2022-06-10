import { Request } from 'express';
import { Op } from 'sequelize';

const PaginationService = {
  LIMIT: 2,

  getParams(req: Request) {
    const limit = Number(req.query.limit);
    const afterId = Number(req.query.after);
    const beforeId = Number(req.query.before);

    return {
      afterId: isNaN(afterId) ? null : afterId,
      beforeId: isNaN(beforeId) ? null : beforeId,
      limit: isNaN(limit) ? PaginationService.LIMIT : limit,
    };
  },

  getCursor(req: Request, key = 'id') {
    const { limit, afterId, beforeId } = PaginationService.getParams(req);

      const cursor = [];

      if (afterId !== null) {
        cursor.push({ [key]: { [Op.gt]: afterId } });
      }

      if (beforeId !== null) {
        cursor.push({ [key]: { [Op.lt]: beforeId } });
      }

      return { cursor: { [Op.and]: cursor }, limit };
  },
};

export default PaginationService;
