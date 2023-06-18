# Grayscaler 

A demo project to explore Rust compilation into WebAssembly with [wasm-pack-plugin](https://github.com/wasm-tool/wasm-pack-plugin). It is an image processing app with a simple task of applying a grayscale filter to uploaded images via the [image crate](https://crates.io/crates/image).

<p align="center"><img src="https://i.ibb.co/PTFMg5D/grayscaler.jpg"></p>

### Allowed file types
- GIF
- JPEG
- PNG
- TIFF
- WEBP

Any resolution will do, but files must be **less than 2 megabytes**.

### Output
A `png` file will be rendered below the upload button, as shown in the picture. You will be able to right click and save the processed image.

## Development Instructions

Assuming Rust and npm are installed on your system, just clone the repo and install dependencies with

```shell
npm install
```

To start the development server and run the project locally, use the following command:

```shell
npm run serve
```

This will start the server and make the project accessible at http://localhost:8080.

To build the project for production, use the following command:

```shell
npm run build
```

This will create a production-ready build in the `dist/` directory.