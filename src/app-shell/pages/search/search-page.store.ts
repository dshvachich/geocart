import { makeAutoObservable } from "mobx";

export class SearchPageStore {
  isSortOpen = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  openSort() {
    this.isSortOpen = true;
  }

  closeSort() {
    this.isSortOpen = false;
  }
}
