const validator = require("validator");
const isEmpty = require("./is_empty");

exports.checkSV = data => {
  const errors = {};
  data.mssv = !isEmpty(data.mssv) ? data.mssv : "";
  data.ten = !isEmpty(data.ten) ? data.ten : "";
  data.checkTime = !isEmpty(data.checkTime) ? data.checkTime : "";

  if (validator.isEmpty(data.mssv)) {
    errors.mssv = "Mã số sinh viên không được để trống";
  }
  if (validator.isEmpty(data.ten)) {
    errors.ten = "Tên sinh viên không được để trống";
  }
  if (!validator.isLength(data.ten, { min: 2 })) {
    errors.ten = "Tên sinh viên ít nhất 2 kí tự";
  }
  if (validator.isEmpty(data.checkTime)) {
    errors.checkTime = "Thời gian không được để trống";
  }
  if (!validator.toDate(data.checkTime)) {
    errors.checkTime = "Thời gian không đúng";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
exports.checkUpdateTime = data => {
  const errors = {};
  data.mssv = !isEmpty(data.mssv) ? data.mssv : "";
  data.checkTime = !isEmpty(data.checkTime) ? data.checkTime : "";

  if (validator.isEmpty(data.mssv)) {
    errors.mssv = "Mã sinh viên không được để trống";
  }
  if (validator.isEmpty(data.checkTime)) {
    errors.checkTime = "Thời gian không được để trống";
  }
  if (!validator.toDate(data.checkTime)) {
    errors.checkTime = "Thời gian không đúng";
  }
  return {
      errors,
      isValid: isEmpty(errors)
  }
};
