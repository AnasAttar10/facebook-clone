import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import ApiError from "../utils/ApiError";
import ApiFeature from "../utils/ApiFeatures";
import { Query } from "mongoose";

// export interface CustomRequest<T = any> extends Request {
//   customParams?: T;
// }

type TDeleteResult = {
  deletedCount: number;
  acknowledged: boolean;
};

type TUpdateResult = {
  matchedCount: number;
  modifiedCount: number;
  acknowledged: boolean;
};

export const getAll = <T>(
  Model: {
    find: (query?: {}) => Query<T[], T>;
    countDocuments: (query?: {}) => Query<number, T>;
  },
  searchField: string = "text"
) =>
  expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      let filterObject = {};
      // if recive param from other route
      if (req?.params) filterObject = req?.params;
      const query = Model.find(filterObject);
      const counetOfDocuments = await Model.countDocuments();

      // Apply features using ApiFeature
      const apiFeature = new ApiFeature(query, req.query)
        .limitFields()
        .sort()
        .search(searchField)
        .filter()
        .paginate(counetOfDocuments);

      // Execute the query
      const { mongooseQuery, paginationResult } = apiFeature;
      const documents = await mongooseQuery;
      res.status(200).json({
        results: documents.length,
        data: documents,
        paginationResult,
      });
    }
  );

export const getOne = <T>(Model: {
  findOne: (query: { _id: string }) => Promise<T | null>;
}) =>
  expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const document = await Model.findOne({ _id: id });
      if (!document)
        return next(new ApiError(`no document to this id ${id}`, 400));
      res.status(200).json({ data: document });
    }
  );

export const createOne = <T>(Model: {
  create: (newDocument: Partial<T>) => Promise<T | null>;
}) =>
  expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const newDocument = await Model.create(req.body);

      if (!newDocument) {
        return next(new Error(`Error creating document`));
      }
      res.status(200).json({ data: newDocument });
    }
  );

export const updateOne = <T>(
  Model: {
    findByIdAndUpdate: (
      id: string,
      update: { $push?: Partial<T>; $pull?: Partial<T>; $set?: Partial<T> },
      options?: { new: boolean }
    ) => Promise<T | null>;
  },
  type: string,
  modifiedField?: string
) =>
  expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const body = req.body;
      let updatedDocument;
      if (type === "pull") {
        updatedDocument = await Model.findByIdAndUpdate(
          id,
          {
            $pull: modifiedField
              ? ({ [modifiedField]: body[modifiedField] } as Partial<T>)
              : (body as Partial<T>),
          },
          { new: true }
        );
      } else if (type === "push") {
        updatedDocument = await Model.findByIdAndUpdate(
          id,
          {
            $push: modifiedField
              ? ({ [modifiedField]: body[modifiedField] } as Partial<T>)
              : (body as Partial<T>),
          },
          { new: true }
        );
      } else if (type === "set") {
        updatedDocument = await Model.findByIdAndUpdate(
          id,
          { $set: body as Partial<T> },
          { new: true }
        );
      }
      if (!updatedDocument) {
        return next(new ApiError(`no document updated to this id ${id}`, 400));
      }
      res.status(200).json({ data: updatedDocument });
    }
  );

export const deleteOne = <T>(Model: {
  findByIdAndDelete: (query: { _id: string }) => Promise<T | null>;
}) =>
  expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const removedDocument = await Model.findByIdAndDelete({ _id: id });
      if (!removedDocument) {
        return next(new ApiError(`no document removed to this id ${id}`, 404));
      }
      res.status(200).json(removedDocument);
    }
  );

export const updateMany = <T>(
  Model: {
    updateMany: (
      query: { _id: string },
      update: { $set?: Partial<T>; $pull?: Partial<T>; $push?: Partial<T> }
    ) => Promise<TUpdateResult | null>;
  },
  hasCustomParams: boolean,
  type: "push" | "pull" | "set",
  targetFieldInParam: string,
  modifiedField: string
) =>
  expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // let modelId;
      // let targetId;
      // if (hasCustomParams) {
      //   modelId = req.customParams[targetFieldInParam];
      //   targetId = req.customParams._id;
      // } else {
      //   modelId = req.params.id;
      //   targetId = req.customParams._id;
      // }

      //   const body = req.body;
      //   let result;
      //   if (type === "pull") {
      //     result = await Model.updateMany(
      //       { _id: modelId },
      //       { $pull: { [modifiedField]: targetId } as Partial<T> }
      //     );
      //   } else if (type === "push") {
      //     result = await Model.updateMany(
      //       { _id: modelId },
      //       { $push: { [modifiedField]: targetId } as Partial<T> }
      //     );
      //   } else if (type === "set") {
      //     result = await Model.updateMany(
      //       { _id: modelId },
      //       { $set: { [modifiedField]: body } as Partial<T> }
      //     );
      //   }
      //   if (!result || result.matchedCount === 0) {
      //     return next(new ApiError(`no documents to this id ${modelId}`, 400));
      //   }
      //   res.status(200).json({ data: result.modifiedCount });
      // }
      try {
        // Determine modelId and targetId
        const modelId = hasCustomParams
          ? req.customParams?.[targetFieldInParam]
          : req.params?.id;
        const targetId = req.customParams?._id;

        if (!modelId) {
          return next(new ApiError("Invalid or missing modelId.", 400));
        }
        if (!targetId) {
          return next(new ApiError("Invalid or missing targetId.", 400));
        }

        // Build the update operation
        const update: Partial<{
          $set: Partial<T>;
          $pull: Partial<T>;
          $push: Partial<T>;
        }> =
          type === "pull"
            ? { $pull: { [modifiedField]: targetId } as Partial<T> }
            : type === "push"
            ? { $push: { [modifiedField]: targetId } as Partial<T> }
            : { $set: { [modifiedField]: req.body } as Partial<T> };

        // Perform the update
        const result = await Model.updateMany({ _id: modelId }, update);

        if (!result || result.matchedCount === 0) {
          return next(
            new ApiError(`No documents found for the ID ${modelId}.`, 400)
          );
        }

        res.status(200).json({ modifiedCount: result.modifiedCount });
      } catch (error) {
        next(
          new ApiError("An error occurred during the update operation.", 500)
        );
      }
    }
  );

export const deleteMany = (
  Modle: {
    deleteMany: (query: { _id: string }) => Promise<TDeleteResult | null>;
  },
  isMidelware: boolean = true
) =>
  expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const body = req.body;
      const result = await Modle.deleteMany(body);
      // if (!result || result.deletedCount <= 0) {
      //   return next(
      //     new ApiError(`no documents in to this condition ${body}`, 400)
      //   );
      // }
      if (isMidelware) next();
      else res.status(200).json({ data: result?.deletedCount });
    }
  );
