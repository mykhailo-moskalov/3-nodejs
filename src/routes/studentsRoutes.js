// / Libraries
import createHttpError from 'http-errors';
import { Router } from 'express';
import { celebrate } from 'celebrate';
// / Validdations
import { createStudentSchema } from '../validations/studentsValidation.js';
// / Controllers
import {
  getStudents,
  getStudentById,
  createStudent,
  deleteStudent,
  updateStudent,
} from '../controllers/studentsController.js';

const router = Router();

// / GET
router.get('/students', getStudents);
router.get('/students/:studentId', getStudentById);
router.get('/test-error', (req, res) => {
  throw createHttpError('Something went wrong');
});

// / POST
router.post('/students', celebrate(createStudentSchema), createStudent);

// / DELETE
router.delete('/students/:studentId', deleteStudent);

// / PATCH
router.patch('/students/:studentId', updateStudent);

export default router;
