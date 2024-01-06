const { Types } = require("mongoose");

const toObjId = (id) => {
    return Types.ObjectId(id);
};

export default toObjId;