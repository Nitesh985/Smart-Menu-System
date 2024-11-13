
import { Router } from 'express'
import AdminSignIn from '../../../frontend/src/pages/Admin/AdminSignIn'

const router = Router()
router.route('/sign-in').post(AdminSignIn)


export default router
