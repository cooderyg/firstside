import { CreateBoardInput } from '../dto/create-board.input';
import { UpdataBoardInput } from '../dto/update-board.input';

export interface IBoardsServiceCreate {
  createBoardInput: CreateBoardInput;
}
export interface IBoardsServiceUpdate {
  boardNumber: number;
  updateBoardInput: UpdataBoardInput;
}
