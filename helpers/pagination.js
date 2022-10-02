const minLimit = 1,
  defaultLimit = 100,
  maxLimit = 300;

exports.paginate = async ({
  model,
  page,
  limit,
  match = {},
  select = '',
  sort = {},
  populate = [],
}) => {
  page = processPage(page);
  limit = processLimit(limit);
  const totalDocs = await model.countDocuments(match);
  const totalPages = Math.ceil(totalDocs / limit);
  const skip = processSkip({ limit, page });
  const { nextPage, hasNextPage } = processNext({ page, totalPages });
  const { prevPage, hasPrevPage } = processPrevious({ page });

  let options = {
    allowDiskUse: true,
    lean: true,
    collation: { locale: 'fr' },
    sort,
    skip,
    limit,
    populate,
  };

  const data = await model.find(match, select, options);

  return {
    pagination_metadata: {
      totalDocs,
      totalPages,
      page,
      limit,
      hasNextPage,
      nextPage,
      hasPrevPage,
      prevPage,
      returnedDocsCount: data.length,
    },
    data,
  };
};

exports.aggregatePaginate = async ({
  model,
  page,
  limit,
  pipeline = [],
}) => {
  page = processPage(page);
  limit = processLimit(limit);
  const skip = processSkip({ page, limit });

  const matchIndex = pipeline.findIndex((p) => p['$match']);
  let sortIndex = pipeline.findIndex((p) => p['$sort']);
  console.log(sortIndex, 'sortIndex');
  console.log(pipeline, 'pipeline');

  //process sort, $sort must be not empty
  if (
    sortIndex > -1 &&
    Object.keys(pipeline[sortIndex]['$sort']).length === 0
  ) {
    pipeline.splice(sortIndex, 1);
    sortIndex = -1;
  }
  
  let skipIndex = pipeline.findIndex((p) => p['$skip']);
  let limitIndex = pipeline.findIndex((p) => p['$limit']);

  if (skipIndex < 0) {
    if (sortIndex > -1) skipIndex = sortIndex + 1;
    else if (matchIndex > -1) skipIndex = matchIndex + 1;

    pipeline.splice(skipIndex + 1, 0, { $skip: skip });
    limitIndex = skipIndex + 1;
    pipeline.splice(limitIndex, 0, { $limit: limit });
  }
  //console.log(matchIndex, 'matchIndex');
  //console.log(sortIndex, 'sortIndex');
  //console.log(limitIndex, 'limitIndex');
  //console.log(skipIndex, 'skipIndex');

  let options = {
    allowDiskUse: true,
    collation: { locale: 'fr' },
  };

  //console.log(pipeline, 'pipeline');
  let data = await model.aggregate(pipeline, options);
  // console.log(data, 'data');

  let result = {};
  if (sortIndex > -1 && matchIndex > sortIndex)
    result.message = `its advised to have $match stage before $sort`;
  result.pagination_metadata = {};
  //console.log(pipeline[matchIndex]['$match'], '$match');
  result.pagination_metadata.totalDocs = await model.countDocuments(
    pipeline[matchIndex]['$match'] || {},
  );
  //console.log(result.pagination_metadata.totalDocs, 'result.pagination_metadata.totalDocs');

  const totalPages = Math.ceil(result.pagination_metadata.totalDocs / limit);

  result.pagination_metadata.totalPages = totalPages;

  result.pagination_metadata.page = page;
  result.pagination_metadata.limit = limit;

  const { nextPage, hasNextPage } = processNext({ page, totalPages });
  result.pagination_metadata.hasNextPage = hasNextPage;
  result.pagination_metadata.nextPage = nextPage;

  const { prevPage, hasPrevPage } = processPrevious({ page });
  result.pagination_metadata.hasPrevPage = hasPrevPage;
  result.pagination_metadata.prevPage = prevPage;

  result.pagination_metadata.returnedDocsCount = data.length;

  result.data = data;

  return result;
};

let processLimit = (limit) => {
  limit = parseInt(limit) || defaultLimit;
  if (limit < minLimit) limit = minLimit;
  if (limit > maxLimit) limit = maxLimit;
  return limit;
};

let processPage = (page) => {
  page = parseInt(page) || 1;
  if (page < 1) page = 1;
  return page;
};

let processSkip = ({ page, limit }) => {
  let skip = 0;
  if (page > 1) skip = (page - 1) * limit;
  return skip;
};

let processNext = ({ page, totalPages }) => {
  let hasNextPage = false;
  let nextPage = null;
  if (page + 1 <= totalPages) {
    hasNextPage = true;
    nextPage = page + 1;
  }
  return { nextPage, hasNextPage };
};

let processPrevious = ({ page }) => {
  let hasPrevPage = false;
  let prevPage = null;
  if (page - 1 >= 1) {
    hasPrevPage = true;
    prevPage = page - 1;
  }
  return { hasPrevPage, prevPage };
};