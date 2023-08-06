import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { ProductTransactionsService } from './productTransactions.service';
import { CreateProductTransactionInput } from './dto/create-productTransactions.dto';
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guard/roles.guard';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { ROLE } from '../users/entities/user.entity';
import { IContext } from 'src/commons/interfaces/context';
import { ProductTransaction } from './entities/productTransaction.entity';

@Resolver()
export class ProductTransactionsResolver {
  constructor(
    private readonly productTransactionsService: ProductTransactionsService, //
  ) {}

  @HasRoles(ROLE.USER)
  @UseGuards(GqlAuthGuard('access'), RolesGuard)
  @Mutation(() => ProductTransaction)
  createProductTransaction(
    @Args('createProductTransactionInput')
    createProductTransactionInput: CreateProductTransactionInput,
    @Context() context: IContext,
  ) {
    const userId = context.req.user.id;
    this.productTransactionsService.createProductTransaction({
      createProductTransactionInput,
      userId,
    });
  }
}
