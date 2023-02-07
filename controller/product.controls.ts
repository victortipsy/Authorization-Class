import { Request, Response, NextFunction } from "express";
import productModel from "../model/product.model";
import { Iproducts } from "../interfaces/Products";
import { AppERROR, HTTPCODES } from "../utils/AppError";
import { asyncHandler } from "../utils/AsyncHandler";

export const createProduct = asyncHandler(
  async (
    req: Request<{}, {}, Iproducts>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, productImage, price, category } = req.body;
    const product = await productModel.create({
      name,
      productImage,
      price,
      category,
    });
    if (!product)
      next(
        new AppERROR({
          httpCode: HTTPCODES.BAD_REQUEST,
          message: "Product not created",
        })
      );
    return res.status(HTTPCODES.CREATED).json({
      data: product,
    });
  }
);

export const getallproducts = asyncHandler(
  async (
    req: Request<{}, {}, Iproducts>,
    res: Response,
    next: NextFunction
  ) => {
    const product = await productModel.find();
    if (!product)
      next(
        new AppERROR({
          httpCode: HTTPCODES.NOT_FOUND,
          message: "Products not found",
        })
      );
    return res.status(HTTPCODES.CREATED).json({
      data: product,
    });
  }
);
