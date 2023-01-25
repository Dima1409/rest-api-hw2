const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const remove = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.status(200).json({
    status: "success",
    message: "Contact deleted",
    data: {
      result,
    },
  });
};

module.exports = remove;
