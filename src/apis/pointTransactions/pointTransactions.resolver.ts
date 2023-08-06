import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { PointTransaction } from './entities/pointTransaction.entity';
import { PointTransactionsService } from './pointTransactions.service';
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard';
import { CreatePointTransactionInput } from './dto/create-pointTrasaction.input';
import { CancelPointTransactionInput } from './dto/cancel-pointTransaction.input';

@Resolver()
export class PointTransactionsResolver {
  constructor(private readonly pointTransactionsService: PointTransactionsService) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => PointTransaction)
  createPointTransaction(
    @Args('createPointTransactionInput') createPointTransactionInput: CreatePointTransactionInput,
    @Context() context: IContext,
  ): Promise<PointTransaction> {
    const user = context.req.user;
    return this.pointTransactionsService.createForPayment({
      createPointTransactionInput,
      user,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => PointTransaction)
  cancelPointTransaction(
    @Args('cancelPointTransactionInput') cancelPointTransactionInput: CancelPointTransactionInput, //
    @Context() context: IContext,
  ) {
    const user = context.req.user;
    return this.pointTransactionsService.cancel({ cancelPointTransactionInput, user });
  }
}
