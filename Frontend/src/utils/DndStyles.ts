export const styles = {
  baseStyle: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  },

  focusedStyle: {
    borderColor: "#2196f3",
  },

  acceptStyle: {
    borderColor: "#00e676",
  },

  rejectStyle: {
    borderColor: "#ff1744",
  },

  thumbsContainer: {
    width: "100%",
    display: "flex",
    objectFit: "cover",
    flexWrap: "wrap",
    marginTop: 16,
    justifyItems: "center",
    alignItems:'center'
  },

  thumb: {
    display: "flex",
    borderRadius: "100%",
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: "400px",
    height: "400px",
    padding: 4,
    boxSizing: "border-box",
    justifyContent: "center",
    
  },

  thumbInner: {
    display: "flex",
    overflow: "hidden",
  },

  img: {
    width: "",
    borderRadius: "100%",
    objectFit:'cover'
  },
  container: {
    backgroundColor:'black',
    color:'black',
    width: "450px",
    height: "473px",
  },
};
