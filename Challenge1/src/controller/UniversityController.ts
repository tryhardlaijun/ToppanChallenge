// src/controller/universityController.ts
import { Request, Response } from "express";
import { UniversityRepository } from "../repository/user_repository";
import { ILike } from "typeorm";

export class UniversityController {
  async getUniversities(req: Request, res: Response): Promise<void> {
    try {
      // Extract query parameters for filtering
      const { name, country, isBookmark, showAll } = req.query;

      // Build the filter object based on the query parameters
      const filter: any = {};

      // Default to showing only active universities
      if (!showAll) {
        filter.isActive = true;
      }

      if (name) {
        filter.name = ILike(`%${name}%`); // ILike allows case-insensitive "like" searches
      }
      if (country) {
        filter.country = ILike(`%${country}%`);
      }
      if (isBookmark) {
        filter.isBookmark = isBookmark === "true"; // Convert string to boolean
      }

      // Fetch universities from the repository with filtering
      const universities = await UniversityRepository.find({ where: filter });

      if (universities.length === 0) {
        res
          .status(404)
          .json({ message: "No universities found matching the criteria" });
        return;
      }

      res.json(universities);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching universities" });
    }
  }
  async getUniversityById(req: Request, res: Response): Promise<void> {
    try {
      const universityId = parseInt(req.params.id);
      if (isNaN(universityId)) {
        res.status(400).json({ error: "Invalid university ID" });
        return;
      }

      const university = await UniversityRepository.findOneBy({
        id: universityId,
      });
      if (university) {
        res.json(university);
      } else {
        res.status(404).json({ message: "University not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching the university" });
    }
  }

  async createUniversity(req: Request, res: Response): Promise<void> {
    // DTO validation has already occurred in the middleware
    const { name, country, webpages, isBookmark } = req.body;
    try {
      const existingUniversity = await UniversityRepository.findOneBy({
        name,
        country,
      });
      if (existingUniversity) {
        res.status(409).json({
          error: "University with the same name and country already exists",
        });
        return;
      }

      const newUniversity = UniversityRepository.create({
        name,
        country,
        webpages,
        isBookmark,
        isActive: true,
      });

      await UniversityRepository.save(newUniversity);
      res.status(201).json(newUniversity);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while creating the university" });
    }
  }

  async updateUniversity(req: Request, res: Response): Promise<void> {
    const universityId = parseInt(req.params.id);
    if (isNaN(universityId)) {
      res.status(400).json({ error: "Invalid university ID" });
      return;
    }

    try {
      const university = await UniversityRepository.findOneBy({
        id: universityId,
      });
      if (!university) {
        res.status(404).json({ message: "University not found" });
        return;
      }

      await UniversityRepository.update(universityId, req.body);
      const updatedUniversity = await UniversityRepository.findOneBy({
        id: universityId,
      });
      res.json(updatedUniversity);
    } catch (error) {
      let errorMessage = "Failed to do something exceptional";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log(errorMessage);
      res
        .status(500)
        .json({ error: "An error occurred while updating the university" });
    }
  }

  async deleteUniversity(req: Request, res: Response): Promise<void> {
    const universityId = parseInt(req.params.id);
    if (isNaN(universityId)) {
      res.status(400).json({ error: "Invalid university ID" });
      return;
    }

    try {
      const university = await UniversityRepository.findOneBy({
        id: universityId,
      });
      if (!university) {
        res.status(404).json({ message: "University not found" });
        return;
      }
      await UniversityRepository.update(universityId, {
        isActive: false,
        deletedAt: new Date(),
      });
      res.status(204).end();
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while deleting the university" });
    }
  }

  async bookmarkUniversity(req: Request, res: Response): Promise<void> {
    const universityId = parseInt(req.params.id);
    if (isNaN(universityId)) {
      res.status(400).json({ error: "Invalid university ID" });
      return;
    }

    try {
      const university = await UniversityRepository.findOneBy({
        id: universityId,
      });
      if (!university) {
        res.status(404).json({ message: "University not found" });
        return;
      }

      await UniversityRepository.bookmarkUniversity(universityId);
      const updatedUniversity = await UniversityRepository.findOneBy({
        id: universityId,
      });
      res.json(updatedUniversity);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while bookmarking the university" });
    }
  }

  async unbookmarkUniversity(req: Request, res: Response): Promise<void> {
    const universityId = parseInt(req.params.id);
    if (isNaN(universityId)) {
      res.status(400).json({ error: "Invalid university ID" });
      return;
    }

    try {
      const university = await UniversityRepository.findOneBy({
        id: universityId,
      });
      if (!university) {
        res.status(404).json({ message: "University not found" });
        return;
      }

      await UniversityRepository.unbookmarkUniversity(universityId);
      const updatedUniversity = await UniversityRepository.findOneBy({
        id: universityId,
      });
      res.json(updatedUniversity);
    } catch (error) {
      res.status(500).json({
        error: "An error occurred while unbookmarking the university",
      });
    }
  }
}
