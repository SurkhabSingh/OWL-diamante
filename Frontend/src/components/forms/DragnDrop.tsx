import { useEffect, useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { styles } from "../../utils/DndStyles";

export default function DragnDrop({ form }: any) {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [],
      },
      onDrop: (acceptedFiles: any[]) => {
        setFiles(
          acceptedFiles.map((file: any) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });

  const thumbs = files.map((file) => (
    <div style={styles.thumb} key={file.name}>
      <div style={styles.thumbInner}>
        <img
          src={file.preview}
          style={styles.img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
            form.setValue("picture", files);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    return () =>
      files.forEach((file) => {
        URL.revokeObjectURL(file.preview);
      });
  }, []);

  const style = useMemo(
    () => ({
      ...styles.baseStyle,
      ...(isFocused ? styles.focusedStyle : {}),
      ...(isDragAccept ? styles.acceptStyle : {}),
      ...(isDragReject ? styles.rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <section style={styles.container}>
      <aside
        className="flex justify-center mt-12"
        style={styles.thumbsContainer}
      >
        {/* <div style={styles.thumb}>
           <img
            src={`https://ipfs.io/ipfs/${form
              .watch("profile_picture")
              ?.split("ipfs://")}}`}
            style={styles.img}
          /> 
        </div> */}
        {thumbs}
      </aside>
      <div className="mt-24" {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p className="text-bold ">
          Drag 'n' drop some files here, or click to select files
        </p>
      </div>
    </section>
  );
}
