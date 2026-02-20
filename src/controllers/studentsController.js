// / Libraries
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
// / Model
import { Student } from '../models/student.js';

// / GET
export const getStudents = async (req, res) => {
  const students = await Student.find();

  res.status(200).json(students);
};
// / GET
export const getStudentById = async (req, res) => {
  const { studentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    throw createHttpError(404, 'Invalid student ID');
  }

  const student = await Student.findById(studentId);

  if (!student) {
    throw createHttpError(404, 'Student not found');
  }

  res.status(200).json(student);
};

// / POST
export const createStudent = async (req, res) => {
  const student = await Student.create(req.body);

  res.status(201).json(student);
};

// / DELETE
export const deleteStudent = async (req, res) => {
  const { studentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    throw createHttpError(404, 'Invalid student ID');
  }

  const student = await Student.findOneAndDelete({
    _id: studentId,
  });

  if (!student) {
    throw createHttpError(404, 'Student not found');
  }

  res.status(200).json(student);
};

// / PATCH
export const updateStudent = async (req, res) => {
  const { studentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    throw createHttpError(404, 'Invalid student ID');
  }

  const student = await Student.findOneAndUpdate({ _id: studentId }, req.body, {
    new: true,
    // includeResultMetadata: true,
    // upsert: true,
  });

  if (!student) {
    throw createHttpError(404, 'Student not found');
  }

  res.status(200).json(student);
};
