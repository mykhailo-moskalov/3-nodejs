// / Libraries
import createHttpError from 'http-errors';
import { Router } from 'express';
import { celebrate } from 'celebrate';
// / Validdations
import {
  getStudentsSchema,
  studentIdParamSchema,
  createStudentSchema,
  updateStudentSchema,
} from '../validations/studentsValidation.js';
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
router.get('/students', celebrate(getStudentsSchema), getStudents);
router.get(
  '/students/:studentId',
  celebrate(studentIdParamSchema),
  getStudentById,
);
router.get('/test-error', (req, res) => {
  throw createHttpError('Something went wrong');
});

// / POST
router.post('/students', celebrate(createStudentSchema), createStudent);

// / DELETE
router.delete(
  '/students/:studentId',
  celebrate(studentIdParamSchema),
  deleteStudent,
);

// / PATCH
router.patch(
  '/students/:studentId',
  celebrate(updateStudentSchema),
  updateStudent,
);

export default router;
