import Swal from "sweetalert2";
import "./alerts.css";

const useAlert = () => {
  const defaultSweetAlertOptions = {
    title: "Aviso",
    html: "",
    icon: "",
    confirmButtonText: "OK",
    width: "500px",
    padding: "40px",
    background: "#FFFFFF",
    color: "#000",
    confirmButtonColor: "#007BFF",
    customClass: {
      popup: "custom-popup",
      title: "custom-title",
      confirmButton: "custom-confirm-button",
    },
  };

  const defaultSweetAlertConfirmationOptions = {
    html: "Deseja confirmar essa ação?",
    title: "Aviso",
    showCancelButton: true,
    confirmButtonText: "Sim",
    confirmButtonColor: "#007BFF",
    cancelButtonText: "Cancelar",
    cancelButtonColor: "#FF0000",
    width: "500px",
    padding: "40px",
    background: "#FFFFFF",
    color: "#000",
    reverseButtons: true,
    customClass: {
      popup: "custom-popup",
      title: "custom-title",
      confirmButton: "custom-confirm-button",
    },
  };

  const _createAlertMessage = (alertOptions: any) => {
    return new Promise((resolve) => {
      Swal.fire({
        icon: alertOptions.icon || defaultSweetAlertOptions.icon,
        title: alertOptions.title || defaultSweetAlertOptions.title,
        html: alertOptions.html || defaultSweetAlertOptions.html,
        confirmButtonText:
          alertOptions.confirmButtonText ||
          defaultSweetAlertOptions.confirmButtonText,
        width: alertOptions.width || defaultSweetAlertOptions.width,
        padding: alertOptions.padding || defaultSweetAlertOptions.padding,
        background:
          alertOptions.background || defaultSweetAlertOptions.background,
        color: alertOptions.color || defaultSweetAlertOptions.color,
        confirmButtonColor:
          alertOptions.confirmButtonColor ||
          defaultSweetAlertOptions.confirmButtonColor,
        customClass: {
          popup: "custom-popup",
          title: "custom-title",
          confirmButton: "custom-confirm-button",
        },
      }).then((result) => {
        if (alertOptions.confirmAction) alertOptions.confirmAction();
      });
    });
  };

  const _createConfirmationMessage = (alertOptions: any) => {
    return new Promise((resolve) => {
      Swal.fire({
        html: alertOptions.html || defaultSweetAlertConfirmationOptions.html,
        showCancelButton:
          alertOptions.showCancelButton ||
          defaultSweetAlertConfirmationOptions.showCancelButton,
        confirmButtonText:
          alertOptions.confirmButtonText ||
          defaultSweetAlertConfirmationOptions.confirmButtonText,
        confirmButtonColor:
          alertOptions.confirmButtonColor ||
          defaultSweetAlertConfirmationOptions.confirmButtonColor,
        cancelButtonText:
          alertOptions.cancelButtonText ||
          defaultSweetAlertConfirmationOptions.cancelButtonText,
        cancelButtonColor:
          alertOptions.cancelButtonColor ||
          defaultSweetAlertConfirmationOptions.cancelButtonColor,
        width: alertOptions.width || defaultSweetAlertConfirmationOptions.width,
        padding:
          alertOptions.padding || defaultSweetAlertConfirmationOptions.padding,
        background:
          alertOptions.background ||
          defaultSweetAlertConfirmationOptions.background,
        color: alertOptions.color || defaultSweetAlertConfirmationOptions.color,
        reverseButtons:
          alertOptions.reverseButtons ||
          defaultSweetAlertConfirmationOptions.reverseButtons,
        customClass: {
          popup: "custom-popup",
          title: "custom-title",
          confirmButton: "custom-confirm-button",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          if (alertOptions.confirmAction) alertOptions.confirmAction();
        }
      });
    });
  };

  return {
    criarAlerta: _createAlertMessage,
    criarConfirmacao: _createConfirmationMessage,
  };
};

export default useAlert;
