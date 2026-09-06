import { makeAutoObservable } from "mobx";

const SWIPE_MIN_DISTANCE = 32;

export class ProductCardMediaStore {
  selectedImageIndex = 0;
  private swipeStartX: number | null = null;
  private swipeStartY: number | null = null;

  constructor(private readonly images: string[]) {
    makeAutoObservable<
      ProductCardMediaStore,
      "images" | "swipeStartX" | "swipeStartY"
    >(
      this,
      {
        images: false,
        swipeStartX: false,
        swipeStartY: false,
      },
      { autoBind: true },
    );
  }

  get activeImageSrc() {
    return this.images[this.selectedImageIndex] ?? "";
  }

  get activeIndex() {
    return this.selectedImageIndex;
  }

  get count() {
    return this.images.length;
  }

  get hasMultipleImages() {
    return this.images.length > 1;
  }

  resetImage() {
    this.showImageAtIndex(0);
  }

  showImageAtPosition(positionRatio: number) {
    if (!this.hasMultipleImages) {
      return;
    }

    const safePositionRatio = Math.min(Math.max(positionRatio, 0), 1);
    const imageIndex = Math.min(
      this.images.length - 1,
      Math.floor(safePositionRatio * this.images.length),
    );

    this.showImageAtIndex(imageIndex);
  }

  startSwipe(clientX: number, clientY: number) {
    if (!this.hasMultipleImages) {
      return;
    }

    this.swipeStartX = clientX;
    this.swipeStartY = clientY;
  }

  cancelSwipe() {
    this.swipeStartX = null;
    this.swipeStartY = null;
  }

  finishSwipe(clientX: number, clientY: number) {
    const startX = this.swipeStartX;
    const startY = this.swipeStartY;

    this.cancelSwipe();

    if (startX === null || startY === null || !this.hasMultipleImages) {
      return;
    }

    const distanceX = clientX - startX;
    const distanceY = clientY - startY;

    if (
      Math.abs(distanceX) < SWIPE_MIN_DISTANCE ||
      Math.abs(distanceX) <= Math.abs(distanceY)
    ) {
      return;
    }

    if (distanceX < 0) {
      this.showNextImage();
      return;
    }

    this.showPreviousImage();
  }

  private showPreviousImage() {
    this.showAdjacentImage(-1);
  }

  private showNextImage() {
    this.showAdjacentImage(1);
  }

  private showAdjacentImage(direction: 1 | -1) {
    if (!this.hasMultipleImages) {
      return;
    }

    const nextImageIndex =
      (this.selectedImageIndex + direction + this.images.length) %
      this.images.length;

    this.showImageAtIndex(nextImageIndex);
  }

  private showImageAtIndex(imageIndex: number) {
    if (this.selectedImageIndex === imageIndex) {
      return;
    }

    this.selectedImageIndex = imageIndex;
  }
}
