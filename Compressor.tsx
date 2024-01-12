import React from "react";
import Compressor from "compressorjs";

const CompressorComponent = () => {
  const [originalImage, setOriginalImage] = React.useState<{
    src: string;
    size: number | null;
  }>({ src: "", size: null });
  const [image, setImage] = React.useState<{
    src: string;
    size: number | null;
  }>({ src: "", size: null });

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) return;

    const file = evt.target.files[0];

    if (!file) return;

    // console.log("Size before:", file.);

    new Compressor(file, {
      quality: 0.6,
      success(result) {
        const reader = new FileReader();
        reader.readAsDataURL(result);
        reader.onload = function (e) {
          setOriginalImage({
            src: URL.createObjectURL(file),
            size: file.size * 0.000001
          });
          setImage({
            src: URL.createObjectURL(result),
            size: result.size * 0.000001
          });
        };
        console.log("Size after:", result.size);
      },
      error(err) {
        console.log(err.message);
      }
    });
  };

  return (
    <div className="App">
      <h1>CompressorJS</h1>
      <input
        onChange={handleChange}
        type="file"
        accept="image/jpeg,image/png"
      />

      <div style={{ display: "flex", columnGap: "20px", marginTop: "20px" }}>
        {originalImage.src && (
          <div>
            <div>Orignal Size: {originalImage.size}</div>
            <img
              style={{ width: "300px", height: "300px", display: "block" }}
              alt="abc"
              src={originalImage.src}
            />
          </div>
        )}
        {image.src && (
          <div>
            <div>Compressed Size: {image.size}</div>
            <img
              style={{ width: "300px", height: "300px", display: "block" }}
              alt="abc"
              src={image.src}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CompressorComponent;
