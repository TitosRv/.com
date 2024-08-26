"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
//importacion de rutas para su uso dentro de la base de datos
const registroGastosRoutes_1 = __importDefault(require("./routes/registroGastosRoutes"));
const tipoGastoRoutes_1 = __importDefault(require("./routes/tipoGastoRoutes"));
const presupuestoRoutes_1 = __importDefault(require("./routes/presupuestoRoutes"));
const usuarioRoutes_1 = require("./routes/usuarioRoutes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        // this.app.use(cors()); //habilitacion de CORS 
        this.app.use(express_1.default.json()); //middleware para parsear JSON
        //configuracion de CORS
        this.app.use((0, cors_1.default)({
            origin: 'http://localhost:4200',
            methods: ['GET', 'POST', 'DELETE', 'PUT'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        }));
    }
    routes() {
        //define las rutas
        this.app.use('/api/registroGastos', registroGastosRoutes_1.default);
        this.app.use('/api/tipoGastos', tipoGastoRoutes_1.default);
        this.app.use('/api/presupuestos', presupuestoRoutes_1.default);
        this.app.use('/api/usuarios', usuarioRoutes_1.usuarioRoutes); // Aquí se agrega el prefijo /api
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
console.log('WORKS!!!!!');
