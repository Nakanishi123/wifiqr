import QRCodeStyling from 'qr-code-styling';

function createQrCode(height: number, width: number, data: string, img: string | null, color: string, background_color: string, type: "round" | "dot" | "square", margin: number): QRCodeStyling {
    const main_option = {
        width: width,
        height: height,
        type: "svg",
        data: data,
        backgroundOptions: { color: background_color },
        margin: margin,
    }
    if (img) {
        main_option["image"] = img;
    }

    let type_option = {};
    switch (type) {
        case "round":
            type_option = {
                dotsOptions: { color: color, type: "rounded" },
                cornersSquareOptions: { color: color, type: "extra-rounded" },
                cornersDotOptions: { type: "dot", color: color },
            }
            break;

        case "dot":
            type_option = {
                dotsOptions: { color: color, type: "dots" },
                cornersSquareOptions: { color: color, type: "dot" },
                cornersDotOptions: { type: "dot", color: color },
            }
            break;

        default:
            type_option = {
                dotsOptions: { color: color, type: "square" },
                cornersSquareOptions: { color: color, type: "square" },
                cornersDotOptions: { type: "square", color: color },
            }
            break;
    }
    const option = Object.assign(main_option, type_option);
    // @ts-ignore
    return new QRCodeStyling(option);
}
window.onload = function () {
    const ssidInput = document.getElementById("_ssid") as HTMLInputElement;
    const passwordInput = document.getElementById("_password") as HTMLInputElement;
    const encriptSelect = document.getElementById("_encript") as HTMLSelectElement;
    const hiddenSsidCheckbox = document.getElementById("_hiddenssid") as HTMLInputElement;
    const colorInput = document.getElementById("main_color") as HTMLInputElement;
    const backgroundColorInput = document.getElementById("background_color") as HTMLInputElement;
    const shapeSelect = document.getElementById("shape") as HTMLInputElement;
    const marginInput = document.getElementById("margin_input") as HTMLInputElement;
    const qrimg = document.getElementById("qr") as HTMLImageElement;
    const donwlodSvgButton = document.getElementById("download_svg") as HTMLButtonElement;
    const donwlodPngButton = document.getElementById("download_png") as HTMLButtonElement;

    function qrvalue(): string {
        const ssid = ssidInput.value;
        const password = passwordInput.value;
        const encript = encriptSelect.value;
        const hidden_ssid = hiddenSsidCheckbox.checked ? "on" : "off";


        if (!ssid) { return "0" }
        let qrvalue = `WIFI:S:${ssid};`

        if (hidden_ssid == "on") {
            qrvalue += "H:true;"
        }

        if (encript == "WPA/WPA2") {
            return qrvalue + `T:WPA;P:${password};;`
        }
        else if (encript == "WPA3") {
            return qrvalue + `T:WPA;R:1;P:${password};;`
        }
        else if (encript == "WEP") {
            return qrvalue + `T:WEP;P:${password};;`
        }
        else if (encript == "nopassword") {
            return qrvalue + `T:nopass;;`
        }
        else {
            return "0"
        }
    }

    function mkQr(): QRCodeStyling {
        const color1 = colorInput.value;
        const color2 = backgroundColorInput.value;
        const shape = shapeSelect.value as "round" | "dot" | "square";
        const margin = parseInt(marginInput.value);

        return createQrCode(1000, 1000, qrvalue(), null, color1, color2, shape, margin);
    }

    function pasteQr() {
        const qrCode = mkQr();
        qrCode.getRawData("png").then((data) => {
            const blobUrl = URL.createObjectURL(data);
            qrimg.src = blobUrl;
        });
    }

    function downloadSvg() {
        const qrCode = mkQr();
        qrCode.download({ extension: "svg" });
    }
    function downloadPng() {
        const qrCode = mkQr();
        qrCode.download({ extension: "png" });
    }



    ssidInput.addEventListener('input', pasteQr);
    passwordInput.addEventListener('input', pasteQr);
    encriptSelect.addEventListener('input', pasteQr);
    hiddenSsidCheckbox.addEventListener('input', pasteQr);
    colorInput.addEventListener('change', pasteQr);
    backgroundColorInput.addEventListener('change', pasteQr);
    shapeSelect.addEventListener('input', pasteQr);
    marginInput.addEventListener('input', pasteQr);
    donwlodSvgButton.addEventListener('click', downloadSvg);
    donwlodPngButton.addEventListener('click', downloadPng);
    pasteQr();
}

