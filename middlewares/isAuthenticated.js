const {expressjwt} = require("express-jwt");

const isAuthenticated = expressjwt({
    secret: process.env.TOKEN_SECRET,
    algorithms: ["HS256"],
    requestProperty: "payload",
    getToken: (req) => {
        if (req.headers === undefined || req.headers.authorization === undefined) {
            console.log("no hay token")
            return null
        }

        console.log(req.headers.authorization)
        const tokenArr = req.headers.authorization.split(" ")
        const tokenType = tokenArr[0]
        const token = tokenArr[1]

        if (tokenType !== "Bearer") {
            console.log("Tipo de token inválido")
            return null
        }

        console.log("El token fue entregado")
        return token
    }
})

module.exports = isAuthenticated