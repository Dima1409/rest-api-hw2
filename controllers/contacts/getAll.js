const { Contact } = require("../../models");

const getAllContacts = async (userId, query) => {
  const { page = 1, limit = 20, favorite = false, name = "" } = query;
  const skip = (page - 1) * limit;
  const pagination = {
    skip,
    limit: Number(limit),
  };
  const filter = { owner: userId, favorite: favorite, name: { $regex: name } };
  const ownerInfo = "_id email";
  return Contact.find(filter, "", pagination)
    .populate("owner", ownerInfo)
    .sort({ name: 1 });
};

const getAll = async (req, res) => {
  const { _id } = req.user;
  const result = await getAllContacts(_id, req.query);
  res.status(200).json({
    status: "success",
    data: {
      result,
    },
  });
};

module.exports = getAll;
