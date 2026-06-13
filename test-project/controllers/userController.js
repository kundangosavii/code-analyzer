import { fetchUserData } from "../services/userService.js";
import { getAllFiles } from "../services/userService.js";

export function getUser(req, res) {
  const user = fetchUserData();
  res.json(user);
}