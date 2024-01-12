import React from "react";
import Compressor from "compressorjs";

const CompressorComponent = () => {
  const [originalImage, setOriginalImage] = React.useState<{
    src: string;
    size: number | null;
  }>({ src: "", size: null });
  const [resizedImage, setResizedImage] = React.useState<{
    src: string;
    size: number | null;
  }>({ src: "", size: null });
  const [resizing, setResizing] = React.useState<boolean>(false);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) return;

    const file = evt.target.files[0];

    if (!file) return;
    setResizing(true);

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
          setResizedImage({
            src: URL.createObjectURL(result),
            size: result.size * 0.000001
          });
          setResizing(false);
        };
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

      {resizing ? (
        <div>Resizing...</div>
      ) : (
        <div style={{ display: "flex", columnGap: "20px", marginTop: "20px" }}>
          {originalImage.src && (
            <div>
              <div>Orignal Size: {originalImage.size}MB</div>
              <img
                style={{ width: "300px", height: "300px", display: "block" }}
                alt="abc"
                src={originalImage.src}
              />
            </div>
          )}
          {resizedImage.src && (
            <div>
              <div>Compressed Size: {resizedImage.size}MB</div>
              <img
                style={{ width: "300px", height: "300px", display: "block" }}
                alt="abc"
                src={resizedImage.src}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CompressorComponent;
