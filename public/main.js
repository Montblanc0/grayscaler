import * as utils from './utils'

const input = document.getElementById("upload");
const label = input.parentElement;
const span = input.nextElementSibling;

(async () => {
    let rustApp;
    try {
        rustApp = await import('../pkg');
    } catch (e) {
        console.error(e);
        return;
    }
    await enableInput();

    input.addEventListener("input", async () => {
        await disableInput();
        const file = input.files[0];
        if (!file) return;

        // check for allowed mime types
        if (!utils.checkFileType(file) || !utils.validateSize(file)) {
            console.error("Illegal file format or size.")
            await enableInput();
            return;
        }
        let result;
        try {
            result = await utils.readFile(file);
        } catch (e) {
            console.error(e);
            await enableInput();
            return;
        }
        const base64 = result.replace(
            /^data:image\/(png|gif|jpg|jpeg|tiff|webp);base64,/, ""
        );
        const img_data_url = rustApp.grayscale(base64);
        if (!img_data_url) console.error("Something went wrong while processing the image.")
        document.getElementById("new-img").setAttribute("src", img_data_url);
        await enableInput();
    })

})()

const enableInput = () => {
    return new Promise(resolve => {
        requestAnimationFrame(() => {
            span.textContent = "Upload an Image";
            label.classList.remove("disabled");
            resolve();
        });
    });
};

const disableInput = () => {
    return new Promise(resolve => {
        requestAnimationFrame(() => {
            span.textContent = "Please wait...";
            label.classList.add("disabled");
            resolve();
        });
    });
};
