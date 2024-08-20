// src/repository/university.repository.ts
import { AppDataSource } from "../data-source";
import { University } from "../entity/University";

export const UniversityRepository = AppDataSource.getRepository(
  University,
).extend({
  findByName(name: string) {
    return this.createQueryBuilder("university")
      .where("university.name = :name", { name })
      .getMany();
  },
  bookmarkUniversity(id: number) {
    return this.update(id, { isBookmark: true });
  },
  unbookmarkUniversity(id: number) {
    return this.update(id, { isBookmark: false });
  },
});
