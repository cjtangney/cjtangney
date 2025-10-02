import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";

import { Image } from "~/components/Image";

import "yet-another-react-lightbox/styles.css";

export type PhotoGalleryPhoto = {
  src: string;
  alt: string;
}

const partitionPhotos = (array: PhotoGalleryPhoto[], size: number): PhotoGalleryPhoto[][] => {
  const partitionedPhotos = [];
  for (let i = 0; i < array.length; i += size) {
    partitionedPhotos.push(array.slice(i, i + size));
  }
  return partitionedPhotos;
}

export const PhotoGallery = ({ photos, className, rowHeight = 300, cols = 3 }: { photos: PhotoGalleryPhoto[], className?: string, rowHeight?: number, cols?: number }) => {
  const [ isLightboxOpen, setIsLightboxOpen ] = useState<boolean>(false);
  const [ activePhoto, setActivePhoto ] = useState<number>(0);
  const photoData = partitionPhotos(photos, cols);
  const defaultClasses = [
    'grid gap-4',
  ].join(' ');
  const cssClasses = className
    ? `${defaultClasses} ${className}`
    : defaultClasses;

  return (
    <section className={cssClasses}>
      {photoData.map((row: PhotoGalleryPhoto[], i1: number) => (
        <div key={i1} className={`grid gap-4 lg:grid-flow-col lg:auto-cols-auto`} style={{ gridAutoRows: `${rowHeight}px` }}>
          {row.map((photo, i2: number) => (
            <button key={i2} onClick={() => {
                setIsLightboxOpen(true);
                setActivePhoto(i1 * cols + i2);
              }}
            >
              <Image className="shadow-md shadow-c-default" src={photo.src} alt={photo.alt} height={rowHeight} />
              <span className="sr-only">Open Lightbox</span>
            </button>
          ))}
        </div>
      ))}
      <Lightbox
        open={isLightboxOpen}
        close={() => setIsLightboxOpen(false)}
        slides={photos}
        index={activePhoto}
      />
    </section>
  );
}
