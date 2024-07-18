import express from 'express';
const router=express.Router();
import protectRoute from '../middlewear/protectRoute.js';
import { getUserForSidebar } from '../controllers/user.controller.js';

router.get('/',protectRoute,getUserForSidebar)

export default router;