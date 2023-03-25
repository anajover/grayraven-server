const UserModel = require("../models/User.model.js");
const router = require("express").Router();

const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/isAuthenticated.js");

//POST "/api/auth/signup" => registrar un usuario
router.post("/signup", async (req, res, next) => {
    
    const {username, email, password} = req.body

    // Validaciones de backend
    if (!email || !password || !username) {
        res.status(400).json({errorMessage: "Los campos no están completos."})
        return;
    }

    try {

        const foundUser = await UserModel.findOne({$or: [{ username }, { email }]})
        if(foundUser !== null) {
            res.status(400).json({errorMessage: "Usuario ya registrado"})
            return;
        }

        const salt = await bcryptjs.genSalt(12)
        const hashPassword = await bcryptjs.hash(password, salt)

        await UserModel.create({
            username,
            email,
            password: hashPassword
        })

        res.json("Todo bien, usuario creado.")
    
    }catch(error) {
        next(error)
    }
})

// POST "/api/auth/admin" => verificar las credenciales
router.post("/admin", async (req, res, next) => {

    const {email, password} = req.body

    try {

        const foundUser = await UserModel.findOne({email})
        if (foundUser === null) {
            res.status(400).json({errorMessage: "Usuario no registrado"})
            return;
        }

        //el usuario ha sido validado
        const passwordMatch = await bcryptjs.compare(password, foundUser.password)
        console.log(passwordMatch)

        if (passwordMatch === false) {
            res.status(401).json({errorMessage: "La contraseña no es correcta."})
            return;
        }

        //autenticación
        const payload = {
            _id: foundUser._id,
            email: foundUser.email,
            username: foundUser.username
        }

        //crear token
        const authToken = jwt.sign(
            payload,
            process.env.TOKEN_SECRET,
            {algorithm: "HS256", expiresIn: "24h"}
        )

        res.json({authToken: authToken})

    }catch (error) {
        next(error)
    }
})

// GET "/api/auth/verify" => checkea que el token es válido
router.get("/verify", isAuthenticated, ( req, res, next) => {

    console.log("Pasando por la ruta, todo bien con el middleware")
    res.json(req.payload)

})

//PATCH "/api/auth/:id/edit" => editar un usuario
router.patch("/:id/edit", async (req, res, next) => {
    
    const {username, email, password} = req.body
    const {id} = req.params

    try {

        const salt = await bcryptjs.genSalt(12)
        const hashPassword = await bcryptjs.hash(password, salt)

        await UserModel.findByIdAndUpdate(id, {
            username,
            email,
            password: hashPassword
        })

        res.json("Todo bien, usuario editado.")
    
    }catch(error) {
        next(error)
    }
})



module.exports = router