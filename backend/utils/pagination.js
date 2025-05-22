export function pagination(query, queryString) {
  const page = parseInt(queryString.page, 10) || 1;
  const limit = parseInt(queryString.limit, 10) || 10;
  const skip = (page - 1) * limit;
  return query.skip(skip).limit(limit);
}
