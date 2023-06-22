import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorites.entity';
import { Module } from '@nestjs/common';
import { FavoritesResolver } from './favorites.resolver';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite])],
  providers: [FavoritesResolver, FavoritesService],
})
export class FavoritesModule {}
