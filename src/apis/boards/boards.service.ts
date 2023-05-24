import { Injectable } from '@nestjs/common';
import {
  IBoardsServiceCreate,
  IBoardsServiceUpdate,
} from './interfaces/board-service.interface';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,
  ) {}

  async findAll(): Promise<Board[]> {
    const result = await this.boardsRepository.find({});
    return result;
  }

  async findOne({ boardNumber }: IBoardServiceInsertId): Promise<Board> {
    const result = await this.boardsRepository.findOne({
      where: { number: boardNumber },
    });
    return result;
  }

  async create({ createBoardInput }: IBoardsServiceCreate): Promise<Board> {
    const result = await this.boardsRepository.save({ ...createBoardInput });

    return result;
  }

  async update({
    boardNumber,
    updateBoardInput,
  }: IBoardsServiceUpdate): Promise<Board> {
    const board = await this.findOne({ boardNumber }); // update이후 추가적으로 fetch하지 않기 위해 불러옴

    const result = this.boardsRepository.save({
      ...board,
      ...updateBoardInput,
    });
    return result;
  }

  async delete({ boardNumber }: IBoardServiceInsertId): Promise<boolean> {
    // delete는 softdelete로 구현
    const result = await this.boardsRepository.softDelete({
      number: boardNumber,
    });

    return result.affected ? true : false;
  }
}

interface IBoardServiceInsertId {
  boardNumber: number;
}
