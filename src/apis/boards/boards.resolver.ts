import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/create-board.input';
import { Board } from './entities/board.entity';
import { UpdataBoardInput } from './dto/update-board.input';

@Resolver()
export class BoardsResolver {
  constructor(private readonly boardService: BoardsService) {}

  @Query(() => [Board])
  fetchBoards(): Promise<Board[]> {
    return this.boardService.findAll();
  }

  @Query(() => Board)
  fetchBoard(@Args('boardNumber') boardNumber: number): Promise<Board> {
    return this.boardService.findOne({ boardNumber });
  }
  @Mutation(() => Board)
  createBoard(
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ): Promise<Board> {
    return this.boardService.create({ createBoardInput });
  }

  @Mutation(() => Board)
  updateBoard(
    @Args('updateBoardInput') updateBoardInput: UpdataBoardInput,
    @Args('boardNumber') boardNumber: number,
  ): Promise<Board> {
    return this.boardService.update({ boardNumber, updateBoardInput });
  }

  @Mutation(() => Boolean)
  deleteBoard(@Args('boardNumber') boardNumber: number) {
    return this.boardService.delete({ boardNumber });
  }
}
