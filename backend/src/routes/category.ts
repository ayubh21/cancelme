import { Router } from "express";
import db from "@src/db/setup.js";
import { category } from "@src/db/schema.js";
import { eq } from "drizzle-orm";
import { logger } from "@src/shared/logger.js";
import { ERROR_CONFIG } from "@src/shared/errors/errorConfig.js";
import { ERROR_MESSAGES } from "@src/shared/errors/errorMessage.js";
import AppError from "@src/shared/errors/appError.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../models/categories.js";
import { StatusCodes } from "http-status-codes";

export const categoryRoutes = Router();

categoryRoutes.get("/categories", async (req, res, next) => {
  try {
    const categories = await db.select().from(category);

    res.status(StatusCodes.OK).json({
      data: categories,
      success: true,
    });
  } catch (error) {
    logger.error("Failed to fetch categories", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    next(error);
  }
});

categoryRoutes.get("/category/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new AppError({
        code: StatusCodes.BAD_REQUEST,
        message: "Category ID is required",
        type: "INVALID_CATEGORY_ID",
      });
    }

    const foundCategory = await db
      .select()
      .from(category)
      .where(eq(category.id, id));

    if (!foundCategory.length) {
      throw new AppError({
        code: StatusCodes.NOT_FOUND,
        message: ERROR_MESSAGES.CATEGORY?.NOT_FOUND || "Category not found",
        type: ERROR_CONFIG.CATEGORY?.NOT_FOUND || "CATEGORY_NOT_FOUND",
      });
    }

    res.status(StatusCodes.OK).json({
      data: foundCategory[0],
      success: true,
    });
  } catch (error) {
    logger.error("Failed to fetch category", {
      id: req.params.id,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    next(error);
  }
});

categoryRoutes.post("/category", async (req, res, next) => {
  try {
    const validationResult = createCategorySchema.safeParse(req.body);
    if (!validationResult.success) {
      throw new AppError({
        code: StatusCodes.BAD_REQUEST,
        message: ERROR_MESSAGES.VALIDATION.PARSE_BODY,
        type: "INVALID_CATEGORY_DATA",
      });
    }

    const newCategory = await db
      .insert(category)
      .values({
        ...validationResult.data,
      })
      .returning();

    res.status(StatusCodes.CREATED).json({
      data: newCategory[0],
      success: true,
    });
  } catch (error) {
    logger.error("Failed to create category", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    next(error);
  }
});

categoryRoutes.patch("/category/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new AppError({
        code: StatusCodes.BAD_REQUEST,
        message: "Category ID is required",
        type: "INVALID_CATEGORY_ID",
      });
    }

    const validationResult = updateCategorySchema.safeParse(req.body);
    if (!validationResult.success) {
      throw new AppError({
        code: StatusCodes.BAD_REQUEST,
        message: ERROR_MESSAGES.VALIDATION.PARSE_BODY,
        type: "INVALID_CATEGORY_DATA",
      });
    }

    const existingCategory = await db
      .select()
      .from(category)
      .where(eq(category.id, id));

    if (!existingCategory.length) {
      throw new AppError({
        code: StatusCodes.NOT_FOUND,
        message: ERROR_MESSAGES.CATEGORY?.NOT_FOUND || "Category not found",
        type: ERROR_CONFIG.CATEGORY?.NOT_FOUND || "CATEGORY_NOT_FOUND",
      });
    }

    const updatedCategory = await db
      .update(category)
      .set(validationResult.data)
      .where(eq(category.id, id))
      .returning();

    res.status(StatusCodes.OK).json({
      data: updatedCategory[0],
      success: true,
    });
  } catch (error) {
    logger.error("Failed to update category", {
      id: req.params.id,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    next(error);
  }
});

categoryRoutes.delete("/category/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new AppError({
        code: StatusCodes.BAD_REQUEST,
        message: "Category ID is required",
        type: "INVALID_CATEGORY_ID",
      });
    }

    // Check if category exists
    const existingCategory = await db
      .select()
      .from(category)
      .where(eq(category.id, id));

    if (!existingCategory.length) {
      throw new AppError({
        code: StatusCodes.NOT_FOUND,
        message: ERROR_MESSAGES.CATEGORY?.NOT_FOUND || "Category not found",
        type: ERROR_CONFIG.CATEGORY?.NOT_FOUND || "CATEGORY_NOT_FOUND",
      });
    }

    // Delete category
    await db.delete(category).where(eq(category.id, id));

    res.status(StatusCodes.OK).json({
      data: { id },
      success: true,
    });
  } catch (error) {
    logger.error("Failed to delete category", {
      id: req.params.id,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    next(error);
  }
});
