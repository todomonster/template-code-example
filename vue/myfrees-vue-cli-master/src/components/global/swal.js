import Swal from "sweetalert2";

const confirmButtonColor = "#ff7300";

export const Toast = (text) => {
    const result = Swal.mixin({
        confirmButtonColor
    });
    result.fire(text);
}

const confirmConfig = {
    confirmButtonColor,
    showCancelButton: true,
    cancelButtonText: "取消",
    confirmButtonText: "確定"
}

export const ToastConfirm = (text) => {
    const result = Swal.mixin({
        ...confirmConfig
    });
    return result.fire(text).then((result) => {
        if (result.isConfirmed) {
            return true;
        } else {
            return false;
        }
    });
}

export const ToastInputConfirm = (text = "", placeHolder = "") => {
    return Swal.fire({
        ...confirmConfig,
        title: text,
        input: 'textarea',
        inputLabel: '',
        inputPlaceholder: placeHolder,
        inputAttributes: {
            'aria-label': 'Type your message here'
        },
    })
}