//  This Function Send All The Error
export const SendError = (res, status, success, message, error) => {
  if (error) {
    if (error.name === "CastError") {
      let message = `${error.value} not Found . Invalid ${error.path}`;
      return res.status(400).json({ error: message, success: false });
    } else if (error.code) {
      const message = `Deplicate key Error`;
      return res.status(400).json({ error: message, success: false });
    } else {
      return res.status(status).json({ error: error.message, success });
    }
  } else {
    return res.status(status).json({ error: message, success });
  }
};
