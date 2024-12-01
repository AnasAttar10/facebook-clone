import { Query, QueryOptions } from "mongoose";
import { PostQuery } from "../types";
type TPaginationResult = {
  next?: number;
  prev?: number;
  currentPage?: number;
  numOfPages?: number;
  limit?: number;
};
class ApiFeature<T> {
  mongooseQuery: Query<T[], T>;
  queryString: PostQuery;
  countOfDocuments: number;
  keysofQueryString: string[];
  paginationResult: TPaginationResult;

  constructor(mongooseQuery: Query<T[], T>, queryString: PostQuery) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
    this.keysofQueryString = Object.keys(queryString);
    this.countOfDocuments = 0;
    this.paginationResult = {};
  }
  filter() {
    const excludesFields = ["page", "limit", "keyword", "sort", "fields"];
    const copyOfQueryString: { [key: string]: any } = { ...this.queryString };

    excludesFields.forEach((field) => {
      delete copyOfQueryString[field];
    });
    this.mongooseQuery = this.mongooseQuery.find(copyOfQueryString);
    return this;
  }
  limitFields() {
    if (this.keysofQueryString.includes("fields")) {
      this.queryString.fields = this.queryString.fields?.split(",").join(" ");
      this.mongooseQuery.select(this.queryString.fields as string);
    }
    return this;
  }
  sort() {
    if (this.keysofQueryString.includes("sort")) {
      this.queryString.sort = this.queryString.sort?.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(this.queryString.sort);
    }
    return this;
  }
  search(field: string) {
    if (this.keysofQueryString.includes("keyword")) {
      let query: QueryOptions = {};
      query.$or = [
        { [field]: { $regex: this.queryString.keyword, $options: "i" } },
      ];
      this.mongooseQuery = this.mongooseQuery.find(query);
    }
    return this;
  }
  paginate(countDocuments: number) {
    if (
      this.keysofQueryString.includes("page") ||
      this.keysofQueryString.includes("limit")
    ) {
      const page = this.queryString.page || 1;
      const limit = this.queryString.limit || 10;
      const skip = (page - 1) * limit;
      const endIndex = page * limit;
      // pagination result
      this.paginationResult.currentPage = +page;
      this.paginationResult.limit = +limit;
      this.paginationResult.numOfPages = Math.ceil(countDocuments / limit);
      if (endIndex < countDocuments) {
        this.paginationResult.next = +page + 1;
      }
      if (skip > 0) {
        this.paginationResult.prev = +page - 1;
      }
      this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    }
    return this;
  }
}
export default ApiFeature;
