/**
 * Pagination utility
 * Can be called with either:
 * - getPagination(query) where query is an object with page and limit
 * - getPagination(page, limit) where page and limit are numbers
 */
function getPagination(page, limit) {
  // Handle object argument (query object)
  if (typeof page === 'object' && page !== null) {
    const query = page;
    page = parseInt(query.page) || 1;
    limit = parseInt(query.limit) || 10;
  }

  // Ensure valid numbers
  page = Math.max(Number(page) || 1, 1);
  limit = Math.min(Math.max(Number(limit) || 10, 1), 50); // max limit 50 to reduce load

  // Calculate skip: for page = 1, skip = 0
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

module.exports = getPagination;
