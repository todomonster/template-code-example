import Swal from "sweetalert2";

const confirmButtonColor = "#ff7300";

export const Toast = (text) => {
    const result = Swal.mixin({
        confirmButtonColor
    });
    result.fire(text);
}
export const ToastConfirm = (text) => {
    const result = Swal.mixin({
        confirmButtonColor,
        showCancelButton: true,
        cancelButtonText: "取消",
        confirmButtonText: "確定"
    });
    return result.fire(text).then((result) => {
        if (result.isConfirmed) {
            return true;
        } else {
            return false;
        }
    });
}