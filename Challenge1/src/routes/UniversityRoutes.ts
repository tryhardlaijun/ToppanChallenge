// src/routes/universityRoutes.ts
import express from "express";
import { UniversityController } from "../controller/UniversityController";
import { UpdateUniversityDto } from "../DTO/updateUniversityDto";
import { CreateUniversityDto } from "../DTO/createUniversityDto";
import { FilterUniversitiesDto } from "../DTO/getUniversityDTO";
import { validateDto } from "../DTO/validateDTO";
const router = express.Router();
const universityController = new UniversityController();

router.get("/", (req, res) => universityController.getUniversities(req, res));
router.post("/", validateDto(CreateUniversityDto), (req, res) =>
  universityController.createUniversity(req, res),
);
router.get("/:id", (req, res) =>
  universityController.getUniversityById(req, res),
);
router.put("/:id", validateDto(UpdateUniversityDto), (req, res) =>
  universityController.updateUniversity(req, res),
);
router.delete("/:id", (req, res) =>
  universityController.deleteUniversity(req, res),
);
router.post("/bookmark/:id", (req, res) =>
  universityController.bookmarkUniversity(req, res),
);
router.post("/unbookmark/:id", (req, res) =>
  universityController.unbookmarkUniversity(req, res),
);

export default router;
