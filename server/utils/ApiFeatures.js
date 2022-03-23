class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          title: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((data) => delete queryCopy[data]);

    // For adding $ sign to mongo operators if required
    let queryStr = JSON.stringify(queryCopy);
    queryStr.replace(/\b(gt | gte | lt | lte)\b/g, (data) => `$${data}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
}

export default ApiFeatures;
