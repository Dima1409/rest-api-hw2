const { Contact } = require("../../models");
const { NotFound } = require("http-errors");
const { isOwner } = require("../../middlewares");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const result = await Contact.findById(contactId);
  await isOwner(_id, result.owner);
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.status(200).json({
    status: "success",
    data: {
      result,
    },
  });
};

module.exports = getById;
