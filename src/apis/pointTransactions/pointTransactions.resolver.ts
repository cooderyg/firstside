import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { PointTransaction } from './entities/pointTransaction.entity';
import { PointTransactionsService } from './pointTransactions.service';
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard';

@Resolver()
export class PointTransactionsResolver {
  constructor(
    private readonly pointTransactionsService: PointTransactionsService,
  ) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => PointTransaction)
  createPointTransaction(
    @Args('impUid') impUid: string, //
    @Args({ name: 'amount', type: () => Int }) amount: number,
    @Context() context: IContext,
  ): Promise<PointTransaction> {
    const user = context.req.user;
    return this.pointTransactionsService.createForPayment({
      impUid,
      amount,
      user,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => PointTransaction)
  cancelPointTransaction(
    @Args('impUid') impUid: string, //
    @Context() context: IContext,
  ) {
    const user = context.req.user;
    return this.pointTransactionsService.cancel({ impUid, user });
  }
}
