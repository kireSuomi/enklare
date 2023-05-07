"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/joke/Programming,Pun?safe-mode";
app.get("/jokes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const amount = req.query.amount || 10;
        const type = req.query.type || "any";
        const response = yield axios_1.default.get(API_URL, {
            params: {
                amount,
                type,
            },
        });
        const jokes = response.data.jokes;
        res.json(jokes);
    }
    catch (error) {
        console.error("Error fetching jokes:", error);
        res.status(500).json({ error: "Failed to fetch jokes" });
    }
}));
app.get("/", (req, res) => {
    res.send("Hello, aa!");
});
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
