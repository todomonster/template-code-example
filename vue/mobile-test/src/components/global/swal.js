import Swal from "sweetalert2";


let confirmButtonColor = "#ff7300";
if (process.env.VUE_APP_MODE === "green") {
    confirmButtonColor = "#6BB738"
}

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

// {
//     "isConfirmed": true,
//     "isDenied": false,
//     "isDismissed": false,
//     "value": ""
// }
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

export const ToastHtml = (title = "", bodyHtml = "", showCancelButton = true) => {
    return Swal.fire({
        title,
        icon: "info",
        html: bodyHtml,
        // showCloseButton: false,
        // focusConfirm: false,
        // confirmButtonText: '確認',
        // cancelButtonText: '取消',
        ...confirmConfig,
        showCancelButton,
    });
}