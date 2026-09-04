import "reflect-metadata";
import { Container } from "inversify";
import { AppStore } from "@/app-shell/app-store";
import { FavoritesStore } from "@/app-shell/stores/favorites.store";
import { BrowserFavoritesRepository } from "@/data/repositories";

const di = new Container();
const favoritesRepository = new BrowserFavoritesRepository();

di.bind(AppStore).toConstantValue(new AppStore());
di.bind(FavoritesStore).toConstantValue(
  new FavoritesStore(favoritesRepository),
);

export { di };
