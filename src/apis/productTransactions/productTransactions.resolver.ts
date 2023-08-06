import { Args, Resolver } from '@nestjs/graphql';
import { ProductTransactionsService } from './productTransactions.service';
import { CreateProductTransactionInput } from './dto/create-productTransactions.dto';
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guard/roles.guard';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { ROLE } from '../users/entities/user.entity';
import { IContext } from 'src/commons/interfaces/context';

@Resolver()
export class ProductTransactionsResolver {
  constructor(
    private readonly productTransactionsService: ProductTransactionsService, //
  ) {}

  @HasRoles(ROLE.USER)
  @UseGuards(GqlAuthGuard('access'), RolesGuard)
  createProductTransaction(
    @Args() createProductTransactionInput: CreateProductTransactionInput,
    @Args() context: IContext,
  ) {
    const userId = context.req.user.id;
    this.productTransactionsService.createProductTransaction({
      createProductTransactionInput,
      userId,
    });
  }
}
