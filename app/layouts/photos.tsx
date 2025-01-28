import * as stylex from "@stylexjs/stylex";

import image1 from "~/images/photos/image-1.webp";
import image2 from "~/images/photos/image-2.webp";
import image3 from "~/images/photos/image-3.webp";
import image4 from "~/images/photos/image-4.webp";
import image5 from "~/images/photos/image-5.webp";

const styles = stylex.create({
  pictureList: {
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
    justifyContent: "center",
    width: {
      default: "100%",
      "@media (min-width: 800px)": "100%",
    },
    paddingTop: {
      default: 16,
      "@media (min-width: 800px)": 32,
    },
  },
  pictureContainer: {
    paddingRight: 16,
    flex: "none",
  },
  picture: {
    borderRadius: "5%",
    // padding: size.xxlarge,
    width: {
      default: 200,
      "@media (min-width: 800px)": 300,
    },

    aspectRatio: 0.9,
  },
  rotateLeft: {
    rotate: "-1deg",
  },
  rotateRight: {
    rotate: "1deg",
  },
});

export function Photos() {
  return (
    <div {...stylex.props(styles.pictureList)}>
      {[image1, image2, image3, image4, image5].map((image, imageIndex) => (
        <div key={imageIndex} {...stylex.props(styles.pictureContainer)}>
          <img
            src={image}
            alt="Image 1"
            {...stylex.props(
              styles.picture,
              imageIndex & 1 ? styles.rotateLeft : styles.rotateRight
            )}
          />
        </div>
      ))}
    </div>
  );
}
