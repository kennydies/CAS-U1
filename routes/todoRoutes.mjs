import express from 'express';
const router = express.Router();
import {todosController} from '../controller/todosController';

router.get("/", todosController.getTodos.bind(todosController));
router.post("/", todosController.createTodo.bind(todosController));
router.get("/:id/", todosController.showTodo.bind(todosController));
router.delete("/:id/", todosController.deleteTodo.bind(todosController));
router.put("/:id/", todosController.updateTodo.bind(todosController));
router.patch("/:id/", todosController.updateStateTodo.bind(todosController));

export const todoRoutes = router;