import Swal from "sweetalert2";

export function contactSendAlert() {
    return Swal.fire({
        title: "Are you sure?",
        text: "Do you want to send this contact message?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, send it!",
    });
}
