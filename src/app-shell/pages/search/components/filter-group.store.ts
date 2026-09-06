import { makeAutoObservable } from "mobx";

export class FilterGroupStore {
  isExpanded: boolean;

  constructor(isExpanded: boolean) {
    this.isExpanded = isExpanded;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }
}
