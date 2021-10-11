import { Request, Response } from "express";

import { TurnUserAdminUseCase } from "./TurnUserAdminUseCase";

class TurnUserAdminController {
  constructor(private turnUserAdminUseCase: TurnUserAdminUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const { user_id } = request.params;

      const user = this.turnUserAdminUseCase.execute({ user_id });

      return response.status(202).json(user);
    } catch (error) {
      if (error.message === "This user does not exist") {
        return response.status(404).json({ error: error.message });
      }

      return response.status(400).json({ error });
    }
  }
}

export { TurnUserAdminController };
