import mongoose from 'mongoose'

export const batchUsers = async (keys, models) => {
  const ids = keys.map(id => mongoose.Types.ObjectId(id))
  const users = await models.User.find({
    '_id': {
      $in: ids
    }
  });
  return keys.map(key => users.find(user => user.id === mongoose.Types.ObjectId(key).toString()));
};
