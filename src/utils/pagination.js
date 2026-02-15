// Ye helper function pagination logic handle karega
function getPagination(query) {

  // query se hme page or limit pta chlegi
  const page = Math.max(parseInt(query.page) || 1, 1);
  const limit = Math.min(parseInt(query.limit) || 10, 50);//max limit 50 to reduce load

  // kitna skip krna hai : for page = 1, skip = 0
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

module.exports = getPagination;
